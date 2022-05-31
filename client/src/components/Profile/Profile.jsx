import { React, useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLocations } from "../../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";
import styles from './profile.module.css';

export default function Profile() {
    const [input, setInput] = useState({});
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
    }

    return (
        <div className={styles.profile}>
            {/* <h2>USER PROFILE:{user.email}</h2> */}
            <form onSubmit={(e) => handleSubmit(e)}>
                <div >
                    <div className={styles.titles}>First name: </div>
                    <input className={styles.inputs} type="text" value={input.name} name="name" onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    <div className={styles.titles}>Last name: </div>
                    <input className={styles.inputs} type="text" value={input.lastName} name="lastName" onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    <div className={styles.titles}>Email: </div>
                    < input className={styles.inputs} type="placeholder" value={input.email} name="email" onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    <div className={styles.titles}>Phone: </div>
                    <input className={styles.inputs} type="text" value={input.phone} name="phone" onChange={(e) => handleChange(e)} />
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
                    <input className={styles.inputs} type="text" value={input.DocumentId} name="DocumentId" onChange={(e) => handleChange(e)} />
                </div>
                <div className={styles.titles}>
                    <div>License: </div>
                    <input className={styles.select} type="text" value={input.license} name="license" onChange={(e) => handleChange(e)} />
                </div>
                <div >
                    <div className={styles.titles}>City: </div>

                    <select className={styles.select} value={input.city} onChange={handleChange} >
                        <option hidden>City</option>
                        {
                            locations?.map(l =>
                                <option key={l.city} value={l.id}>{l.city}</option>
                            )
                        }
                    </select>
                </div>
                <div className={styles.button}>
                    <button  type="submit">Go</button>
                </div>
            </form>
        </div>
    );
}
