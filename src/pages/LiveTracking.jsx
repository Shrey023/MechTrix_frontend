import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, DirectionsRenderer, useJsApiLoader } from "@react-google-maps/api";
import "./LiveTracking.css";

const containerStyle = {
  width: "100%",
  height: "80vh",
};

const center = {
  lat: 18.5204, // Pune
  lng: 73.8567,
};

const LiveTracking = () => {
  const [directions, setDirections] = useState(null);
  const [eta, setEta] = useState("");
  const [distance, setDistance] = useState("");

  const mechanicLocation = {
    lat: 38.8977,
    lng: -77.0365,
  };

  const customerLocation = {
    lat: 38.7749,
    lng: -77.1394,
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "REMOVED_GOOGLE_MAPS_KEY", // Replace with your key
    libraries: ["places"],
  });

  useEffect(() => {
    if (isLoaded) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: mechanicLocation,
          destination: customerLocation,
          travelMode: window.google.maps.TravelMode.DRIVING, // ✅ FIXED
        },
        (result, status) => {
          if (status === "OK") {
            setDirections(result);
            const leg = result.routes[0].legs[0];
            setEta(leg.duration.text);   // ✅ FIXED
            setDistance(leg.distance.text); // ✅ FIXED
          } else {
            console.error("Directions request failed due to " + status);
          }
        }
      );
    }
  }, [isLoaded]);

  if (!isLoaded) return <div className="loading-text">Loading Map...</div>;

  return (
    <div className="tracking-page">
      <h2 className="tracking-title">Real-Time Mechanic Tracking</h2>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
        <Marker position={mechanicLocation} label="🛠️" />
        <Marker position={customerLocation} label="📍" />
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
      <div className="info-box">
        <p>
          ETA: <strong>{eta}</strong>
        </p>
        <p>
          Distance: <strong>{distance}</strong>
        </p>
      </div>
    </div>
  );
};

export default LiveTracking;
