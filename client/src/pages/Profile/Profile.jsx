import { React, useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLocations } from "../../redux/actions";
//import { useAuth0 } from "@auth0/auth0-react";
import styles from './profile.module.css';

export default function Profile() {
    const [input, setInput] = useState({});
    const [errors, setErrors] = useState({});
    const locations = useSelector((state) => state.locations);
    // const { user } = useAuth0();
    const dispatch = useDispatch()
    useEffect(() => {
        if (!locations.length) dispatch(getLocations());

    }, [dispatch]);

    function handleSubmit(e) {
        e.preventDefault();
        setInput({
            name: "",
            lastName: "",
            email: "",
            phone: "",
            language: "",
            DocumentId: "",
            license: "",
            city: "",
        });
    }
    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        setErrors(validations({
            ...input,
            [e.target.name]: e.target.value,
        }))
    }

    return (
        <div className={styles.profile}>
            {/* <h2>USER PROFILE:{user.email}</h2> */}
            <form onSubmit={(e) => handleSubmit(e)}>
                <div >
                    <div className={styles.titles}>First name: </div>
                    <input className={styles.inputs} type="text" value={input.name} name="name" onChange={(e) => handleChange(e)} />
                    {
                        errors.name &&
                        (<p>{errors.name}</p>)
                    }
                </div>
                <div>
                    <div className={styles.titles}>Last name: </div>
                    <input className={styles.inputs} type="text" value={input.lastName} name="lastName" onChange={(e) => handleChange(e)} />
                    {
                        errors.lastName &&
                        (<p>{errors.lastName}</p>)
                    }
                </div>
                <div>
                    <div className={styles.titles}>Email: </div>
                    < input className={styles.inputs} type="placeholder" value={input.email} name="email" onChange={(e) => handleChange(e)} />
                    {
                        errors.email &&
                        (<p>{errors.email}</p>)
                    }
                </div>
                <div>
                    <div className={styles.titles}>Phone: </div>
                    <input className={styles.inputs} type="text" value={input.phone} name="phone" onChange={(e) => handleChange(e)} />
                    {
                        errors.phone &&
                        (<p>{errors.phone}</p>)
                    }
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
                    <input className={styles.inputs} type="text" value={input.documentId} name="documentId" onChange={(e) => handleChange(e)} />
                    {errors.documentId &&
                        (<p>{errors.documentId}</p>)}

                </div>
                <div className={styles.titles}>
                    <div>License: </div>
                    <input className={styles.select} type="text" value={input.license} name="license" onChange={(e) => handleChange(e)} />
                    {errors.license &&
                        (<p>{errors.license}</p>)}
                </div>
                <div >
                    <div className={styles.titles}>City: </div>

                    <select className={styles.select} value={input.city} name='city' onChange={handleChange} >
                        <option>City</option>
                        {
                            locations?.map(l =>
                                <option key={l.city} value={l.id}>{l.city}</option>
                            )
                        }
                    </select>
                </div>
                <div className={styles.button}>
                    <button type="submit">Go</button>
                </div>
            </form>
        </div>
    );
}

function validations(input) {
    let errors = {}

    if (!input.name) {
        errors.name = " Name is required"
    } else if (!/^[a-z A-Z]+$/.test(input.name)) {
        errors.name = " Name must be letters only"
    } else if (input.name.length > 15) {
        errors.name = " Name must be less than 15 characters"
    }
    if (!input.lastName) {
        errors.lastName = " Last Name is required"
    } else if (!/^[a-z A-Z]+$/.test(input.lastName)) {
        errors.lastName = " Last Name must be letters only"
    }
    if (!input.license) {
        errors.license = "License is required"
    } else if (input.license !== 10) {
        errors.license = "License must be at least 10 characters between letters and numbers"
    }
    if (!input.documentId) {
        errors.documentId = "Document Id is required"
    } else if (input.DocumentId !== 8) {
        errors.documentId = "Document Id must be 8 characters letters o numbers"
    }
    if (!input.phone) {
        errors.phone = "Phone is required"
    } else if (input.phone && !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test) {
        errors.phone = "Phone incorrect"
    }
    return errors
}
