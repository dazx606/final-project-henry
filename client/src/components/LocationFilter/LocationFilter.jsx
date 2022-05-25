import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getLocations, setCity } from '../../redux/actions';

function LocationFilter() {
  
  //react-redux
  const locations = useSelector((state) => state.locations);
  const city = useSelector ((state) => state.city)
  const navigate = useNavigate();
  const {locationId} = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLocations());
  }, [dispatch]);

  function handleLocChange(e) {
    dispatch(setCity(e.target.value))
    if (locationId) navigate(`/city/${e.target.value}`)
  };


  return (
    <select value={city} onChange={handleLocChange} >
      <option hidden>City</option>
      {
        locations?.map(l =>
          <option key={l.city} value={l.id}>{l.city}</option>
        )
      }
    </select>
  )
}

export default LocationFilter