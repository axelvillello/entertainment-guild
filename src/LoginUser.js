//Component definition for log in portal
//WRITTEN BY: Axel Ello

import { Box, FormControl, FormGroup, TextField, Button } from '@mui/material';
import { useState } from "react";
import { Link } from 'react-router-dom';
import { useAuth } from './providers/AuthProvider';
import { useSnackbar } from './providers/SnackbarProvider';

const LoginUser = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const sbar = useSnackbar();
    const auth = useAuth();

    const handleLogin = (event) => {
        event.preventDefault();

        if (username !== "" && password !== ""){
            auth.loginAction({username, password});
            return;
        }
        sbar.setSnackMsg('Please enter valid login details', 'warning');
    }

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    return (
    <Box display="flex" justifyContent="center">
        <Box
            width={400}
            textAlign="center"
            sx={{
                '.MuiTextField-root, .MuiFormControl-root': { m: 1, ml: 0 },
                '.MuiButton-root': { m: 1 },
            }}>
            <h1 className="Page-headings">Log In</h1>
            <form method="post" onSubmit={handleLogin}>
                <FormControl>
                    <FormGroup>
                    <TextField id="username-field" label="Username" variant="outlined"
                        value={username} onChange={handleUsernameChange} fullWidth/>
                    </FormGroup>
                    <FormGroup>
                    <TextField id="password-field" label="Password" variant="outlined"
                        type="password" value={password} onChange={handlePasswordChange} fullWidth />
                    </FormGroup>
                </FormControl>
                <div><Link to="/addNewUser">No account? Sign up here!</Link></div>
                <Box style={{padding: "10px", marginBottom: "20px"}}>
                    <Button type="submit" variant="outlined">Login</Button>
                </Box>
            </form>
        </Box >
    </Box >
    );
}

export default LoginUser;