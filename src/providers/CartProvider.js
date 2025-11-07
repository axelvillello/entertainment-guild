//Provider component for the shopping cart
//WRITTEN BY: Axel Ello

import {useContext, createContext, useState, useEffect} from "react";
import { useSnackbar } from "./SnackbarProvider";

const CartContext = createContext();

const CartProvider =({children}) => {
    const [cart, setCart] = useState(() => {
        const stored = localStorage.getItem("cart");
        return stored ? JSON.parse(stored) : [];
    });

    const sbar = useSnackbar();

    //Stores cart items as JSON data
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);


    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(item => item.id === product.id);

            //Increments quantity of item if already in cart
            if (existingItem) {
                return prevCart.map(item => item.id === product.id
                    ? { ...item, quantity: (item.quantity + 1) } : item
            );
            }
            else {
                return [...prevCart, product];
            }
        });

        sbar.setSnackMsg('Added to cart!', 'info');
        console.log(product);
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
    <CartContext.Provider value={{cart, addToCart, clearCart}}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => {
    return useContext(CartContext);
};