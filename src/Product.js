//Defines a component that defines a collection of props 
//generically for many different types of products
//WRITTEN BY: Axel Ello

import { useState } from "react";
import { useCart } from "./providers/CartProvider";

const Product = (props) => {
    const [enlarged, setEnlarged] = useState(false);
    const cart = useCart();
    const formattedDate = new Date(props.published).toLocaleDateString();

    return (
        <div
            className="Product-icons"
            onClick={() => setEnlarged(!enlarged)}
            onMouseLeave={() => {if (enlarged) setEnlarged(!enlarged)}}
            style={{
                height: enlarged? "400px" : "200px",
                width: enlarged? "400px" : "200px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                overflow: "hidden",
                margin: "20px",
                padding: "10px",
                transition: "all 0.3s",
                backgroundColor: "#ADD8E6",
                cursor: "pointer",
                borderRadius: "10px",
            }}>
            {!enlarged?
            (
                <div>
                    <h2>{props.title}</h2>
                    <h3>{props.source}</h3>
                    <p>${props.price} AUD </p>
                </div>
            )
            :
            (
                <div>
                    <h2 style={{fontSize: "40px"}}>{props.title}</h2>
                    <span style={{display: "flex", justifyContent: "center", alignItems: "center",
                        textAlign: "center", columnGap: "10px"}}>
                        ${props.price} AUD 
                        {/*Transfers added item to cart context */}
                        <button className="Ribbon-options" onClick={(e) => {
                            e.stopPropagation();
                            cart.addToCart({
                                id: props.id,
                                title: props.title,
                                price: props.price,
                                quantity: 1,
                            });
                        }}>
                            Add to Cart
                        </button>
                    </span>
                    <p><b>Author:</b> {props.author}</p>
                    <p><b>Published:</b> {formattedDate}</p>
                    <p><b>Source:</b> {props.source}</p>
                    <div style = {{
                        width: "100%",
                        overflowY: "auto",
                        height: "100px"
                    }}>
                        <p style={{backgroundColor: "white"}}>{props.description}</p>
                    </div>
                </div>
            )
            }
        </div>
    );
}

export default Product;