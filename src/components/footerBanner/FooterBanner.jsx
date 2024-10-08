import { Link } from "react-router-dom";
import { urlFor } from "../../lib/client";

export default function FooterBanner({ banner : {discount,largeText1,largeText2,saleTime,smallText,midText,desc,product,buttonText,image} }) {
  return (
    <div className="footer-banner-container">
        <div className="banner-desc">
            <div className="left">
                <p>{discount}</p>
                <h3>{largeText1}</h3>
                <h3>{largeText2}</h3>
                <p>{saleTime}</p>
            </div>
            <div className="right">
                <p>{smallText}</p>
                <h3>{midText}</h3>
                <p>{desc}</p>
                <Link to={`/products/${product}`}>
                    <button type="button" className="">{buttonText}</button>
                </Link>
            </div>
            <img 
            src={urlFor(image)}
             alt=""
             className="footer-banner-image"
              />
        </div>

    </div>
  );
}