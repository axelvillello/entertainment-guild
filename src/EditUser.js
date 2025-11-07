//Component definition for editing user accounts
//WRITTEN BY: Axel Ello

import { Box, FormControl, FormGroup, TextField, Button, Checkbox, FormControlLabel } from '@mui/material';
import { useState } from "react";
import { useAuth } from './providers/AuthProvider';
import * as React from "react";
import { useLocation } from 'react-router-dom';
import { tryEditUser } from './helpers/userHelpers';

const EditUser = () => {
    const location = useLocation();
    const userData = location.state;
    const [username, setUsername] = useState(userData.username || "");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(userData.email || "");
    const [name, setName] = useState(userData.name || "");
    const [result, setResult] = useState("");
    const [checked, setChecked] = React.useState(false);
    const auth = useAuth();

    function handleAdminEditUser(event) {
        event.preventDefault(); 
        tryEditUser(userData.id, username, password, email, name, checked.toString(), setResult, userData.hashPw, userData.salt);
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

    return (
            <Box display="flex" justifyContent="center">
                <Box
                    width={700}
                    alignItems="center"
                    textAlign="center"
                    justifyContent="center"
                    sx={{
                    '.MuiTextField-root, .MuiFormControl-root': { m: 1, ml: 0 },
                    '.MuiButton-root': { m: 1 },
                }}>
                    <h1 className='Page-headings'>{auth.user?.IsAdmin ? "Edit User Information" : "Account Management"}</h1>
                    <p><i>{auth.user?.IsAdmin ? `You are currently editing User #${userData.id}` : "Edit your details"}</i></p>
                    <form method="post" onSubmit={handleAdminEditUser}>
                        <FormControl>
                            <Box sx={{display: "flex", alignItems: "center", justifyContent: "right", flexDirection: "row", gap: 2}}>
                                <p>{userData.username} →</p>
                                <TextField id="username-field" label="New Username" variant="outlined"
                                value={username} onChange={handleUsernameChange} />
                            </Box>
                            <Box sx={{display: "flex", alignItems: "right", justifyContent: "right", flexDirection: "row", gap: 2}}>
                                <p style={{textDecorationLine: "underline"}}><em>Leave blank if unchanged</em></p>
                                <TextField id="password-field" label="New Password" variant="outlined"
                                autoComplete="new-password" type="password" value={password}
                                onChange={handlePasswordChange} />
                            </Box>
                            <Box sx={{display: "flex", alignItems: "right", justifyContent: "right", flexDirection: "row", gap: 2}}>
                                <p>{userData.email || "EMAIL MISSING"} →</p>
                                <TextField id="email-field" label="Email" variant="outlined"
                                value={email} onChange={handleEmailChange} />
                            </Box>
                            <Box sx={{display: "flex", alignItems: "right", justifyContent: "right", flexDirection: "row", gap: 2}}>
                                <p>{userData.name} →</p>
                                <TextField id="name-field" label="Full Name" variant="outlined"
                                value={name} onChange={handleNameChange} />
                            </Box>
                            {/*Conditionally renders isAdmin checkbox when in admin mode */}
                            {auth.user.isAdmin && (
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
                            )}
                        </FormControl>
                        <Box >
                            <Button type="submit" variant="outlined">Submit Edits</Button>
                        </Box>
                    </form>
                </Box >
            </Box >
        
    )
}

export default EditUser;