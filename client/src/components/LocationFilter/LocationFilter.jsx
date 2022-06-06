import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getLocations, setCity } from '../../redux/actions';
import styles from './LocationFilter.module.css';

function LocationFilter() {
  
  //react-redux
  const locations = useSelector((state) => state.locations);
  const city = useSelector ((state) => state.city);
  const navigate = useNavigate();
  const {locationId} = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!locations.length) dispatch(getLocations());
    if (locationId) dispatch(setCity(locationId));
  }, [dispatch]);

  function handleLocChange(e) {
    dispatch(setCity(e.target.value))
    if (locationId) navigate(`/city/${e.target.value}`)
  };


  return (
    <select className={styles.citySelect} value={city} onChange={handleLocChange} >
      <option className={styles.cityOptions} hidden>City</option>
      {
        locations?.map(l =>
          <option className={styles.cityOptions} key={l.city} value={l.id}>{l.city}</option>
        )
      }
    </select>
  )
}

export default LocationFilter