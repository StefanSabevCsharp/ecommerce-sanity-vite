import { Link } from "react-router-dom";
import { urlFor } from "../../lib/client";

export default function HeroBanner({ banner }) {
    console.log(banner)
  return (
    <div className="hero-banner-container">
        <div>
            <p className="beats-solo">{banner.smallText}</p>
            <h3>{banner.midText}</h3>
            <h1>{banner.largeText1}</h1>
            <img src={urlFor(banner.image)} alt="headphones" className="hero-banner-image" />
            <div>
                <Link to={`/products/${banner.product}`}>
                    <button className="">
                       {banner.buttonText}
                    </button>
                </Link>
                <div className="desc">
                    <h5>Description</h5>
                    <p>{banner.desc}</p>
                </div>
            </div>
        </div>
        
    </div>
  );
}