//Defines a component that defines a collection of props 
//generically for many different types of products
//WRITTEN BY: Axel Ello
import { useState, useEffect } from "react";
import { tryDeleteUser } from "./helpers/userHelpers";
import { useSnackbar } from "./providers/SnackbarProvider";
import { useNavigate } from "react-router-dom";

const User = (props) => {
    const [enlarged, setEnlarged] = useState(false);
    const [result, setResult] = useState("");
    const sbar = useSnackbar();
    const navigate = useNavigate();

    async function handleDeleteUser() {
        await tryDeleteUser(props.id, setResult);
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
                height: enlarged? "300px" : "100px",
                width: enlarged? "800px" : "800px",
                display: "flex",
                justifyContent: "left",
                alignItems: "left",
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
                    <h2>Username: {props.username}</h2>
                    <p>Name: {props.name}</p>
                </div>
            )
            :
            (
                <div>
                    <h2>Username: {props.username}</h2>
                    <p>UserID: {props.id}</p>
                    <p>Name: {props.name}</p>
                    <p>Email: {props.email || "No email"}</p>
                    <p>Admin Status: {props.isAdmin ? "Yes" : "No"}</p>
                    <button onClick={(e) => {handleDeleteUser()}}>
                        Delete
                    </button>
                    
                </div>
            )
            }
        </div>
    );
}

export default User;