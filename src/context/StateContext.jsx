import { createContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

export const AppContext = createContext();

export const StateProvider = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [qty, setQty] = useState(1);

    const changeShowCart = () => {
        setShowCart((prevShowCart) => !prevShowCart);
    }

    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find(item => item._id === product._id);
        setTotalPrice((prevPrice) => prevPrice + product.price * quantity);
        setTotalQuantity((prevQuantity) => prevQuantity + quantity);
        if (checkProductInCart) {
            const updatedCardItems = cartItems.map((cartProduct) => {
                if (cartProduct._id === product._id) {
                    return { ...cartProduct, quantity: cartProduct.quantity + quantity }
                }
                return cartProduct;
            });
            setCartItems(updatedCardItems);
        } else {
            product.quantity = quantity;
            setCartItems([...cartItems,{...product}]);
        }
        toast.success(`${qty} ${product.name} added to cart`);
    }

    const increaseQty = () => {
        setQty((prevQty) => prevQty + 1);
    }
    const decreaseQty = () => {
        setQty((prevQty) => {
            if (prevQty - 1 < 1) {
                return 1;
            }
            return prevQty - 1
        });
    }

    return (
        <AppContext.Provider value={{
            showCart,
            cartItems,
            totalPrice,
            totalQuantity,
            qty,
            increaseQty,
            decreaseQty,
            onAdd,
            changeShowCart,
        }}>
            {children}
        </AppContext.Provider>
    )
};