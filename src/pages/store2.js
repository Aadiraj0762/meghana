import React, { useState, useEffect } from 'react';
import { Table, Button, Icon } from '@windmill/react-ui';

const StoreList = () => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5055/api/stores/')
      .then(response => response.json())
      .then(data => setStores(data));
  }, []);

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Store ID</th>
            <th>Store Name</th>
            <th>Address Line</th>
            <th>Area</th>
            <th>City</th>
            <th>State</th>
            <th>Pin Code</th>
            <th>Landmark</th>
            <th>Store Open Time</th>
            <th>Store Close Time</th>
            <th>Radius</th>
            <th>Status</th>
            <th>Manager</th>
            <th>User</th>
            <th>Landline</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Store Image</th>
          </tr>
        </thead>
        <tbody>
          {stores.map(store => (
            <tr key={store._id}>
              <td>{store.storeId}</td>
              <td>{store.storeName}</td>
              <td>{store.addressLine}</td>
              <td>{store.area}</td>
              <td>{store.city}</td>
              <td>{store.state}</td>
              <td>{store.pinCode}</td>
              <td>{store.landmark}</td>
              <td>{store.storeOpenTime}</td>
              <td>{store.storeCloseTime}</td>
              <td>{store.radius}</td>
              <td>{store.status}</td>
              <td>{store.manager}</td>
              <td>{store.user}</td>
              <td>{store.landline}</td>
              <td>{store.latitude}</td>
              <td>{store.longitude}</td>
              <td>{store.storeImage}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button href="/api/stores" icon="plus">Add Store</Button>
    </div>
  );
};

export default StoreList;

// import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
// import axios from 'axios';
// import Uploader from 'components/image-uploader/Uploader';

// const AddStore = () => {
//   const history = useHistory();
//   const [store, setStore] = useState({
//     storeId: '',
//     storeName: '',
//     addressLine: '',
//     area: '',
//     city: '',
//     state: '',
//     storeImage: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setStore((prevStore) => ({ ...prevStore, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('storeImage', store.storeImage);
//     axios.post('http://127.0.0.1:5055/api/stores/add', formData)
//       .then((response) => {
//         console.log(response);
//         setStore({});
//         // redirect to the list of stores
//         history.push('/stores');
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   return (
//     <div className="container mt-5">
//       <h1 className="text-2xl font-bold mb-4">Add Store</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//           <div className="mb-4">
//             <label className="block text-sm font-bold">Store ID</label>
//             <input
//               type="text"
//               name="storeId"
//               value={store.storeId}
//               onChange={handleChange}
//               className="block w-full p-2 pl-10 text-sm text-gray-700"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-bold">Store Name</label>
//             <input
//               type="text"
//               name="storeName"
//               value={store.storeName}
//               onChange={handleChange}
//               className="block w-full p-2 pl-10 text-sm text-gray-700"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-bold">Address Line</label>
//             <input
//               type="text"
//               name="addressLine"
//               value={store.addressLine}
//               onChange={handleChange}
//               className="block w-full p-2 pl-10 text-sm text-gray-700"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-bold">Area</label>
//             <input
//               type="text"
//               name="area"
//               value={store.area}
//               onChange={handleChange}
//               className="block w-full p-2 pl-10 text-sm text-gray-700"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-bold">City</label>
//             <input
//               type="text"
//               name="city"
//               value={store.city}
//               onChange={handleChange}
//               className="block w-full p-2 pl-10 text-sm text-gray-700"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-bold">State</label>
//             <input
//               type="text"
//               name="state"
//               value={store.state}
//               onChange={handleChange}
//               className="block w-full p-2 pl-10 text-sm text-gray-700"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-bold">Store Image</label>
//             <Uploader
//               onImageChange={(image) => {
//                 setStore((prevStore) => ({ ...prevStore, storeImage: image }));
//               }}
//             />
//           </div>
//         </div>
//         <button type="submit" className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
//           Add Store
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddStore;
const [store, setStore] = useState({});

const handleChange = (e) => {
  const { name, value } = e.target;
  setStore((prevStore) => ({ ...prevStore, [name]: value }));
};

const handleSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(e.form);
  formData.append('storeId', store.storeId);
  formData.append('storeName', store.storeName);
  formData.append('addressLine', store.addressLine);
  formData.append('area', store.area);
  formData.append('city', store.city);
  formData.append('state', store.state);
  formData.append('pinCode', store.pinCode);
  formData.append('landmark', store.landmark);
  formData.append('storeImage', store.storeImage);
  axios.post('http://127.0.0.1:5055/api/stadd', formData)
    .then((response) => {
      console.log(response);
      setStore({});
      // redirect to the list of stores
      history.push('/stores');
    })
    .catch((error) => {
      console.error(error);
    });
}

const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
  if (!form.checkValidity()) {
    e.preventDefault();
    alert('Please fill in all required fields');
  }
});

return (
  <div className="container mt-5">
    <h1 className="text-2xl font-bold mb-4">Add Store</h1>
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="block text-sm font-bold">Store ID</label>
          <input
            type="text"
            name="storeId"
            value={store.storeId}
            onChange={handleChange}
            className="block w-full p-2 pl-10 text-sm text-gray-700"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold">Store Name</label>
          <input
            type="text"
            name="storeName"
            value={store.storeName}
            onChange={handleChange}
            className="block w-full p-2 pl-10 text-sm text-gray-700"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold">Address Line</label>
          <input
            type="text"
            name="addressLine"
            value={store.addressLine}
            onChange={handleChange}
            className="block w-full p-2 pl-10 text-sm text-gray-700"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold">Area</label>
          <input
            type="text"
            name="area"
            value={store.area}
            onChange={handleChange}
            className="block w-full p-2 pl-10 text-sm text-gray-700"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold">City</label>
          <input
            type="text"
            name="city"
            value={store.city}
            onChange={handleChange}
            className="block w-full p-2 pl-10 text-sm text-gray-700"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold">State</label>
          <input
            type="text"
            name="state"
            value={store.state}
            onChange={handleChange}
            className="block w-full p-2 pl-10 text-sm text-gray-700"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold">Pin Code</label>
          <input
            type="text"
            name="pinCode"
            value={store.pinCode}
            onChange={handleChange}
            className="block w-full p-2 pl-10 text-sm text-gray-700"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold">Landmark</label>
          <input
            type="text"
            name="landmark"
            value={store.landmark}
            onChange={handleChange}
            className="block w-full p-2 pl-10 text-sm text-gray-700"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold">Store Image</label>
          <Uploader
            onImageChange={(image) => {
              setStore((prevStore) => ({ ...prevStore, storeImage: image }));
            }
          />
        </div>
      </div>
      <button type="submit" className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
        Add Store
      </button>
    </form>
  </div>
);
