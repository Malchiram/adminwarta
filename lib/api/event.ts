/* eslint-disable @typescript-eslint/no-explicit-any */
import fetcherSWR, { API_PROPS } from "."

export type DataType = 'music' | 'kolekte' | 'singer' | 'usher' | 'pendoaSyafaat' | 'multimedia' | 'tamborin' | 'perjamuan'

export interface Event  {
	eventName   :string      
	event :EventDetail 
	dateEvent   :string      
	komsel   ?:Komsel[] 

}

interface EventDetail  {
	wl            :string    
	singer        :string[]  
	music         :string[]  
	usher         :string[]  
	kolekte       :string[]  
	pendoaSyafaat :string[]  
	multimedia    :string[]  
	tamborin      :string[]  
	pembacaWarta  :string    
	perjamuan     ?:string[] 
}

export interface Komsel  {
	name       :string 
	dateKomsel :string 
	wl         :string 
	musik      :string 
	alamat     :string 
}


export const PostEvent = async (data : Event) : Promise<any> =>  {
    const apiProps : API_PROPS = {
      url : "event",
      method:"POST",
      data
    }
    return await fetcherSWR(apiProps)

}