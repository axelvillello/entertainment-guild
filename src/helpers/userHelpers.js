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
        headers: headers, withCredentials: true
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
const tryAddNewUser = (username, password, email, name, setResult) => {
    const headers = {
        'Accept': 'application/json',
    };

    let newCredentials = {
        UserName: username,
        Email: email, 
        Name: name,
        IsAdmin: "false",
        Salt: generateSalt(),
        HashPW: ""
    }

    //Create hash of salt and password and POST new user
    sha256(newCredentials.Salt + password).then(hashedPW => {
        newCredentials.HashPW = hashedPW;
        console.log(newCredentials);
    }).then(axios.post(API_PREFIX_LONG + "/User", newCredentials,
        { headers: headers, withCredentials: true }) //withCredentials to include auth cookie
    ).then(response => {
        console.log("Added user successfully");
        setResult("Success");
    }).catch(error => {
        console.error('Error posting data:', error);
        setResult("Fail");
    });
}

export { tryAddNewUser, tryLoginUser };