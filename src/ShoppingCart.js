import { useCart } from "./CartProvider";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ShoppingCart = () => {
    const [cartOpen, setCartOpen] = useState(false);
    const shopCart = useCart();
    const location = useLocation();
    const navigate = useNavigate();

    //close shopping cart whenever URL path changes 
    useEffect(() => {
        setCartOpen(true);
    }, [location]);

    return (
        <span style={{position: "relative", display: "inline-block"}}>
            <button onClick={() => setCartOpen(!cartOpen)}>
                Shopping Cart 🛒 {shopCart?.cart?.length || 0}
            </button>
            
            {!cartOpen && (
                <div style={{
                    position: "absolute",
                    top: "100%",
                    height: "400px",
                    width: "250px",
                    overflowY: "auto",
                    margin: "10px",
                    backgroundColor: "#FFE5B4",
                }}>
                    {shopCart.cart.length === 0 ? (
                        <p>Your cart is empty!</p>
                    )
                    :
                    (
                        <>
                            {shopCart.cart.map((i) => (<p>{i.title} - ${i.price}</p>))}
                            <span style={{display: "flex", flexDirection: "column", gap: "8px"}}>
                                <b>Total: ${shopCart.cart.reduce((sum, item) => sum + item.price, 0)}</b>
                                <button onClick={() => shopCart.clearCart()}>Clear Cart</button>
                                <button onClick={() => navigate("/addNewOrder")}>Check Out</button>
                            </span>
                        </>
                    )}
                </div>
            )}
        </span>
    )
}

export default ShoppingCart;