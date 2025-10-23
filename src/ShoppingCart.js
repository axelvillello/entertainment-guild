import {useCart} from "./CartProvider";
import { useState } from "react";

const ShoppingCart = () => {
    const [cartOpen, setCartOpen] = useState(false);
    const shopCart = useCart();

    return (
        <span style={{position: "relative", display: "inline-block"}}>
            <button onClick={() => setCartOpen(!cartOpen)}>
                Shopping Cart 🛒 {shopCart?.cart?.length || 0}
            </button>

            <button onClick={() => shopCart.clearCart()}>Clear Cart</button>
            
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
                                <button>Check Out</button>
                            </span>
                        </>
                    )}
                </div>
            )
        }
        </span>
    )
}

export default ShoppingCart;