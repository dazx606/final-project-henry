import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import style from './AdminCars.module.css';
import CreateCar from './CreateCar';
import CreateModel from './CreateModel';

function AdminCars() {
  const allCars = useSelector(state => state.allCars);
  const [carOption, setCarOption] = useState('allCars')

  function handleCarsSearch() {
    console.log('hola')
  }
  function handleCarOption(e) {
    setCarOption(e.target.value)
  }

  return (
    <div>
      {
        carOption === 'allCars' &&
          <div className={style.searchCar}>
            <input className={`inputGlobal ${style.inputSearch}`} type='search' placeholder="Find car by license plate" onChange={handleCarsSearch} />
            <button value='Add model' onClick={handleCarOption}>Add car model</button>
            <button value='Add car' onClick={handleCarOption}>Add car</button>
          </div>
      }
      {
        carOption === 'Add model' &&
        <div>
          <CreateModel />
        </div>
      }
      {
        carOption === 'Add car' && 
        <div>
          <CreateCar />
        </div>
      }

      {/* <div className={style.usersBox}>
        {allUsers.length ?
          <div>
            <div className={style.listTitle}>
              <div className={style.imgIcon}></div>
              <div className={style.name}>First Name</div>
              <div className={style.name}>Last Name</div>
              <div className={style.email}>Email</div>
              <div className={style.trashIcon}>Delete User</div>
            </div>
            {allUsers?.map((u) => <CarListItem handleTClick={handleTClick} key={u.id} user={u} />)}
          </div>
          :
          <div>User not found</div>

        }
      </div> */}

    </div>
  )
}

export default AdminCars