import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import './NearbyMechanics.css';

const NearbyMechanics = () => {
  const [mechanics, setMechanics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      try {
        const res = await axios.get(`/mechanics/nearby`, {
          params: {
            lat,
            lng,
            radius: 5
          }
        });

        setMechanics(res.data);
      } catch (err) {
        console.error('Error fetching nearby mechanics:', err);
      } finally {
        setLoading(false);
      }
    }, (err) => {
      console.error('Geolocation error:', err);
      setLoading(false);
    });
  }, []);

  return (
    <div className="nearby-mechanics">
      <h2>Nearby Mechanics</h2>
      {loading && <p className="loading-text">Loading...</p>}
      {!loading && mechanics.length === 0 && <p className="no-mechanics">No mechanics found nearby.</p>}
      <ul className="mechanics-list">
        {mechanics.map((mech) => (
          <li key={mech._id} className="mechanic-card">
            <strong className="mechanic-name">{mech.name}</strong>
            <p className="mechanic-services">{mech.servicesOffered?.join(', ')}</p>
            <Link to={`/book/${mech._id}`}>
              <button className="book-button">Book This Mechanic</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NearbyMechanics;