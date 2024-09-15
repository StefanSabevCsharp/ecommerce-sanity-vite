import { Route, Routes } from "react-router"
import Footer from "./components/footer/Footer"
import FooterBanner from "./components/footerBanner/FooterBanner"
import HeroBanner from "./components/heroBanner/HeroBanner"
import Home from "./components/home/Home"
import NavBar from "./components/navbar/Navbar"
import { useGetProducts } from "./hooks/useGetProducts"
import ProductDetails from "./components/productDetails/ProductDetails"
import {  StateProvider } from "./context/StateContext"
import { Toaster } from "react-hot-toast";



function App() {

  const [products, banner, isLoading] = useGetProducts();

  return (
    <StateProvider>
      <Toaster />
        <div className="layout">
          <header>
            <NavBar />
          </header>
          <Routes>
            <Route path="/" element={
              <main className="main-container">
                {isLoading ? <div>Loading...</div> :
                  (<>
                    <HeroBanner banner={banner[0]} />
                    <Home products={products} />
                    <FooterBanner banner={banner[0]} />
                  </>
                  )}
              </main>}>
            </Route>
            <Route path="/products/:slugName" element={<ProductDetails />} />

          </Routes>
          <footer>
            <Footer />
          </footer>
        </div>
    </StateProvider>
  )
}

export default App
