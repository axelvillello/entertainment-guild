import { Box, FormControl, FormGroup, TextField, Button } from '@mui/material';
import { useState, useEffect } from "react";
import { tryAddNewOrder } from './helpers/orderHelper';
import { useLocation } from 'react-router-dom';
import LoginUser from './LoginUser';
import { useAuth } from "./AuthProvider";
import { useCart } from './CartProvider';

const AddNewOrder = () => {
    const [streetAddress, setStreetAddress] = useState("");
    const [postCode, setPostCode] = useState("");
    const [suburb, setSuburb] = useState("");
    const [state, setState] = useState("");
    const [result, setResult] = useState("");
    const [nextReady, setNextReady] = useState(false);
    const location = useLocation();
    const auth = useAuth();
    const shopCart = useCart();

    useEffect(() => {
            setNextReady(true);
            console.table(auth.user)
        }, [location]);

    
    function handleAddOrder() {
        tryAddNewOrder(auth.user.UserID, auth.user.Email, streetAddress, postCode, suburb, state, auth, auth.user.Salt, auth.user.HashPW, auth.user.Name);
    }

    
    const handleStreetAddressChange = (event) => {
        setStreetAddress(event.target.value);
    }

    const handlePostCodeChange = (event) => {
        setPostCode(event.target.value);
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
            alignItems: "center",
            flexDirection: "column"
          }}>
            {nextReady ? (
                <Box display="flex" justifyContent="center">
                    <Box
                        width={300}
                        alignItems="left"
                        sx={{
                        '.MuiTextField-root, .MuiFormControl-root': { m: 1, ml: 0 },
                        '.MuiButton-root': { m: 1 },
                    }}>
                        <h1>Shipping Details</h1>
                            <FormControl>
                                <FormGroup>
                                    <TextField id="streetaddress-field" label="Street Address" variant="outlined"
                                    value={streetAddress} onChange={handleStreetAddressChange} />
                                </FormGroup>
                                <FormGroup>
                                    <TextField id="suburb-field" label="Suburb" variant="outlined"
                                    value={suburb} onChange={handleSuburbChange} />
                                </FormGroup>
                                <FormGroup>
                                    <TextField id="state-field" label="State" variant="outlined"
                                    value={state} onChange={handleStateChange} />
                                </FormGroup>
                                <FormGroup>
                                    <TextField id="postcode-field" label="Post Code" variant="outlined"
                                    value={postCode} onChange={handlePostCodeChange} />
                                </FormGroup>
                            </FormControl>
                            <Box >
                                <Button onClick={() => setNextReady(!nextReady)}>Next</Button>
                            </Box>
                            <TextField id="result" disabled label="Added order result" value={result} />
                    </Box >
                </Box >
            )
            :
            (
                !auth.user ? (
                <LoginUser/>
            )
            :
            (
                <div style={{textAlign: "left"}}>
                    <h1>Order Confirmation</h1>
                    <p>Name: {auth.user.Name}</p>
                    <p>Email: {auth.user.Email}</p>
                    <p>Street Address: {streetAddress}</p>
                    <p>Suburb: {suburb}</p>
                    <p>State: {state}</p>
                    <p>Post Code: {postCode}</p>
                    <h3>Order Content</h3>
                    {shopCart.cart.map((i) => (<p>${i.price} - {i.title}</p>))}
                            <span style={{display: "flex", flexDirection: "column", gap: "8px"}}>
                                <b>Total: ${shopCart.cart.reduce((sum, item) => sum + item.price, 0)}</b>
                            </span>
                    <button onClick={() => handleAddOrder()}>Confirm Order</button>
                </div>
            )
                
        )}
        </span>
    );
}

export default AddNewOrder;