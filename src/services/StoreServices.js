import requests from './httpService';

const StoreServices = {

  getAllStores: async () => {
    return requests.get('/store');
  },
  getStoreById: async (id) => {
    return requests.get(`/store/${id}`);
  },
  getStoresByRadius: async (radius) => {
    return requests.get(`/store/radius/${radius}`);
  },
  updateStore: async (id, body) => {
    return requests.patch(`/store/${id}`, body);
  },
  deleteStore: async (id) => {
    return requests.delete(`/store/${id}`);
  },
};

export default StoreServices;
