//Defines a component that defines a collection of props 
//generically for many different types of products
//WRITTEN BY: Axel Ello
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { tryDeleteProduct } from "../helpers/productHelpers";
import { useSnackbar } from "../providers/SnackbarProvider";

const AdminProduct = (props) => {
    const [enlarged, setEnlarged] = useState(false);
    const [result, setResult] = useState("");
    const navigate = useNavigate();
    const sbar = useSnackbar();

    async function handleDeleteProduct() {
        await tryDeleteProduct(props.id, setResult);
        setTimeout(() => navigate(0), 1000);
    }

    useEffect(() => {
            if (result) sbar.setSnackMsg(result, 'info');
        }, [result]);

    return (
        <div
            
            onClick={() => setEnlarged(!enlarged)}
            onMouseLeave={() => {if (enlarged) setEnlarged(!enlarged)}}
            style={{
                height: enlarged? "400px" : "100px",
                width: enlarged? "800px" : "800px",
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
                overflow: "hidden",
                margin: "1px",
                padding: "10px",
                transition: "all 0.3s",
                backgroundColor: "#ADD8E6",
                cursor: "pointer",
                borderRadius: "10px"
            }}>
            {!enlarged?
            (
                <div>
                    <h2>{props.title} ({props.source})</h2>
                </div>
            )
            :
            (
                <div>
                    <h2>{props.title}</h2>
                    <h3>{props.source}</h3>
                    <span>
                        ${props.price} AUD 
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
                    <button onClick={(e) => {handleDeleteProduct()}}>
                        Delete
                    </button>
                </div>
            )
            }
        </div>
    );
}

export default AdminProduct;