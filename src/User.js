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
    
    const userData = {
        id: props.id,
        username: props.username,
        name: props.name,
        email: props.email,
        isAdmin: props.isAdmin,
        hashPw: props.hashPw,
        salt: props.salt
    }

    return (
        <div
            onClick={() => setEnlarged(!enlarged)}
            onMouseLeave={() => {if (enlarged) setEnlarged(!enlarged)}}
            style={{
                height: enlarged? "400px" : "100px",
                width: enlarged? "500px" : "500px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                overflow: "hidden",
                margin: "1px",
                padding: "10px",
                transition: "all 0.3s",
                backgroundColor: "#98FB98",
                cursor: "pointer",
                borderRadius: "10px"
            }}>
            {!enlarged?
            (
                <div>
                    <h2>{props.username}</h2>
                    <p>Name: {props.name}</p>
                </div>
            )
            :
            (
                <div>
                    <h2 style={{fontSize: "40px"}}>Username: {props.username}</h2>
                    <p><b>UserID:</b> {props.id}</p>
                    <p><b>Name:</b> {props.name}</p>
                    <p><b>Email:</b> {props.email || "No email"}</p>
                    <p><b>Admin Status:</b> {props.isAdmin ? "Yes" : "No"}</p>
                    <span style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
                        textAlign: "center", columnGap: "10px", padding: "15px", rowGap: "15px"}}>
                        <button style={{height: "40px", width: "100px"}} onClick={(e) => {navigate("/editUser", {state: userData})}}>
                            Edit
                        </button>
                        <button style={{height: "40px", width: "100px", backgroundColor: "red", color: "white"}} onClick={(e) => {handleDeleteUser()}}>
                            Delete
                        </button>
                    </span>
                </div>
            )
            }
        </div>
    );
}

export default User;