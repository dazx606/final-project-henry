import React, { useEffect, useState } from 'react';
import styles from "./Drivers.module.css";

const driverData = {
    firstName: "",
    lastName: "",
    licenseNumber: "",
    documentId: ""
}
export default function Drivers({ drivers, setDrivers }) {

    const [showAddDriver, setShowAddDriver] = useState(true)
    const [driver, setDriver] = useState(driverData)
    const [error, setError] = useState("")

    useEffect(() => {
        setError("")
        if (drivers.find(el => el.documentId === driver.documentId)) setError("Document ID already added")
    }, [drivers, driver.documentId])

    const handleDelete = (e) => {
        setDrivers(drivers.filter(el => el.documentId !== e.target.name))
    }

    const handleShowAddDriver = () => {
        setShowAddDriver(!showAddDriver)
    }

    const handleAddDriver = () => {
        setDrivers([...drivers, driver])
        setShowAddDriver(true)
        setDriver(driverData)
    }

    const handleInput = (e) => {
        setDriver({ ...driver, [e.target.name]: e.target.value })
    }

    return (
        <div className={styles.container}>
            <div className={styles.subContainer}>
                <input className={styles.button} type="button" onClick={handleShowAddDriver} value="Add Driver" />
            </div>
            <div className={styles.subContainer2} hidden={showAddDriver}>
                <div className={styles.container3}>
                    <div className={styles.labels}><label>First Name: </label></div>

                    <input className={styles.inputs} onChange={handleInput} value={driver.firstName} type="text" name="firstName" />
                </div>
                <div className={styles.container3}>
                    <label className={styles.labels}>Last Name: </label>
                    <input className={styles.inputs} onChange={handleInput} value={driver.lastName} type="text" name="lastName" />
                </div>
                <div className={styles.container3}>
                    <label className={styles.labels}>License Number: </label>
                    <input className={styles.inputs} onChange={handleInput} value={driver.licenseNumber} type="text" name="licenseNumber" />
                </div>
                <div className={styles.container3}>
                    <label className={styles.labels}>Document ID: </label>
                    <input className={styles.inputs} onChange={handleInput} value={driver.documentId} type="text" name="documentId" />
                </div>
                {
                    error ? <span>{error}</span> :
                        <div className={styles.buttonAdd}><input className={styles.button} type="button" disabled={error || !driver.documentId || !driver.firstName || !driver.lastName || !driver.licenseNumber} value="Add" onClick={handleAddDriver} /></div>
                }
            </div>
            {drivers.map((el, k) =>
                <div className={styles.buttonX} key={k}>
                    <p>{`${k + 1}.- ${el.firstName} ${el.lastName}`}</p>
                    <input className={styles.delete} type="button" onClick={handleDelete} value='X' name={el.documentId} />

                </div>
            )}
        </div>
    )
}
