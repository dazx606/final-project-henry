import React, { useEffect, useState } from 'react'

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
        if(drivers.find(el => el.documentId === driver.documentId)) setError("Document ID already added")
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
        setDriver({...driver, [e.target.name]: e.target.value}) 
    }

    return (
        <div>
            <input type="button" onClick={handleShowAddDriver} value="Add Driver" />
            <div hidden={showAddDriver}>
                <div>
                    <label>First Name </label>
                    <input onChange={handleInput} value={driver.firstName} type="text" name="firstName" />
                </div>
                <div>
                    <label>Last Name </label>
                    <input onChange={handleInput} value={driver.lastName}  type="text" name="lastName" />
                </div>
                <div>
                    <label>License Number </label>
                    <input onChange={handleInput} value={driver.licenseNumber} type="text" name="licenseNumber" />
                </div>
                <div>
                    <label>Document ID </label>
                    <input onChange={handleInput} value={driver.documentId} type="text" name="documentId" />
                </div>
                {
                    error && <span>{error}</span>
                }
                <div><input type="button" disabled={error} value="Add" onClick={handleAddDriver} /></div>
            </div>
            {drivers.map((el, k) =>
                <div key={k}>
                    <p>{`${k + 1}.- ${el.firstName} ${el.lastName}`}</p>
                    <input type="button" onClick={handleDelete} value="X" name={el.documentId} />
                </div>
            )}
        </div>
    )
}
