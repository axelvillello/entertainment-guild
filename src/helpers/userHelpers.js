//Helper for handling user accounts in the database
//WRITTEN BY: Axel Ello

import axios from 'axios'
//API endpoints
const API_PREFIX_SHORT = "http://localhost:3001";
const API_PREFIX_LONG = API_PREFIX_SHORT + "/api/inft3050";

/* Axios database calls */

//SHA256 password hashing
async function sha256(message) {
    // encode as UTF-8
    const msgBuffer = new TextEncoder().encode(message);
    // hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    // convert bytes to hex string
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

// Generate a random salt: a 32-character hex string
const generateSalt = () => {
    const salt = window.crypto.randomUUID().replaceAll("-", "");
    //console.log("Salt: ", salt);
    return salt;
}

//Add new user
const tryAddNewUser = async (username, password, email, name, adminStatus, setResult) => {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    };

    let newCredentials = {
        UserName: username,
        Email: email, 
        Name: name,
        IsAdmin: adminStatus,
        Salt: generateSalt(),
        HashPW: ""
    }

    let newPatron = {
        Email: email,
        Name: name,
        Salt: "",
        HashPW: ""
    }

    try {
        const hashedPW = await sha256(newCredentials.Salt + password);
        newCredentials.HashPW = hashedPW;

        console.log("Final user object:", newCredentials);

        const userResponse = await axios.post(API_PREFIX_LONG + "/User", newCredentials, {
            headers: headers,
            withCredentials: true
        });
        
        console.log("Added user successfully:", userResponse);

        if (newCredentials.IsAdmin === false){
            newPatron.Salt = newCredentials.Salt;
            newPatron.HashPW = newCredentials.HashPW;

            console.log("Final patron object:", newPatron);

            const patronResponse = await axios.post(API_PREFIX_LONG + "/Patrons", newPatron, 
            {
                headers: headers,
                withCredentials: true
            });
            console.log("Added patron successfully:", patronResponse);
        }

        setResult("Success");
    } 
    catch (error) 
    {
        console.error("Error posting data:", error);
        setResult("Fail");
    }
}

const tryDeleteUser = async (userId, setResult) => {
    try 
    {
        //DELETE request for users based on ID
        const response = await axios.delete(`http://localhost:3001/api/inft3050/User/${userId}`, {
            headers: {
                    "Accept": "application/json",
                },
                withCredentials: true,
        });
        console.log("User deleted:");
        setResult("Successfully deleted user");
    }
    catch (error)
    {
        console.log("Error deleting user:", error);
        setResult("Failed to delete user");
    }
}

const tryEditUser = async (id, username, password, email, name, isAdmin, setResult, pwHash, salt) => {

    let editCredentials = {
        UserName: username,
        Email: email, 
        Name: name,
        IsAdmin: isAdmin,
        Salt: salt,
        HashPW: pwHash
    }

    try 
    {
        //If a new password was provided, rehash
        if (password !== "")
        {
            editCredentials.Salt = generateSalt();
            const hashedPW = await sha256(editCredentials.Salt + password);
            editCredentials.HashPW = hashedPW;
        }

        console.log("Attempting to edit user object:", editCredentials);

        //PUT request for the specified user
        const response = await axios.put(`http://localhost:3001/api/inft3050/User/${id}`, editCredentials, {
            headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                withCredentials: true,
        });
        console.log("User updated:", response.data);
        setResult("Successfully updated user");
    }
    catch (error)
    {
        console.log("Error updating user:", error);
        setResult("Failed to update user");
    }
}

export { tryAddNewUser, tryDeleteUser, tryEditUser };