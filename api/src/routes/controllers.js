const {
  Op,
  CarModel,
  CarType,
  Driver,
  IncludedEquipment,
  IndividualCar,
  Location,
  OptionalEquipment,
  RentOrder,
  User,
  StatusUpdate,
} = require("../db.js");
require("dotenv").config();
const { EMAIL, YOUR_DOMAIN } = process.env;
const Mailgen = require("mailgen")
const { confirmationEmail } = require("../MailTemplate/OrderConfirmation")
const { transporter } = require("../config/mailer")

let mailGenerator = new Mailgen({
  theme: 'default',
  product: {
    // Appears in header & footer of e-mails
    name: 'Luxurent',
    link: YOUR_DOMAIN
    // Optional logo
    // logo: 'https://mailgen.js/img/logo.png'
  }
});

const datePlus = (date, num) => {
  return new Date(new Date(date.getTime()).setDate(new Date(date.getTime()).getDate() + num))
}

const getDatesInRange = (startDate, endDate) => {
  const date = new Date(startDate.toDateString());
  const dates = [];
  while (date <= endDate) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return dates;
};

const filterDates = (cars, startingDate, endingDate) => {
  const userInterval = endingDate
    ? getDatesInRange(new Date(startingDate), new Date(endingDate))
    : new Date(startingDate).toDateString();
  return cars.filter((c) => {
    if (c.individualCars > c.existingRents.length) return true;
    let i = 0;
    let availableCar = false;
    while (availableCar === false && i < c.existingRents.length) {
      let j = 0;
      didFind = false;
      while (didFind === false && j < c.existingRents[i].length) {
        let dateInterval = c.existingRents[i][j];
        dateInterval = getDatesInRange(
          new Date(dateInterval.startingDate),
          new Date(dateInterval.endingDate)
        );
        if (endingDate) {
          userInterval.forEach((ud) => {
            if (
              dateInterval.find((d) => d.toDateString() === ud.toDateString())
            )
              didFind = true;
          });
        } else {
          if (dateInterval.find((d) => d.toDateString() === userInterval))
            didFind = true;
        }
        j++;
      }
      if (!didFind) availableCar = true;
      i++;
    }
    return availableCar;
  });
};


const filterRentDates = (LocationCars, startingDate, endingDate) => {
  const userInterval = getDatesInRange(new Date(startingDate), endingDate)
  LocationCars.carModels[0].individualCars = LocationCars.carModels[0].individualCars.filter(c => {
    let i = 0;
    let availableCar = true;
    while (availableCar && i < c.rentOrders.length) {
      const currentInterval = c.rentOrders[i]
      const dateInterval = getDatesInRange(new Date(currentInterval.startingDate), new Date(currentInterval.endingDate));
      userInterval.forEach(ud => { if (dateInterval.find((d) => d.toDateString() === ud.toDateString())) availableCar = false })
      i++;
    }
    return availableCar;
  })
  return LocationCars
}

const statusUpdater = async () => {
  let today = new Date().toDateString();
  let lastUpdate = await StatusUpdate.findOrCreate({
    where: { id: 1 },
    defaults: {
      lastExecution: today
    },
  })
  if (lastUpdate[1] || new Date(today) > new Date(lastUpdate[0].dataValues.lastExecution)) {
    await StatusUpdate.update({ lastExecution: today }, { where: { id: 1 } });
    const allowedStatus = ["pending", "in use", "maintenance"];
    let rents = await RentOrder.findAll({ where: { status: { [Op.or]: allowedStatus } } });
    today = new Date(today);
    await Promise.all(
      rents.map(async r => {
        const start = new Date(r.startingDate);
        const end = new Date(r.endingDate);
        const inUseEnd = datePlus(end, -2);
        let status = r.status;

        if (r.status === "pending") {
          status = end < today ? "concluded"
            : inUseEnd < today ? "maintenance"
              : start <= today ? "in use"
                : status
        } else if (r.status === "in use") {
          status = end < today ? "concluded"
            : inUseEnd < today ? "maintenance"
              : status
        } else if (r.status === "maintenance") {
          status = end < today ? "concluded"
            : status
        }
        if (status !== r.status) {
          await RentOrder.update({ status }, { where: { id: r.id } });
        }
      })
    );
  }
}

const rentUpdate = async (stripeObject) => {
  try {
    const info = stripeObject.client_reference_id.split(":");
    const rentId = info[0];
    const days = info[1];
    const rent = await RentOrder.findByPk(rentId, {
      include: [{
        model: User
      }, { model: OptionalEquipment }, { model: IndividualCar, include: [{ model: CarModel }] }]
    });
    if (info.length <= 2) {
      await RentOrder.update({
        payed: true,
        refunds: [...rent.refunds, stripeObject.payment_intent],
        paymentDays: [...rent.paymentDays, days],
        paymentAmount: [...rent.paymentAmount, stripeObject.amount_total]
      },
        { where: { id: rentId } }
      );
      const emailBody = mailGenerator.generate(confirmationEmail(rent.user.firstName, rent.user.lastName, rent.individualCar.carModel.brand, rent.individualCar.carModel.model, rent.optionalEquipments, rent.startingDate, datePlus(new Date(rent.endingDate), -2).toDateString(), stripeObject.amount_total))
      const emailText = mailGenerator.generatePlaintext(confirmationEmail(rent.user.firstName, rent.user.lastName, rent.individualCar.brand, rent.individualCar.model, rent.optionalEquipments, rent.startingDate, datePlus(new Date(rent.endingDate), -2).toDateString(), stripeObject.amount_total))

      const info = await transporter.sendMail({
        from: `Luxurent TEAM <${EMAIL}>`,
        subject: `Receipt for Order #${rent.id}`,
        to: rent.user.email,
        html: emailBody,
        text: emailText,
      });
    } else {
      await RentOrder.update({
        payed: true,
        refunds: [...rent.refunds, stripeObject.payment_intent],
        paymentDays: [...rent.paymentDays, days],
        paymentAmount: [...rent.paymentAmount, stripeObject.amount_total],
        startingDate: info[2],
        endingDate: info[3],
      },
        { where: { id: rentId } }
      );
    }
  } catch (error) {
    console.log(error);
  }
}


module.exports = {
  rentUpdate,
  datePlus,
  getDatesInRange,
  filterDates,
  filterRentDates,
  statusUpdater,
}
