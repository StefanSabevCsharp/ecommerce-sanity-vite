import Footer from "./components/footer/Footer"
import HeroBanner from "./components/heroBanner/HeroBanner"
import Home from "./components/home/Home"
import { useGetProducts } from "./hooks/useGetProducts"


function App() {

  const {products,banner,isLoading} = useGetProducts()
  console.log(products)


  return (
    <>
    {isLoading && products && <div>Loading...</div> }
    <HeroBanner />
      Hero Banner
      <Home />
     <Footer />
    </>
  )
}

export default App
