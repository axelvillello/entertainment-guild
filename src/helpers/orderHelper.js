import axios from 'axios';
//API endpoints
const API_PREFIX_SHORT = "http://localhost:3001";
const API_PREFIX_LONG = API_PREFIX_SHORT + "/api/inft3050";

const tryAddNewOrder = async (userID, email, streetAddress, postCode, suburb, state, salt, hash, name) => {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    };

    let newTO = {
        PatronId: "",
        Email: email,
        PhoneNumber: null,
        StreetAddress: streetAddress,
        PostCode: postCode, 
        Suburb: suburb,
        State: state,
        CardNumber: null,
        CardOwner: null,
        Expiry: null,
        CVV: null,

    }

    let newOrder = {
        Customer: userID,
        StreetAddress: streetAddress,
        PostCode: postCode, 
        Suburb: suburb,
        State: state,
    }

    let newPatron = {
        Email: email,
        Name: name,
        Salt: salt,   
        HashPW: hash
    }

    try {
        const response = await axios.get("http://localhost:3001/api/inft3050/Patrons", {
            headers: { "Accept": "application/json" },
            withCredentials: true
        });
        const patrons = response.data.list;

        const patron = patrons.find(p => p.Email === newPatron.Email);

        if (!patron) {
            console.log("No patron found with email:", newPatron.Email);

            const patronResponse = await axios.post(API_PREFIX_LONG + "/Patrons", newPatron, 
            {
                headers: headers,
                withCredentials: true
            });
            console.log("Added patron successfully:", patronResponse);
            newTO.PatronId = patronResponse.data.UserID;
        }
        else {
            console.log("Patron found with email:", email);
            newTO.PatronId = patron.UserID;
        }
        
        
        console.log("Final order object:", newTO);
        const TOResponse = await axios.post(API_PREFIX_LONG + "/TO", newTO, 
        {
            headers: headers,
            withCredentials: true
        });
        console.log("Added to TO table successfully:", TOResponse);
        
        const customerID = TOResponse.data.CustomerID;

        newOrder.Customer = customerID;

        console.log("Final order object:", newOrder);

        const orderResponse = await axios.post(API_PREFIX_LONG + "/Orders", newOrder, 
        {
            headers: headers,
            withCredentials: true
        });
        console.log("Added order successfully:", orderResponse);    
        
        //setResult("Success");
    } 
    catch (error) 
    {
        console.error("Error posting data:", error);
        //setResult("Fail");
    }
}
export { tryAddNewOrder};