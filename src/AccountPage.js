//Component for displaying user account information
//WRITTEN BY: Axel Ello

import { Box, FormControl, FormGroup, TextField, Button, Checkbox, FormControlLabel } from '@mui/material';
import { useAuth } from './providers/AuthProvider';
import { useNavigate } from 'react-router-dom';

const AccountPage = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    const userData = {
        id: auth.user.UserID,
        username: auth.user.UserName,
        name: auth.user.Name,
        email: auth.user.Email,
        isAdmin: auth.user.IsAdmin,
        hashPw: auth.user.HashPW,
        salt: auth.user.Salt
    }

    return (
        <div style={{display: "flex", flexDirection: "column", justifyContent:"center", alignItems:"center"}}>
            <h1 className='Page-headings'>My Account</h1>
            <button className="Ribbon-options" style={{height: "40px"}} onClick={(e) => {navigate("/editUser", {state: userData})}}>
                Edit Details
            </button>
            <p><b>Username:</b> {auth.user.UserName}</p>
            <p><b>Email Address:</b> {auth.user.UserName}</p>
            <p><b>Full Name:</b> {auth.user.Name}</p>
        </div>
        
    )
}

export default AccountPage;