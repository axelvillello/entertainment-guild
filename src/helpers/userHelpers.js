import axios from 'axios'
//API endpoints
const API_PREFIX_SHORT = "http://localhost:3001";
const API_PREFIX_LONG = API_PREFIX_SHORT + "/api/inft3050";

/* Axios database calls */
//Login user
const tryLoginUser = (username, password, setResult) => {
    const headers = {
        'Accept': 'application/json',
    };
    //POST credentials to login
    axios.post(API_PREFIX_SHORT + "/login", { username: username, password: password }, {
        headers: headers, 
        withCredentials: true
    }).then((response) => { //Success
        console.log(response);
        //Change state variable here
        setResult("Success!");
    }).catch((error) => {
        console.log(error);
        setResult("Error :(");
    });
}

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
const tryAddNewUser = async (username, password, email, name, setResult) => {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    };

    let newCredentials = {
        UserName: username,
        Email: email, 
        Name: name,
        IsAdmin: false,
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

export { tryAddNewUser, tryLoginUser };