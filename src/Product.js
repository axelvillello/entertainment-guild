//Defines a component that defines a collection of props 
//generically for many different types of products
//WRITTEN BY: Axel Ello
import { useState } from "react";

const Product = (props) => {
    const [enlarged, setEnlarged] = useState(false);

    return (
        <button
            onClick={() => setEnlarged(!enlarged)}
            style={{
                height: "200px",
                width: "200px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                margin: "10px",
                padding: enlarged ? "160px 160px" : "10px 20px",
                transition: "all 0.1s"
            }}>
            {!enlarged?
            (
                <div>
                    <h3>{props.title}</h3>
                    <p>${props.price}</p>
                </div>
            )
            :
            (
                <div>
                    <h3>{props.title}</h3>
                    <p>${props.price}</p>
                    <p>Author: {props.author}</p>
                    <div style = {{
                        width: "100%",
                        overflowY: "auto",
                        height: "80px"
                    }}>
                        <p>{props.description}</p>
                    </div>
                    <p>Published: {props.published}</p>
                </div>
            )
            }
        </button>
    );
}

export default Product;