import { useEffect, useState } from "react"
import { fetchBanners, fetchProducts, fetchSingleProduct } from "../dataService/productsService"

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

    return [products, banner, isLoading ] 


}

export const useGetSingleProduct = (slug) => {
    const [product, setProduct] = useState({})
    const [isLoadingSingleImage, setIsLoadingSingleImage] = useState(true)

    useEffect(() => {
        setIsLoadingSingleImage(true)
        try {
            const getData = async () => {
                const productsData = await fetchSingleProduct(slug);
                console.log(productsData)
                setProduct(productsData);
                setIsLoadingSingleImage(false)
            }
            getData();
        } catch (error) {
            console.error(error)
        }

    }, [slug])

    return [product, isLoadingSingleImage]
}