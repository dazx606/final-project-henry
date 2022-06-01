import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLocations, patchUser } from "../../redux/actions";
import styles from "./profile.module.css";
import { useParams, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function Profile() {
  const [errors, setErrors] = useState({});
  const locations = useSelector((state) => state.locations);
  const { userId } = useParams();
  const { user } = useAuth0();
  const [input, setInput] = useState({
    firstName: user ? user.given_name : "",
    lastName: user ? user.family_name : "",
  });

  const dispatch = useDispatch();
  useEffect(() => {
    if (!locations.length) dispatch(getLocations());
  }, [dispatch]);

  function handleSubmit(e) {
    e.preventDefault();

    if (errors.firstName || errors.lastName || errors.phone || errors.license || errors.documentId) {
      alert("complete with your correct information");
      return;
    }
    if (!input.firstName || input.lastName || input.phone || input.license || input.documentId) {
      alert("Complete your information");
      return;
    } else if (!user.email_verified) {
      alert("your email is not  verified");
      return;
    }

    dispatch(patchUser({ ...input, userId }));
    alert("you information is update");
  }
  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validations({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div className={styles.profile}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <h3> Hello {user.email}!</h3>
        <div>
          <div className={styles.titles}>First name: </div>
          <input
            className={styles.inputs}
            type="text"
            value={input.firstName}
            name="firstName"
            onChange={(e) => handleChange(e)}
          />
          {errors.firstName && <p>{errors.firstName}</p>}
        </div>
        <div>
          <div className={styles.titles}>Last name: </div>
          <input
            className={styles.inputs}
            type="text"
            value={input.lastName}
            name="lastName"
            onChange={(e) => handleChange(e)}
          />
          {errors.lastName && <p>{errors.lastName}</p>}
        </div>
        <div>
          <div className={styles.titles}>Phone: </div>
          <input
            className={styles.inputs}
            type="text"
            value={input.phone}
            name="phone"
            onChange={(e) => handleChange(e)}
          />
          {errors.phone && <p>{errors.phone}</p>}
        </div>
        <div>
          <div className={styles.titles}>Language: </div>
          <select className={styles.inputs} value={input.language} name="language" onChange={(e) => handleChange(e)}>
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
          </select>
        </div>
        <div className={styles.titles}>
          <div>Document Id: </div>
          <input
            className={styles.inputs}
            type="text"
            value={input.documentId}
            name="documentId"
            onChange={(e) => handleChange(e)}
          />
          {errors.documentId && <p>{errors.documentId}</p>}
        </div>
        <div className={styles.titles}>
          <div>License: </div>
          <input
            className={styles.select}
            type="text"
            value={input.license}
            name="license"
            onChange={(e) => handleChange(e)}
          />
          {errors.license && <p>{errors.license}</p>}
        </div>
        <div>
          <div className={styles.titles}>City: </div>

          <select className={styles.select} value={input.city} name="city" onChange={handleChange}>
            <option>City</option>
            {locations?.map((l) => (
              <option key={l.city} value={l.id}>
                {l.city}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.button}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

function validations(input) {
  let errors = {};

  if (!input.firstName) {
    errors.firstName = "First name is required";
  } else if (!/^[a-z A-Z]+$/.test(input.firstName)) {
    errors.firstName = "First name must be letters only";
  } else if (input.firstName.length > 15) {
    errors.firstName = "First name must be less than 15 characters";
  }
  if (!input.lastName) {
    errors.lastName = "Last Name is required";
  } else if (!/^[a-z A-Z]+$/.test(input.lastName)) {
    errors.lastName = "Last Name must be letters only";
  }
  if (!input.license) {
    errors.license = "License is required";
  } else if (input.license.length < 6 || input.license.length > 7) {
    errors.license = "License must be at least 6 characters";
  }
  if (!input.documentId) {
    errors.documentId = "Document Id is required";
  } else if (input.documentId.length < 5 || input.documentId.length > 15) {
    errors.documentId = "Document Id must be  at least 8 characters";
  }
  if (!input.phone) {
    errors.phone = "Phone is required";
  } else if (input.phone && !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(input.phone)) {
    errors.phone = "Phone incorrect";
  }

  return errors;
}
