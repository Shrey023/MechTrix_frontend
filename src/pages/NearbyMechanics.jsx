import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import './NearbyMechanics.css';

const NearbyMechanics = () => {
  const [mechanics, setMechanics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customerLocation, setCustomerLocation] = useState(null);
  const [fareCache, setFareCache] = useState({});

  // ✅ Haversine formula to calculate distance between two coordinates
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return Math.round(distance * 10) / 10; // Round to 1 decimal place
  };

  // ✅ Fetch visiting charges for all mechanics in parallel
  const fetchVisitingCharges = async (mechanicsData, lat, lng) => {
    try {
      // Calculate distances for all mechanics
      const mechanicsWithDistance = mechanicsData.map((mech) => {
        const distance = calculateDistance(
          lat,
          lng,
          mech.location.coordinates[1],
          mech.location.coordinates[0]
        );
        return { ...mech, distance };
      });

      // Fetch fares in parallel using Promise.all
      const fareRequests = mechanicsWithDistance.map(async (mech) => {
        try {
          const res = await axios.post(
            `/mechanic/${mech._id}/calculate-fare`,
            { distanceKm: mech.distance }
          );
          return {
            mechanicId: mech._id,
            visitingCharge: res.data.visitingCharge,
            distance: mech.distance
          };
        } catch (err) {
          console.error(`Error fetching fare for mechanic ${mech._id}:`, err);
          return {
            mechanicId: mech._id,
            visitingCharge: null,
            distance: mech.distance
          };
        }
      });

      const fares = await Promise.all(fareRequests);

      // Cache the results
      const cache = {};
      fares.forEach((fare) => {
        cache[fare.mechanicId] = {
          visitingCharge: fare.visitingCharge,
          distance: fare.distance
        };
      });
      setFareCache(cache);

      // Update mechanics with distance and fare data
      const updatedMechanics = mechanicsWithDistance.map((mech) => ({
        ...mech,
        ...cache[mech._id]
      }));

      setMechanics(updatedMechanics);
    } catch (err) {
      console.error('Error fetching visiting charges:', err);
      // Still display mechanics even if fares fail
      const mechanicsWithDistance = mechanicsData.map((mech) => {
        const distance = calculateDistance(
          lat,
          lng,
          mech.location.coordinates[1],
          mech.location.coordinates[0]
        );
        return { ...mech, distance, visitingCharge: null };
      });
      setMechanics(mechanicsWithDistance);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setCustomerLocation({ lat, lng });

        try {
          const res = await axios.get(`/mechanics/nearby`, {
            params: {
              lat,
              lng,
              radius: 5
            }
          });

          // ✅ Fetch visiting charges for all mechanics
          await fetchVisitingCharges(res.data, lat, lng);
        } catch (err) {
          console.error('Error fetching nearby mechanics:', err);
          setMechanics([]);
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.error('Geolocation error:', err);
        setLoading(false);
      }
    );
  }, []);

  return (
    <div className="nearby-mechanics">
      <h2>Nearby Mechanics</h2>
      {loading && <p className="loading-text">Loading...</p>}
      {!loading && mechanics.length === 0 && (
        <p className="no-mechanics">No mechanics found nearby.</p>
      )}
      <ul className="mechanics-list">
        {mechanics.map((mech) => (
          <li key={mech._id} className="mechanic-card">
            <strong className="mechanic-name">{mech.name}</strong>
            <p className="mechanic-services">{mech.servicesOffered?.join(', ')}</p>

            {/* ✅ Distance and Visiting Charge Display */}
            <div className="mechanic-pricing">
              <div className="pricing-item">
                <span className="pricing-label">Distance:</span>
                <span className="pricing-value">
                  {mech.distance ? `${mech.distance} km` : '—'}
                </span>
              </div>
              <div className="pricing-item">
                <span className="pricing-label">Visiting Charge:</span>
                <span className="pricing-value">
                  {mech.visitingCharge !== undefined && mech.visitingCharge !== null
                    ? `₹${mech.visitingCharge}`
                    : '—'}
                </span>
              </div>
              <div className="pricing-note">Paid after repair</div>
            </div>

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