import axios from "axios";

const TestConnect = () => {
    
    //const apiKey = "sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ";
    const headers = {
        'Accept': 'application/json',
        //'X-API-KEY': apiKey
    };

    axios.get("http://localhost:3001/api/inft3050/BookGenre", {
    headers: headers
    })
    .then((response) => { console.log(response);
    })
    .catch((error) => { console.log(error);
    });

    return;

}

export default TestConnect;