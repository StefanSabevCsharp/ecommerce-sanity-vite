import {client} from "../lib/client"

export const fetchProducts = async () => {
   const query = `*[_type == "product"]`
   try{
       const products = await client.fetch(query)
       return products
   } catch (error){
       //todo : handle error
       console.error(error)
   }
}

export const fetchBanners = async () => {
    const query = `*[_type == "banner"]`
    try{
        const banners = await client.fetch(query)
        return banners
    } catch (error){
        //todo : handle error
        console.error(error)
    }
}