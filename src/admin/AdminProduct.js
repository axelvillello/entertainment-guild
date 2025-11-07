//Defines a component that defines a collection of props 
//for products in admin view
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
    const formattedDate = new Date(props.published).toLocaleDateString(); 

    async function handleDeleteProduct() {
        await tryDeleteProduct(props.id, setResult);
        setTimeout(() => navigate(0), 1000); //timeout to repopulate products when deleting from the database
    }

    useEffect(() => {
            if (result) sbar.setSnackMsg(result, 'info');
        }, [result]);
    

    const productData = {
        id: props.id,
        title: props.title, 
        author: props.author, 
        published: props.published, 
        description: props.Description,
        price: props.price,
        source: props.source,
        sourceId: props.sourceId,
    }

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
                textAlign: "center",
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
                    <h2 style={{fontSize: "40px"}}>{props.title}</h2>
                    <p><b>Price:</b> ${props.price} AUD, <b>Source:</b> {props.source},</p>
                    <p><b>Author:</b> {props.author}, <b>Published:</b> {formattedDate}</p>
                    <div style = {{
                        width: "100%",
                        overflowY: "auto",
                        height: "100px"
                    }}>
                        <p style={{backgroundColor: "white"}}>{props.description}</p>
                    </div>
        
                    <span style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
                        textAlign: "center", columnGap: "10px", padding: "15px", rowGap: "15px"}}>
                        <button style={{height: "40px", width: "100px"}} onClick={(e) => {navigate("/editProduct", {state: productData})}}>
                            Edit
                        </button>
                        <button style={{height: "40px", width: "100px", backgroundColor: "red", color: "white"}} onClick={(e) => {handleDeleteProduct()}}>
                            Delete
                        </button>
                    </span>
                </div>
            )
            }
        </div>
    );
}

export default AdminProduct;