/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { Axios } from 'axios';

const api = (baseUrl?:string): Axios  => {
  const defaultOptions = {
    baseURL: baseUrl,
    withCredentials: true, // Tambahkan ini supaya cookie dikirim otomatis
  };

  // Buat instance Axios
  const instance = axios.create(defaultOptions);

  return instance;
}

export default api()
