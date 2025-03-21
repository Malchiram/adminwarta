/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "../api";
// import useSWR, { KeyedMutator } from "swr";
// const API_URL = '/api/proxy?endpoint=api/'
const API_URL = 'https://backend.gpdishekinah.online/api/'

export interface API_PROPS {
    url: string;
    method?: "GET" | "POST" | "PUT" | "DELETE" | "POST_MIRROR" | "PATCH";
    data?: any;
    formData?: any
    params?: any;
    Customheaders?: any;
  }
const fetcherSWR = async (props: API_PROPS): Promise<any> => {
  switch (props.method) {
    case "POST":
      return await fetcherPOST(props);
    case "GET":
      return await fetcherGET(props);
    default:
      return await fetcherGET(props);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetcherGET = async (props: API_PROPS): Promise<any> => {
  const response = await api.get(`${API_URL}${props.url}`, {
    params: props.params,
    headers: props.Customheaders,
  });
  return response.data;
};
export const fetcherPOST = async (props: API_PROPS): Promise<any> => {
 
    const response = await api.post(`${API_URL}${props.url}`, props.data, {
      headers: props.Customheaders,
    });
    return response
};

  
export default fetcherSWR