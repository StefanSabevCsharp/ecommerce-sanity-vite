import { useParams } from "react-router";
import { client, urlFor } from "../../lib/client"
import { useGetProducts, useGetSingleProduct } from "../../hooks/useGetProducts";
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from "react-icons/ai";
import Product from "../product/Product";
import { useContext, useState } from "react";
import { AppContext } from "../../context/StateContext";



export default function ProductDetails() {
    const {increaseQty,decreaseQty,qty,onAdd} = useContext(AppContext);
    
    const [index,setIndex] = useState(0);
    const { slugName } = useParams();
    const [product, isLoadingSingleImage] = useGetSingleProduct(slugName);
    const [products,isLoading] = useGetProducts();
    const { image, name, price, details } = product;

    return (
        <>
            {isLoadingSingleImage && isLoading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <div className="product-detail-container">
                        <div>
                            <div className="image-container">
                                <img src={urlFor(image && image[index])} alt="product" className="product-detail-image" />
                            </div>
                            <div className="small-images-container">
                                {image && image.map((img, i) => (
                                    <img
                                        key={i}
                                        src={urlFor(img)}
                                        alt="product"
                                        className={i === index ? "small-image selected-image" : "small-image"}
                                        onMouseEnter={() => setIndex(i)}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="product-detail-desc">
                            <h1>{name}</h1>
                            <div className="reviews">
                                <div>
                                    //todo: add dinamic rating
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
                                    <span className="minus" onClick={decreaseQty}><AiOutlineMinus /></span>
                                    <span className="num" onClick="">{qty}</span>
                                    <span className="plus" onClick={increaseQty}><AiOutlinePlus /></span>
                                </p>
                            </div>
                            <div className="buttons">
                                <button type="button" className="add-to-cart"
                                onClick={() => onAdd(product,qty)}>Add to Cart</button>
                                <button type="button" className="buy-now"
                                onClick="">Buy Now</button>

                            </div>

                        </div>

                    </div>
                   <div className="maylike-products-wrapper ">
                     <h2>You may also like</h2>
                     <div className="marquee">
                        <div className="maylike-products-container track">
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