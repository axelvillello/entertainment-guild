import {useContext, createContext, useState} from "react";

const CartContext = createContext();

const CartProvider =({children}) => {
    const [cart, setCart] = useState(() => {
        const stored = localStorage.getItem("cart");
        return stored ? JSON.parse(stored) : [];
    }
    );

    const addToCart = (product) => {
        setCart((prevCart) => [...prevCart, product]);
        console.log(product);
        localStorage.setItem("cart", JSON.stringify(cart));
    };

    const clearCart = () => {
        setCart([]);
        localStorage.setItem("cart", JSON.stringify(cart));
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