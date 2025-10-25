import {useContext, createContext, useState, useEffect} from "react";

const CartContext = createContext();

const CartProvider =({children}) => {
    const [cart, setCart] = useState(() => {
        const stored = localStorage.getItem("cart");
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart((prevCart) => [...prevCart, product]);
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