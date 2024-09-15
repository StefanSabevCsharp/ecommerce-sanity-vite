import { Link } from "react-router-dom";
import { AiOutlineShopping } from "react-icons/ai"
import Cart from "../cart/Cart";
import { useContext } from "react";
import { AppContext } from "../../context/StateContext";



export default function NavBar() {
  const { changeShowCart, showCart, totalQuantity } = useContext(AppContext);
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link to="/">Headphones Store</Link>
      </p>
      <button type="button" className="cart-icon" onClick={changeShowCart}>
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantity}</span>
      </button>
      {showCart && <Cart />}
    </div>
  );
}