import { Box, FormControl, FormGroup, TextField, Button } from '@mui/material';
import { useState } from "react";
import { tryLoginUser } from './helpers/userHelpers';
import { Link } from 'react-router-dom';
import AddNewUser from './AddNewUser';

const LoginUser = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [result, setResult] = useState("");

    const handleLogin = (event) => {
        event.preventDefault(); //Prevent reloading of the page
        tryLoginUser(username, password, setResult);
    }

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
    
        setPassword(event.target.value);
    }

    const padding = {
        padding: 5
    }

    return (
    <Box display="flex" justifyContent="center">
        <Box
            width={300}
            alignItems="left"
            sx={{
                '.MuiTextField-root, .MuiFormControl-root': { m: 1, ml: 0 },
                '.MuiButton-root': { m: 1 },
            }}>
            <h1>Log In</h1>
            <form method="post" onSubmit={handleLogin}>
                <FormControl>
                    <FormGroup>
                    <TextField id="username-field" label="Username" variant="outlined"
                    value={username} onChange={handleUsernameChange} />
                    </FormGroup>
                    <FormGroup>
                    <TextField id="password-field" label="Password" variant="outlined"
                    type="password" value={password} onChange={handlePasswordChange} />
                    </FormGroup>
                </FormControl>
                <Box >
                    <Button type="submit" variant="outlined">Login</Button>
                </Box>
                <TextField id="result" disabled label="Login result" value={result} />
                <div><Link to="/addNewUser">No account? Sign up here!</Link></div>
            </form>
        </Box >
</Box >);
}

export default LoginUser;