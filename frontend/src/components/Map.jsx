import React from "react";
import GoogleMapReact from "google-map-react";
import locationMarker from "../assets/location-marker.png";

const AnyReactComponent = ({ image }) => (
  <img src={image} alt="Marker" style={{ width: "30px", height: "30px" }} />
);

const Map = ({ lat, lng }) => {

  const defaultProps = {
    center: {
      lat: lat,
      lng: lng,
    },
    zoom: 15,
  };

  return (
    <div style={{ height: "300px", width: "400px", marginTop: "10px" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={28.613939}
          lng={77.209023}
          image={locationMarker}
        />
      </GoogleMapReact>
    </div>
  );
};

export default Map;
