/* eslint-disable @typescript-eslint/no-explicit-any */
import fetcherSWR, { API_PROPS } from "."

export interface AuthLogin {
    email : string
    password : string
}

// interface DataLogin {
//   email:string
//   token:string
// }


export const PostLogin = async (data : AuthLogin) : Promise<any> =>  {
    const apiProps : API_PROPS = {
      url : "login",
      method:"POST",
      data
    }
    return await fetcherSWR(apiProps)

}
export const LogoutUser = async () : Promise<any> =>  {
    const apiProps : API_PROPS = {
      url : "logout",
      method:"POST",
    }
    return await fetcherSWR(apiProps)

}