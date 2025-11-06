//Component for rendering the shopping cart menu present for users in customer view
//WRITTEN BY: Axel Ello

import { useCart } from "./providers/CartProvider";
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
        setCartOpen(false);
    }, [location]);

    return (
        <span className="Fly-in"style={{position: "relative", display: "inline-block", margin: "10px"}}>
            <button 
                className="Ribbon-options"
                onClick={() => setCartOpen(!cartOpen)}>
                Shopping Cart 🛒 {shopCart?.cart?.reduce((total, item) => total + item.quantity, 0) || 0}
            </button>
            
            {cartOpen && (
                <div
                    className="Shop-cart" 
                    style={{
                        position: "absolute",
                        top: "100%",
                        height: "400px",
                        width: "250px",
                        margin: "10px",
                        backgroundColor: "#DC143C",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        padding: "10px 10px"
                }}>
                    <h1 style={{
                        color: "white",
                        textAlign: "center",
                        margin: "0",
                        padding: "8px 0"
                    }}>
                        Your Cart
                    </h1>

                    {shopCart.cart.length === 0 ? (
                        <p className="Shop-cart-txt">Your cart is empty!</p>
                    )
                    :
                    (
                        <>
                        <div className="Shop-cart-txt">
                            <span 
                                style={{
                                    display: "flex", 
                                    flexDirection: "column", 
                                    height: "200px",
                                    width: "230px",
                                    gap: "1px", 
                                    flex: 1,
                                    overflowY: "auto",
                                    msOverflowX: "hidden",
                                    marginBottom: "1px",
                                    paddingRight: "1px"
                                }}>
                                    {shopCart.cart.map((i) => (<p><span style={{fontWeight: "bold"}}>${(i.price*i.quantity).toFixed(2)}, </span> {i.quantity} x {i.title} </p>))}
                            </span>
                        
                            <span style={{
                                borderTop: "2px solid #550011",
                                paddingTop: "8px",
                                display: "flex",
                                flexDirection: "column",
                                gap: "8px"
                            }}>
                                <b>Total: ${shopCart.cart.reduce((sum, item) => sum + (item.price*item.quantity), 0).toFixed(2)}</b>
                                <button
                                    style={{
                                        backgroundColor: "green",
                                        fontWeight: "bold"
                                    }} 
                                    onClick={() => navigate("/addNewOrder")}>
                                    Check Out
                                </button>
                                <button onClick={() => shopCart.clearCart()}>Clear Cart</button>
                            </span>
                        </div>
                        </>
                    )}
                </div>
            )}
        </span>
    )
}

export default ShoppingCart;