import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { AiOutlineShopping, AiOutlinePlus, AiOutlineLeft, AiOutlineMinus, AiOutlineDelete } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";
import { urlFor } from "../../lib/client";
import { AppContext } from "../../context/StateContext";


export default function Cart() {
    const cartRef = useRef();
    const { cartItems, totalPrice, totalQuantity, changeShowCart, decreaseQty, increaseQty, qty,toggleCartItemQuantity,onRemove } = useContext(AppContext);
    console.log(cartItems);


    return (
        <div className="cart-wrapper" ref={cartRef}>
            <div className="cart-container">
                <button type="button" className="cart-heading" onClick={changeShowCart}>
                    <AiOutlineLeft />
                    <span className="heading">Your Cart</span>
                    <span className="cart-num-items">{totalQuantity} Items</span>

                </button>
                {cartItems.length < 1 && (
                    <div className="empty-cart">
                        <AiOutlineShopping size={150} />
                        <h3>Your shopping bag is empty</h3>
                        <Link to="/">
                            <button type="button" className="btn" onClick={changeShowCart}>Continue Shopping</button>
                        </Link>
                    </div>
                )}
                <div className="product-container">
                    {cartItems.length >= 1 && cartItems.map((item, index) => (
                        <div className="product" key={item._id}>
                            <img src={urlFor(item?.image[0])} alt={item.name} className="cart-product-image" />
                            <div className="item-desc">
                                <div className="flex top">
                                    <h5>{item.name}</h5>
                                    <h4>${item.price}</h4>
                                </div>
                                <div className="flex bottom">
                                    <div>
                                        <p className="quantity-desc">
                                            <span className="minus" onClick={() => toggleCartItemQuantity(item._id,"dec")}><AiOutlineMinus /></span>
                                            <span className="num" onClick="">{item.quantity}</span>
                                            <span className="plus" onClick={() => toggleCartItemQuantity(item._id,"inc")}><AiOutlinePlus /></span>
                                        </p>
                                    </div>
                                    <button type="button" className="remove-item" onClick={() => onRemove(item)}><TiDeleteOutline></TiDeleteOutline></button>
                                </div>

                            </div>
                        </div>
                    ))}

                </div>
                {cartItems.length >= 1 && (
                    <div className="cart-bottom">
                        <div className="total">
                            <h3>Subtotal:</h3>
                            <h3>${totalPrice}</h3>
                        </div>
                        <div className="btn-container">
                            <button type="button" className="btn" onClick="">Pay with Stripe</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}