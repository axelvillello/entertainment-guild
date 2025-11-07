//Component for creating a new order 
//WRITTEN BY: Axel Ello

import { Box, FormControl, FormGroup, TextField, Button, Select, InputLabel, MenuItem } from '@mui/material';
import { useState, useEffect } from "react";
import { tryAddNewOrder } from './helpers/orderHelper';
import { useLocation } from 'react-router-dom';
import LoginUser from './LoginUser';
import { useAuth } from "./providers/AuthProvider";
import { useCart } from './providers/CartProvider';
import { useSnackbar } from './providers/SnackbarProvider';
import { useNavigate } from 'react-router-dom';

const AddNewOrder = () => {
    const [streetAddress, setStreetAddress] = useState("");
    const [postCode, setPostCode] = useState("");
    const [suburb, setSuburb] = useState("");
    const [state, setState] = useState("");
    const [result, setResult] = useState("");
    const [nextReady, setNextReady] = useState(false);  //flag for when to progress through screen
    const location = useLocation();
    const navigate = useNavigate();
    const auth = useAuth();
    const shopCart = useCart();
    const sbar = useSnackbar();

    useEffect(() => {
            setNextReady(true);
            console.table(auth.user)
        }, [location]);
    
    useEffect(() => {
        if (result === "Order created successfully!") {
            sbar.setSnackMsg(result, "success");
            shopCart.clearCart();
            navigate("/");
        }
        else if (result === "Error creating order"){
            sbar.setSnackMsg(result, "error");
        }
        else if (result) {
            sbar.setSnackMsg(result, "info");
        }
    }, [result]);

    function handleAddDetails(event) {
        const errors = [];

        if (!streetAddress || !suburb || !state || !postCode) {
            errors.push("Shipping details cannot be blank!");
        }

        if (errors.length > 0) {
            const errorMessage = errors.join('\n'); 
            sbar.setSnackMsg(errorMessage, "warning");
        }
        else {  
            setNextReady(!nextReady);
        }
    }

    function handleAddOrder() {
        
        tryAddNewOrder(
            auth.user.UserID, 
            auth.user.Email, 
            streetAddress, 
            postCode, 
            suburb, 
            state, 
            auth.user.Salt, 
            auth.user.HashPW, 
            auth.user.Name,
            shopCart.cart,
            setResult);
    }

    
    const handleStreetAddressChange = (event) => {
        setStreetAddress(event.target.value);
    }

    //Replacement using regex found via Gemini
    const handlePostCodeChange = (event) => {
        const filteredValue = event.target.value.replace(/[^0-9]/g, '');

        if (filteredValue.length !== event.target.value.length) {
            sbar.setSnackMsg("Postcodes can only contain numbers", "warning");
        }
 
        setPostCode(filteredValue);
    }

    const handleSuburbChange = (event) => {
        setSuburb(event.target.value);
    }

    const handleStateChange = (event) => {
        setState(event.target.value);
    }

    return (
        <span style={{
            display: "flex", 
            justifyContent: "center", 
            textAlign: "center",
            alignItems: "center",
            flexDirection: "column"
          }}>
            {nextReady ? (
                <Box display="flex" justifyContent="center">
                    <Box
                        width={400}
                        textAlign="center"
                        sx={{
                        '.MuiTextField-root, .MuiFormControl-root': { m: 1, ml: 0 },
                        '.MuiButton-root': { m: 1 },
                    }}>
                        <h1 className="Page-headings">Shipping Details</h1>
                            <FormControl>
                                <FormGroup>
                                    <TextField id="streetaddress-field" label="Street Address" variant="outlined"
                                    value={streetAddress} onChange={handleStreetAddressChange} />
                                </FormGroup>
                                <FormGroup>
                                    <TextField id="suburb-field" label="Suburb" variant="outlined"
                                    value={suburb} onChange={handleSuburbChange} />
                                </FormGroup>
                                <FormControl fullWidth>
                                    <FormGroup>
                                        <InputLabel id="state-label">State</InputLabel>
                                            <Select
                                                labelId="state-label"
                                                id="state-select"
                                                value={state}
                                                label="State"
                                                onChange={handleStateChange}
                                            >
                                                <MenuItem value={"ACT"}>ACT</MenuItem>
                                                <MenuItem value={"NSW"}>NSW</MenuItem>
                                                <MenuItem value={"NT"}>NT</MenuItem>
                                                <MenuItem value={"QLD"}>QLD</MenuItem>
                                                <MenuItem value={"SA"}>SA</MenuItem>
                                                <MenuItem value={"TAS"}>TAS</MenuItem>
                                                <MenuItem value={"VIC"}>VIC</MenuItem>
                                                <MenuItem value={"WA"}>WA</MenuItem> 
                                        </Select>
                                    </FormGroup>
                                </FormControl>
                                <FormGroup>
                                    <TextField id="postcode-field" label="Post Code" variant="outlined"
                                    value={postCode} onChange={handlePostCodeChange}/>
                                </FormGroup>
                            </FormControl>
                            <Box >
                                <Button onClick={() => handleAddDetails()}>Next</Button>
                            </Box>
                    </Box >
                </Box >
            )
            :
            (
                //If user is not logged in, automatically renders log in component
                !auth.user ? (
                <LoginUser/>
            )
            :
            (
                <div style={{display: "flex", 
                                justifyContent: "center",
                                alignItems: "center", 
                                textAlign: "center",
                                flexDirection: "column",
                                paddingBottom: "50px"}}>
                    <h1 className='Page-headings'>Order Summary</h1>
                    <span style={{textAlign: "left"}}>
                        <p><b>Name:</b> {auth.user.Name}</p>
                        <p><b>Email:</b> {auth.user.Email}</p>
                        <p><b>Street Address:</b> {streetAddress}</p>
                        <p><b>Suburb:</b> {suburb}</p>
                        <p><b>State:</b> {state}</p>
                        <p><b>Post Code:</b> {postCode}</p>
                    </span>
                    
                    <h3 style={{ fontWeight: "bold", textDecorationLine: "underline", fontSize: "30px"}}>Order Content</h3>
                    {shopCart.cart.map((i) => (<p>${(i.price*i.quantity).toFixed(2)} - {i.quantity} x {i.title}</p>))}
                    <span style={{display: "flex", flexDirection: "column", gap: "8px", borderTop: "1px solid #000000",}}>
                        <b>Order Total: ${shopCart.cart.reduce((sum, item) => sum + (item.price*item.quantity), 0)}</b>
                    </span>
                    <button className="Ribbon-options" style={{height: "80px", width: "200px", margin: "10px", backgroundColor: "green", color: "white", fontSize: "20px", borderRadius: "15px"}} onClick={() => handleAddOrder()}>Confirm Order</button>
                </div>
            )   
        )}
        </span>
    );
}

export default AddNewOrder;