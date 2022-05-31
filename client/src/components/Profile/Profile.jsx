import { React, useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLocations } from "../../redux/actions";

export default function Profile() {
    const [input, setInput] = useState({});
    const locations = useSelector((state) => state.locations);
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
        <div>
            <h2>PROFILE FORM</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <div>First name: </div>
                    <input type="text" value={input.name} name="name" onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    <div>Last name: </div>
                    <input type="text" value={input.lastName} name="lastName" onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    <div>Email: </div>
                    < input type="placeholder" value={input.email} name="email" onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    <div>Phone: </div>
                    <input type="text" value={input.phone} name="phone" onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    <div>Language: </div>
                    <select value={input.language} name="language" onChange={(e) => handleChange(e)}>
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                    </select>
                </div>
                <div>
                    <div>Document Id: </div>
                    <input type="text" value={input.DocumentId} name="DocumentId" onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    <div>License: </div>
                    <input type="text" value={input.license} name="license" onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    <div>City: </div>

                    <select value={input.city} onChange={handleChange} >
                        <option hidden>City</option>
                        {
                            locations?.map(l =>
                                <option key={l.city} value={l.id}>{l.city}</option>
                            )
                        }
                    </select>
                </div>
                <button type="submit">Go</button>
            </form>
        </div>
    );
}
