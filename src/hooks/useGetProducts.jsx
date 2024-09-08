import { useEffect, useState } from "react"
import { fetchBanners, fetchProducts } from "../dataService/productsService"

export const useGetProducts = () => {
    const [products, setProducts] = useState([])
    const [banner, setBanner] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        try {
            const getData = async () => {
                const productsData = await fetchProducts();
                const bannerData = await fetchBanners();
                setProducts(productsData);
                setBanner(bannerData);
                setIsLoading(false)
                
            }   
            getData();
        } catch (error) {
            console.error(error)
        }

    }, [])

    return { products, banner, isLoading }


}