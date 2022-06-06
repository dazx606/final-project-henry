import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLocations, patchUser, setUserInfo } from "../../redux/actions";
import styles from "./profileUpdate.module.css";
import { useParams, Navigate, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function Profile() {
  const [errors, setErrors] = useState({});
  const locations = useSelector((state) => state.locations);
  const userInfo = useSelector((state) => state.user);
  const { userId } = useParams();
  const { user, getAccessTokenSilently } = useAuth0();
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    license: "",
    documentId: "",
  });
  const [alert, setAlert] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    if (!locations.length) dispatch(getLocations());
    if (user) {
      dispatch(setUserInfo(getAccessTokenSilently, user.email));
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;
    setInput({
      ...input,
      firstName: userInfo.data?.firstName || user.given_name || "",
      lastName: userInfo.data?.lastName || user.family_name || "",
      phone: userInfo.data?.phone || "",
      license: userInfo.data?.license || "",
      documentId: userInfo.data?.documentId || "",
    });
  }, [userInfo]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!user.email_verified) {
      setAlert("Your email is not verified");

      return;
    }
    if (errors.firstName || errors.lastName || errors.phone || errors.license || errors.documentId) {
      setAlert(" Please complete with your correct information");
      return;
    }
    if (!input.firstName || !input.lastName || !input.license || !input.documentId) {
      setAlert(" Please complete your information");
      return;
    }
    dispatch(patchUser(getAccessTokenSilently, { ...input, userId }));
    setAlert("Your information is update!");
    if (
      errors.firstName ||
      errors.lastName ||
      errors.phone ||
      errors.license ||
      errors.documentId
    ) {
      setAlert("Complete with your correct information");
      return;
    }
    if (
      !input.firstName ||
      !input.lastName ||
      !input.license ||
      !input.documentId
    ) {
      setAlert("Complete your information");
      return;
    }
    await dispatch(patchUser(getAccessTokenSilently, { ...input, userId }));
    await dispatch(setUserInfo(getAccessTokenSilently, user.email));
    setAlert("Your information is update");
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
      {alert === "Your information is update!" ? (
        <div>
          <div className={styles.messages}>{alert}</div>
          <div className={styles.buttonContainer}>
            <Link to="/">
              <button className={`buttonGlobal ${styles.button}`}>Home</button>
            </Link>
            <Link to={`/profile/${userId}`}>
              <button className={`buttonGlobal ${styles.buttonProfile}`}> Profile</button>
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h3 className={styles.helloP}> Hello {user.email}!</h3>
          <div>
            <div className={styles.titles}>First name: </div>
            <input
              className={`${styles.inputGlobal} ${styles.inputs}`}
              type="text"
              value={input.firstName}
              name="firstName"
              onChange={handleChange}
            />
            {errors.firstName && (
              <p className={styles.validations}>{errors.firstName}</p>
            )}
          </div>
          <div>
            <div className={styles.titles}>Last name: </div>
            <input
              className={`${styles.inputGlobal} ${styles.inputs}`}
              type="text"
              value={input.lastName}
              name="lastName"
              onChange={handleChange}
            />
            {errors.lastName && (
              <p className={styles.validations}>{errors.lastName}</p>
            )}
          </div>
          <div>
            <div className={styles.titles}>Phone: </div>
            <input
              className={`${styles.inputGlobal} ${styles.inputs}`}
              type="text"
              value={input.phone}
              name="phone"
              onChange={handleChange}
            />
            {errors.phone && (
              <p className={styles.validations}>{errors.phone}</p>
            )}
          </div>
          <div>
            <div className={styles.titles}>Language: </div>
            <select
              className={`${styles.inputGlobal} ${styles.inputs}`}
              value={input.language}
              name="language"
              onChange={handleChange}
            >
              <option value="English">English</option>{" "}
              <option value="Spanish">Spanish</option>
            </select>
          </div>
          <div>
            <div className={styles.titles}>Document Id: </div>
            <input
              className={`${styles.inputGlobal} ${styles.inputs}`}
              type="text"
              value={input.documentId}
              name="documentId"
              onChange={handleChange}
            />
            {errors.documentId && (
              <p className={styles.validations}>{errors.documentId}</p>
            )}
          </div>
          <div>
            <div className={styles.titles}>License: </div>
            <input
              className={`${styles.inputGlobal} ${styles.inputs}`}
              type="text"
              value={input.license}
              name="license"
              onChange={handleChange}
            />
            {errors.license && (
              <p className={styles.validations}>{errors.license}</p>
            )}
          </div>
          <div>
            <div className={styles.titles}>City: </div>
            <select
              className={`${styles.inputGlobal} ${styles.inputs}`}
              value={input.city}
              name="city"
              onChange={handleChange}
            >
              <option>City</option>
              {locations?.map((l) => (
                <option key={l.city} value={l.id}>
                  {l.city}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.buttonContainer}>
            <button className={`buttonGlobal ${styles.button}`} type="submit">
              Submit
            </button>
          </div>
          <p className={styles.messages}>{alert}</p>
        </form>
      )}
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
  } else if (input.license.length < 5 || input.license.length > 20) {
    errors.license = "License invalid";
  }
  if (!input.documentId) {
    errors.documentId = "Document Id is required";
  } else if (input.documentId.length < 5 || input.documentId.length > 20) {
    errors.documentId = "Document Id invalid";
  }
  if (input.phone && !/^[0-9\+]{1,}[0-9\-]{3,15}$/.test(input.phone)) {
    errors.phone = "Phone incorrect";
  }

  return errors;
}
