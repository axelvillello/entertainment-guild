//Defines a component that defines a collection of props 
//generically for many different types of products
//WRITTEN BY: Axel Ello
import { useState } from "react";
import { useCart } from "./CartProvider";

const Product = (props) => {
    const [enlarged, setEnlarged] = useState(false);
    const cart = useCart();

    return (
        <div
            onClick={() => setEnlarged(!enlarged)}
            style={{
                height: enlarged? "400px" : "200px",
                width: enlarged? "400px" : "200px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                margin: "10px",
                padding: "10px",
                transition: "all 0.3s",
                backgroundColor: "#ADD8E6",
                cursor: "pointer"
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
                    <h2>{props.title}</h2>
                    <h3>{props.source}</h3>
                    <span>
                        ${props.price} AUD 
                        <button onClick={(e) => {
                            e.stopPropagation();
                            cart.addToCart({
                                id: props.key,
                                title: props.title,
                                price: props.price,
                            });
                        }}>
                            Add to Cart
                        </button>
                    </span>
                    <p>Author: {props.author}</p>
                    <div style = {{
                        width: "100%",
                        overflowY: "auto",
                        height: "100px"
                    }}>
                        <p>{props.description}</p>
                    </div>
                    <p>Published: {props.published}</p>
                </div>
            )
            }
        </div>
    );
}

export default Product;