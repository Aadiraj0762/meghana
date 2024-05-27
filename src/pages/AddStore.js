import React, { useState, useRef } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { icon } from "leaflet";
import "leaflet/dist/leaflet.css"; // Custom marker icon
const AddStoreForm = () => {
  const [formData, setFormData] = useState({
    storeName: "",
    addressLine: "",
    area: "",
    city: "",
    state: "",
    pinCode: "",
    landmark: "",
    storeOpenTime: "",
    storeCloseTime: "",
    radius: "",
    status: "open",
    manager: "",
    user: "",
    landline: "",
    latitude: 20.593684, // Updated latitude as per Google Maps
    longitude: 78.962880, // Updated longitude as per Google Maps
    storeImage: [],
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, storeImage: [...formData.storeImage, file] });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:5055/api/store/add",
        formData
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const indiaCenter = {
    lat: 20.5937,
    lng: 78.9629,
  };

  const ClickableMap = () => {
    const markerRef = useRef(null);

    const handleDragEnd = (e) => {
      const marker = markerRef.current;
      if (marker) {
        const latlng = marker.getLatLng();
        setFormData({
          ...formData,
          latitude: latlng.lat,
          longitude: latlng.lng,
        });
      }
    };

    const customIcon = icon({
      iconUrl: "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });

    return (
      <MapContainer center={[formData.latitude, formData.longitude]} zoom={5} style={{ height: "400px", width: "100%", cursor: "crosshair" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[formData.latitude, formData.longitude]} ref={markerRef} draggable={true} icon={customIcon} eventHandlers={{ dragend: handleDragEnd }}>
          <Popup>
            Latitude: {formData.latitude}, Longitude: {formData.longitude}
          </Popup>
        </Marker>
      </MapContainer>
    );
  };


  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="storeName"
        value={formData.storeName}
        onChange={handleChange}
        placeholder="Store Name"
      />
      <input
        type="text"
        name="addressLine"
        value={formData.addressLine}
        onChange={handleChange}
        placeholder="Address Line"
      />
      <input
        type="text"
        name="area"
        value={formData.area}
        onChange={handleChange}
        placeholder="Area"
      />
      <input
        type="text"
        name="city"
        value={formData.city}
        onChange={handleChange}
        placeholder="City"
      />
      <input
        type="text"
        name="state"
        value={formData.state}
        onChange={handleChange}
        placeholder="State"
      />
      <input
        type="text"
        name="pinCode"
        value={formData.pinCode}
        onChange={handleChange}
        placeholder="Pin Code"
      />
      <input
        type="text"
        name="landmark"
        value={formData.landmark}
        onChange={handleChange}
        placeholder="Landmark"
      />
      <input
        type="text"
        name="storeOpenTime"
        value={formData.storeOpenTime}
        onChange={handleChange}
        placeholder="Store Open Time"
      />
      <input
        type="text"
        name="storeCloseTime"
        value={formData.storeCloseTime}
        onChange={handleChange}
        placeholder="Store Close Time"
      />
      <input
        type="number"
        name="radius"
        value={formData.radius}
        onChange={handleChange}
        placeholder="Radius"
      />
      <select name="status" value={formData.status} onChange={handleChange}>
        <option value="open">Open</option>
        <option value="closed">Closed</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
      <input
        type="text"
        name="manager"
        value={formData.manager}
        onChange={handleChange}
        placeholder="Manager"
      />
      <input
        type="text"
        name="user"
        value={formData.user}
        onChange={handleChange}
        placeholder="User"
      />
      <input
        type="text"
        name="landline"
        value={formData.landline}
        onChange={handleChange}
        placeholder="Landline"
      />
      <input
        type="text"
        name="latitude"
        value={formData.latitude}
        onChange={handleChange}
        placeholder="Latitude"
      />
      <input
        type="text"
        name="longitude"
        value={formData.longitude}
        onChange={handleChange}
        placeholder="Longitude"
      />
      <p>insert the image below</p>
      <input
        type="file"
        name="storeImage"
        onChange={handleFileChange}
        multiple
      />
      <ClickableMap />

      <button type="submit">Submit</button>
    </form>
  );
};
export default AddStoreForm;
