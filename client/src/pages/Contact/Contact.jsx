import React, { useMemo, useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { useDispatch } from 'react-redux';
import styles from "./Contact.module.css";
import { sendMessage } from '../../redux/actions';
const apiKEY = process.env.REACT_APP_API_KEY;

function Contact() {

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKEY,
  });

  return (
    <div>
      <div>
        <h3>GET IN TOUCH</h3>
        <p>AU Tte. Gral. Pablo Riccheri Km 33,5, B1802 Ezeiza, Provincia de Buenos Aires</p>
        <p>Phone: +54 9 11 3220 1367</p>
        <p>Email: info@rentacar.com</p>
      </div>
      <div>
        <div>
          <h3>FIND US HERE</h3>
          <p>RENT A CAR NEAR EZEIZA AIRPORT</p>
          <p>Bellow you will find our office location. You can also review then on the map so you can easily find us. If you need a vehicle delivered on your door just contact us.</p>
        </div>
        <div>
          {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3275.639918433856!2d-58.53701708489385!3d-34.81499997621464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcd0f4e2dea557%3A0xf19b6f81d441cc3b!2sAeropuerto%20Internacional%20Ezeiza!5e0!3m2!1ses!2sar!4v1653610621032!5m2!1ses!2sar" width="400" height="300" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
          {
            !isLoaded ? (<div>Loading...</div>) : <Map />
          }
        </div>
      </div>
      <div>
        <Form />
      </div>
    </div>
  )
}

function Map() {
  const center = useMemo(() => ({ lat: -34.81204911758577, lng: -58.53459236831713 }), []);
  return (
    <div>
      <GoogleMap zoom={14} center={center} mapContainerClassName={styles.mapContainer}>
        <Marker position={center} title='Aeropuerto Internacional Ezeiza' />
      </GoogleMap>

    </div>
  )
}

function validate(input) {
  let errors = {};

  if (!input.name) {
    errors.name = 'Full name is required.';
  } else if (!/^[a-z A-Z]+$/.test(input.name)) {
    errors.name = 'You have entered an invalid full name!';
  } else if (!input.email) {
    errors.email = 'Email is required.';
  } else if (!/\S+@\S+\.\S+/.test(input.email)) {
    errors.email = 'You have entered an invalid email address!';
  } else if (input.phone && !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(input.phone)) {
    errors.phone = 'You have entered an invalid phone number!';
  } else if (!input.message) {
    errors.message = 'Message is required.'
  } else if (input.subject.length > 101) {
    errors.subject = 'Subject can only be up to 100 types.'
  }

  return errors;
}

function Form() {

  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [disabled, setDisabled] = useState(true);
  const [input, setInput] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(sendMessage(input));
    setInput({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  }

  useEffect(() => {
    if (
      !errors.hasOwnProperty("name") &&
      !errors.hasOwnProperty("email") &&
      !errors.hasOwnProperty("message") &&
      !errors.hasOwnProperty("subject") &&
      input.name &&
      input.email &&
      input.message
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [errors, input, disabled]);

  return (
    <div>
      <h3>Please fill out the form below</h3>
      <form onSubmit={e => handleSubmit(e)}>
        <div>
          <label>Full name*: </label>
          <input type="text" value={input.name} name='name' onChange={e => handleChange(e)} />
          {
            errors.name &&
            (<p>{errors.name}</p>)
          }
        </div>
        <div>
          <label>Email*: </label>
          <input type="email" value={input.email} name='email' onChange={e => handleChange(e)} />
          {
            errors.email &&
            (<p>{errors.email}</p>)
          }
        </div>
        <div>
          <label>Phone: </label>
          <input type="number" value={input.phone} name='phone' onChange={e => handleChange(e)} />
          {
            errors.phone &&
            (<p>{errors.phone}</p>)
          }
        </div>
        <div>
          <label>Subject: </label>
          <input type="text" value={input.subject} name='subject' onChange={e => handleChange(e)} />
          {
            errors.subject &&
            (<p>{errors.subject}</p>)
          }
        </div>
        <div>
          <label>Message*: </label>
          <textarea type='text' value={input.message} name='message' onChange={e => handleChange(e)} />
          {
            errors.message &&
            (<p>{errors.message}</p>)
          }
        </div>
        <div>
          <p>* Please fill in required fields</p>
        </div>
        {
          disabled === false ?
            (<button className='buttonCreate' type='submit' disabled={disabled}>SUBMIT</button>) :
            (<button className='disabled' type='submit' disabled={disabled}>SUBMIT</button>)
        }
      </form>
    </div>
  )
}

export default Contact