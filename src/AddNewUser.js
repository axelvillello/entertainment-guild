import { Box, FormControl, FormGroup, TextField, Button } from '@mui/material';
import { useState } from "react";
import {tryAddNewUser} from './helpers/userHelpers';

const AddNewUser = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [result, setResult] = useState("");

    function handleAddUser(event) {
        event.preventDefault(); //Prevent reloading of the page
        tryAddNewUser(username, password, email, name, setResult);
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

    return (
        <Box display="flex" justifyContent="center">
            <Box
                width={300}
                alignItems="left"
                sx={{
                '.MuiTextField-root, .MuiFormControl-root': { m: 1, ml: 0 },
                '.MuiButton-root': { m: 1 },
            }}>
                <h1>Sign Up</h1>
                <form method="post" onSubmit={handleAddUser}>
                    <FormControl>
                        <FormGroup>
                            <TextField id="username-field" label="Username" variant="outlined"
                            value={username} onChange={handleUsernameChange} />
                        </FormGroup>
                        <FormGroup>
                            <TextField id="password-field" label="Password" variant="outlined"
                            autoComplete="new-password" type="password" value={password}
                            onChange={handlePasswordChange} />
                        </FormGroup>
                        <FormGroup>
                            <TextField id="email-field" label="Email" variant="outlined"
                            value={email} onChange={handleEmailChange} />
                        </FormGroup>
                        <FormGroup>
                            <TextField id="name-field" label="Full Name" variant="outlined"
                            value={name} onChange={handleNameChange} />
                        </FormGroup>
                    </FormControl>
                    <Box >
                        <Button type="submit" variant="outlined">Submit</Button>
                    </Box>
                    <TextField id="result" disabled label="Added user result" value={result} />
                </form>
            </Box >
        </Box >
    );
}

export default AddNewUser;