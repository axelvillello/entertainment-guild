//Component for creating a new user, conditionally renders based on if current user is an admin 
//WRITTEN BY: Axel Ello

import { Box, FormControl, FormGroup, TextField, Button, Checkbox, FormControlLabel } from '@mui/material';
import { useState, useEffect} from "react";
import {tryAddNewUser} from './helpers/userHelpers';
import { useAuth } from './providers/AuthProvider';
import * as React from "react";
import { useSnackbar } from './providers/SnackbarProvider';
import { useNavigate } from 'react-router-dom';

const AddNewUser = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [result, setResult] = useState("");
    const [checked, setChecked] = React.useState(false);

    const auth = useAuth();
    const sbar = useSnackbar();

    function handleAddUser(event) {
        event.preventDefault();
        const errors = [];

        if (!username || !password || !email || !name) {
            errors.push("Account details cannot be blank!");
        }
        if (password.length < 8) {
            errors.push("Password is too weak (must be 8+ characters).");
        }
        if (!email.includes("@")) {
            errors.push("Email is invalid (must contain @ symbol).");
        }
        
        if (errors.length > 0) {
            const errorMessage = errors.join('\n'); 
            sbar.setSnackMsg(errorMessage, "warning")
        }
        else {  
            //When not an admin, defaults the value of isAdmin to false
            tryAddNewUser(username, password, email, name, "false", setResult); 
        }
    }

    function handleAdminAddUser(event) {
        event.preventDefault(); 
        const errors = [];

        if (!username || !password || !email || !name) {
            errors.push("Account details cannot be blank!");
        }
        if (password.length < 8) {
            errors.push("Password is too weak (must be 8+ characters).");
        }
        if (!email.includes("@")) {
            errors.push("Email is invalid (must contain @ symbol).");
        }
        
        if (errors.length > 0) {
            const errorMessage = errors.join('\n'); 
            sbar.setSnackMsg(errorMessage, "warning")
        }
        else {
            tryAddNewUser(username, password, email, name, checked.toString(), setResult);
        }
    }
    
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleCheckedChange = (event) => {
        setChecked(event.target.checked);
        console.log(checked);
    }

    useEffect(() => {
        if (result === "Success")
        {
            sbar.setSnackMsg("Successfully created account!", "success");
            auth.loginAction({username, password});
        }
        else if(result === "Fail")
        {
            sbar.setSnackMsg("Failed to create account", "warning");
        }
    }, [result])

    return (
        auth.user?.IsAdmin ? (
            <Box display="flex" justifyContent="center">
                <Box
                    width={400}
                    textAlign="center"
                    sx={{
                    '.MuiTextField-root, .MuiFormControl-root': { m: 1, ml: 0 },
                    '.MuiButton-root': { m: 1 },
                }}>
                    <h1 className="Page-headings">Enter New User</h1>
                    <form method="post" onSubmit={handleAdminAddUser}>
                        <FormControl>
                            <FormGroup>
                                <TextField id="username-field" label="Username" variant="outlined"
                                    value={username} onChange={handleUsernameChange} fullWidth/>
                            </FormGroup>
                            <FormGroup>
                                <TextField id="password-field" label="Password" variant="outlined"
                                    autoComplete="new-password" type="password" value={password}
                                    onChange={handlePasswordChange} fullWidth/>
                            </FormGroup>
                            <FormGroup>
                                <TextField id="email-field" label="Email" variant="outlined"
                                    value={email} onChange={handleEmailChange} fullWidth />
                            </FormGroup>
                            <FormGroup>
                                <TextField id="name-field" label="Full Name" variant="outlined"
                                    value={name} onChange={handleNameChange} fullWidth/>
                            </FormGroup>

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checked}
                                        onChange={handleCheckedChange}
                                        inputProps={{ 'aria-label': 'Admin Status' }}
                                    />
                                }
                                label="Is Admin?"
                            />
                        </FormControl>
                        <Box >
                            <Button type="submit" variant="outlined">Create User</Button>
                        </Box>
                    </form>
                </Box >
            </Box >
        )
        :
        (
            <Box display="flex" justifyContent="center">
            <Box
                width={400}
                textAlign="center"
                sx={{
                '.MuiTextField-root, .MuiFormControl-root': { m: 1, ml: 0 },
                '.MuiButton-root': { m: 1 },
            }}>
                <h1 className="Page-headings">Sign Up</h1>
                <form method="post" onSubmit={handleAddUser}>
                    <FormControl>
                        <FormGroup>
                            <TextField id="username-field" label="Username" variant="outlined"
                                value={username} onChange={handleUsernameChange} fullWidth/>
                        </FormGroup>
                        <FormGroup>
                            <TextField id="password-field" label="Password" variant="outlined"
                                autoComplete="new-password" type="password" value={password}
                                onChange={handlePasswordChange} fullWidth/>
                        </FormGroup>
                        <FormGroup>
                            <TextField id="email-field" label="Email" variant="outlined"
                                value={email} onChange={handleEmailChange} fullWidth/>
                        </FormGroup>
                        <FormGroup>
                            <TextField id="name-field" label="Full Name" variant="outlined"
                                value={name} onChange={handleNameChange} fullWidth/>
                        </FormGroup>
                    </FormControl>
                    <Box >
                        <Button type="submit" variant="outlined">Create Account</Button>
                    </Box>
                </form>
            </Box >
        </Box >
        )
    )
}

export default AddNewUser;