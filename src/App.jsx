import Footer from "./components/footer/Footer"
import FooterBanner from "./components/footerBanner/FooterBanner"
import HeroBanner from "./components/heroBanner/HeroBanner"
import Home from "./components/home/Home"
import NavBar from "./components/navbar/Navbar"
import { useGetProducts } from "./hooks/useGetProducts"


function App() {

  const { products, banner, isLoading } = useGetProducts()
  console.log(products)


  return (
    <>
      <div className="layout">
        <header>
          <NavBar />
        </header>
        <main className="main-container">
          {isLoading ? <div>Loading...</div> :
            (<>
              <HeroBanner banner={banner[0]} />
              <Home products={products} />
              <FooterBanner banner={banner[0]} />
            </>
            )}
        </main>
        <footer>
          <Footer />
        </footer>
      </div>

    </>
  )
}

export default App
