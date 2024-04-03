"use client";

// import React from "react";
// import GoogleMap from "google-map-react";

// const AnyReactComponent = ({ text }: { text: string }) => (
//   <>
//     {text}
//     <span className="text-red-500 animate-pulse">
//       <svg
//         stroke="currentColor"
//         fill="currentColor"
//         strokeWidth="0"
//         viewBox="0 0 384 512"
//         height="2em"
//         width="2em"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"></path>
//       </svg>
//     </span>
//   </>
// );
// const MapIndex = () => {
//   const defaultProps = {
//     center: {
//       lat: 23.3554457 as number,
//       lng: 85.3606274 as number,
//     },
//     zoom: 11,
//   };

//   return (
//     <div className="mt-12" style={{ height: "30vh", width: "100%" }}>`
//       <GoogleMap
//         bootstrapURLKeys={{ key: "" }}
//         defaultZoom={defaultProps.zoom}
//         center={defaultProps.center}

//         onChange={(e) => {
//           console.log(e.bounds);
//         }}
//       >
//         <AnyReactComponent
//           lat={23.3554457}
//           lng={85.3606274}
//           text="you are here"
//         />
//       </GoogleMap>
//     </div>
//   );
// };

// export default MapIndex;
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const MapIndex = () => {
  const [position, setPosition] = useState<{
    latitude: number;
    longitude: number;
  }>({
    latitude: 0,
    longitude: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        if (result)
          navigator.geolocation.getCurrentPosition(function (position) {
            setPosition({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
            setLoading(false);
          });
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }, []);

  const LeafIcon = () =>
    L.divIcon({
      iconSize: [20, 20],
      className: "animate-pulse",
      html: `<svg stroke="currentColor" fill="red" stroke-width="0" viewBox="0 0 384 512" height="3em" width="3em" xmlns="http://www.w3.org/2000/svg"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"></path></svg>`,
    });

  return (
    <div className="mt-4">
      {loading ? (
        <div
          style={{ height: "35vh", width: "100%" }}
          className="bg-zinc-100 animate-pulse rounded-lg"
        ></div>
      ) : (
        <MapContainer
          center={[position.latitude, position.longitude]}
          zoom={12}
          style={{ height: "35vh", width: "100%" }}
          fadeAnimation
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            icon={LeafIcon()}
            position={[position.latitude, position.longitude]}
          >
            <Popup>Ranchi Muncipal Corporation.</Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
};

export default MapIndex;
