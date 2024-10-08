import { createContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

export const AppContext = createContext();

export const StateProvider = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);
   

    let foundProduct;
    let index;

    const changeShowCart = () => {
        setShowCart((prevShowCart) => !prevShowCart);
    }

    const clearCartItems = () => {
        setCartItems([]);
        setTotalPrice(0);
        setTotalQuantity(0);
        localStorage.clear();
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
            setCartItems([...cartItems, { ...product }]);
        }
        toast.success(`${product.name} added to cart`);
    }

    const toggleCartItemQuantity = (id, value) => {
        foundProduct = cartItems.find((item) => item._id === id);
        index = cartItems.findIndex((product) => product._id === id);
    
        const updatedCartItems = [...cartItems]; 
    
        if (value === "inc") {
            updatedCartItems[index] = {
                ...foundProduct,
                quantity: foundProduct.quantity + 1
            };
            setCartItems(updatedCartItems);
            setTotalPrice((prevPrice) => prevPrice + foundProduct.price);
            setTotalQuantity((prevQuantity) => prevQuantity + 1);
        } else if (value === "dec") {
            if (foundProduct.quantity > 1) {
                updatedCartItems[index] = {
                    ...foundProduct,
                    quantity: foundProduct.quantity - 1
                };
                setCartItems(updatedCartItems);
                setTotalPrice((prevPrice) => prevPrice - foundProduct.price);
                setTotalQuantity((prevQuantity) => prevQuantity - 1);
            }
        }
    };

    const onRemove = (product) => {
        const updatedCartItems = cartItems.filter((item) => item._id !== product._id);
        setCartItems(updatedCartItems);
        setTotalPrice((prevPrice) => prevPrice - product.price * product.quantity);
        setTotalQuantity((prevQuantity) => prevQuantity - product.quantity);
        toast.error(`${product.name} removed from cart`);

    }
    

    // const increaseQty = () => {
    //     setQty((prevQty) => prevQty + 1);
    // }
    // const decreaseQty = () => {
    //     setQty((prevQty) => {
    //         if (prevQty - 1 < 1) {
    //             return 1;
    //         }
    //         return prevQty - 1
    //     });
    // }

    return (
        <AppContext.Provider value={{
            showCart,
            cartItems,
            totalPrice,
            totalQuantity,
            clearCartItems,
            onAdd,
            changeShowCart,
            toggleCartItemQuantity,
            onRemove
        }}>
            {children}
        </AppContext.Provider>
    )
};