/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { Axios } from 'axios';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const api = (baseUrl?:string): Axios  => {
  const defaultOptions = {
    baseURL: 'https://backend.gpdishekinah.online:8081/api/',
    withCredentials: true, // Tambahkan ini supaya cookie dikirim otomatis
  };

  // Buat instance Axios
  const instance = axios.create(defaultOptions);

  return instance;
}

export default api()
