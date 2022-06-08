import React, { useEffect, useState } from "react";
import styles from "./adminReservationForm.module.css";
import AddDriver from "./AddDriver";
import { getOrderReservationId } from "../../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function AdminReservationForm() {
  const { getAccessTokenSilently } = useAuth0();
  const { orderId } = useParams();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getOrderReservationId(orderId, getAccessTokenSilently));
  });

  return (
    <div>
      <div className={styles.usersBox}>
        <h2>Reservation Detail:</h2>
        <form>
          <div>
            FirstName:
            <span>{order.user?.firstName}</span>
          </div>
          <div>
            LastName:
            <span>{order.user?.lastName}</span>
          </div>
          <div>
            Email:
            <span>{order.user?.email}</span>
          </div>
          <div>License:</div>
          <span>{order.user?.license}</span>
          <div>Reservation Status:</div>
          <select>
            <option value="">status</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
            <option value="inUse">In-Use</option>
            <option value="maintenance">Maintenance</option>
          </select>
          <div>
            <span>StartingDate:</span>
            <span>{order.startingDate}</span>
            <br />
            <span>EndingDate:</span>
            <span>{order.startingDate}</span>
          </div>
          <div>Payed</div>
          <br />
          <div>Car
          <span>{order.individualCar?.carModel.model}</span>
          <span>{order.individualCar?.carModel.brand}</span>
          </div>
          
          <div>
          <select>                       
            <option value="">Car</option>
            <option value=""></option>
            <option value=""></option>
          </select>
          </div>
          <div>
          </div>
          {/* <div>StartingDate</div>
          <input type="date" name="startingDate" value={input.startingDate} />
          <div>EndingDate</div>
          <input type="date" name="endingDate" value={input.endingDate} /> */}
          <div>
            <div>Location</div>
            <span>{order.individualCar?.locationId}</span>
            <div>
              Driver:
              <div>
                <span>FirstName</span>
                <span>{}</span>
                <br />
               {/* { order.drivers.map((driver) =>driver.firstName)} */}
                <span>LastName</span>
                <br />
                <span>License Number</span>
                <br />
                <span>Document Id</span>
                <br />
              </div>
            </div>
            <AddDriver />
            <button>Edit</button>
            <button>Delete</button>
          </div>
        </form>
      </div>
    </div>
  );
}
