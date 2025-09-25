//Test component for backend access
//ADAPTED FROM: course content

import axios from "axios";

const TestConnect = () => {
    
    const headers = {
        'Accept': 'application/json',
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