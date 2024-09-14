import { useParams } from "react-router";
import { client, urlFor } from "../../lib/client"
import { useGetProducts, useGetSingleProduct } from "../../hooks/useGetProducts";
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from "react-icons/ai";
import Product from "../product/Product";



export default function ProductDetails() {
    const { slugName } = useParams();
    const [product, isLoading] = useGetSingleProduct(slugName);
    const {products} = useGetProducts();
    const { image, name, price, details } = product;
    console.log(product)

    return (
        <>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <div className="product-detail-container">
                        <div>
                            <div className="image-container">
                                <img src={urlFor(image && image[0])} alt="product" />
                            </div>
                            {/* <div className="small-images-container">
                                {image && image.map((img, index) => (
                                    <img
                                        key={index}
                                        src={urlFor(img)}
                                        alt="product"
                                        className=""
                                        onMouseEnter=""
                                    />
                                ))}
                            </div> */}
                        </div>
                        <div className="product-detail-desc">
                            <h1>{name}</h1>
                            <div className="reviews">
                                <div>
                                    <AiFillStar />
                                    <AiFillStar />
                                    <AiFillStar />
                                    <AiFillStar />
                                    <AiOutlineStar />

                                </div>
                                <p>(20)</p>

                            </div>
                            <h4>Details: </h4>
                            <p>{details}</p>
                            <p className="price">${price}</p>
                            <div className="quantity">
                                <h3>Quantity:</h3>
                                <p className="quantity-desc">
                                    <span className="minus" onClick=""><AiOutlineMinus /></span>
                                    <span className="num" onClick="">0</span>
                                    <span className="plus" onClick=""><AiOutlinePlus /></span>
                                </p>
                            </div>
                            <div className="buttons">
                                <button type="button" className="add-to-cart"
                                onClick="">Add to Cart</button>
                                <button type="button" className="buy-now"
                                onClick="">Buy Now</button>

                            </div>

                        </div>

                    </div>
                   <div className="maylike-products-wrapper">
                     <h2>You may also like</h2>
                     <div className="marquee">
                        <div className="maylike-products-container">
                            {products.map((product,index) => (
                               <Product key={index} product={product} />
                            ))}
                        </div>

                     </div>
                   </div>
                </div>
            )}

        </>

    );
}