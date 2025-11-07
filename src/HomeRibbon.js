//Home ribbon that provides navigation options to the user
//WRITTEN BY: Axel Ello

import { useAuth } from "./providers/AuthProvider";
import { Link, useNavigate } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import ShoppingCart from "./ShoppingCart";

const HomeRibbon = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const linkAesthetics = {
        padding: 5
    }

    return (
        console.log("Auth user:", auth.user),
        <div style={{display: "flex", flexDirection: "column", justifyContent:"center", alignItems:"center"}}>
            <h1 className="Site-title">{auth.user?.IsAdmin ? "Entertainment Guild (Admin Mode)" : "Entertainment Guild"}</h1>
        <div className="Home-ribbon">
            {
                !auth.user ? 
                (
                    //parameterised navigation for reuse of displayProducts
                    <span>
                        <button
                            className="Ribbon-options"
                            style={{
                                fontWeight: "bold"
                            }} 
                            onClick={() => navigate("/")}> Home </button>
                        
                        <span
                            style={{
                                margin: "10px"
                            }}>
                            <button
                                className="Ribbon-options"
                                style={{
                                    fontWeight: "bold"
                                }} 
                                onClick={() => navigate("/displayProducts/Books")}> Books </button>

                                <button
                                className="Ribbon-options"
                                style={{
                                    fontWeight: "bold"
                                }} 
                                onClick={() => navigate("/displayProducts/Movies")}> Movies </button>

                            <button
                                className="Ribbon-options"
                                style={{
                                    fontWeight: "bold"
                                }} 
                                onClick={() => navigate("/displayProducts/Games")}> Games </button>
                        </span>

                        <button
                            className="Ribbon-options"
                            style={{
                                fontWeight: "bold"
                            }} 
                            onClick={() => navigate("/loginUser")}> Log In/Sign Up </button>

                        <ShoppingCart/>
                    </span>
                )
                :
                //Conditional rendering for admin only options
                auth.user.IsAdmin === true ? (
                    <span>
                        <button
                            className="Ribbon-options"
                            style={{
                                fontWeight: "bold"
                            }} 
                            onClick={() => navigate("/")}> Home </button>
                        
                        <button
                            className="Ribbon-options"
                            style={{
                                fontWeight: "bold"
                            }} 
                            onClick={() => navigate("/createProduct")}> Create Product </button>

                        <button
                            className="Ribbon-options"
                            style={{
                                fontWeight: "bold"
                            }} 
                            onClick={() => navigate("/addNewUser")}> Create User </button>

                        <button
                            className="Ribbon-options"
                            style={{
                                fontWeight: "bold"
                            }} 
                            onClick={() => auth.logOut()}> Log Out </button>
                    </span>
                ) 
                : 
                (
                    //Logged in non-admin user ribbon
                    <span>
                        <button
                            className="Ribbon-options"
                            style={{
                                fontWeight: "bold"
                            }} 
                            onClick={() => navigate("/")}> Home </button>
                        
                        <span
                            style={{
                                margin: "10px"
                            }}>
                            <button
                                className="Ribbon-options"
                                style={{
                                    fontWeight: "bold"
                                }} 
                                onClick={() => navigate("/displayProducts/Books")}> Books </button>

                                <button
                                className="Ribbon-options"
                                style={{
                                    fontWeight: "bold"
                                }} 
                                onClick={() => navigate("/displayProducts/Movies")}> Movies </button>

                            <button
                                className="Ribbon-options"
                                style={{
                                    fontWeight: "bold"
                                }} 
                                onClick={() => navigate("/displayProducts/Games")}> Games </button>
                        </span>
                        
                        <button
                                className="Ribbon-options"
                                style={{
                                    fontWeight: "bold"
                                }} 
                                onClick={() => navigate("/account")}> {auth.user?.UserName} </button>

                        <button
                            className="Ribbon-options"
                            style={{
                                fontWeight: "bold"
                            }} 
                            onClick={() => auth.logOut()}> Log Out </button>

                        <ShoppingCart/>
                    </span>
            )}

        </div>
        </div>
    )
}

export default HomeRibbon;