import {useContext, createContext, useState, useEffect} from "react";
import { useSnackbar } from "./SnackbarProvider";

const CartContext = createContext();

const CartProvider =({children}) => {
    const [cart, setCart] = useState(() => {
        const stored = localStorage.getItem("cart");
        return stored ? JSON.parse(stored) : [];
    });

    const sbar = useSnackbar();

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(item => item.id === product.id);

            if (existingItem) {
                return prevCart.map(item => item.id === product.id
                    ? { ...item, quantity: (item.quantity + 1) }
                    : item
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