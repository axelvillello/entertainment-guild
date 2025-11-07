//Defines a helper for handling order
//WRITTEN BY: Axel Ello

import axios from 'axios';

//API endpoints
const API_PREFIX_SHORT = "http://localhost:3001";
const API_PREFIX_LONG = API_PREFIX_SHORT + "/api/inft3050";

const tryAddNewOrder = async (userID, email, streetAddress, postCode, suburb, state, salt, hash, name, cart, setResult) => {
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
        CardNumber: null,   //unused fields, required for POST requests
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

    //GET request for patrons in order to check if a user is a patron
    try {
        const response = await axios.get("http://localhost:3001/api/inft3050/Patrons", {
            headers: { "Accept": "application/json" },
            withCredentials: true
        });
        const patrons = response.data.list;

        const patron = patrons.find(p => p.Email === newPatron.Email);  //Finds patron matching customer email

        //Create an appropriate patron if missing
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

        //POST request for the TO table for joining
        //Disclaimer: Incorrectly recreates TO table for every customer
        const TOResponse = await axios.post(API_PREFIX_LONG + "/TO", newTO, 
        {
            headers: headers,
            withCredentials: true
        });

        console.log("Added to TO table successfully:", TOResponse);
        
        const customerID = TOResponse.data.CustomerID;

        newOrder.Customer = customerID;

        console.log("Final order object:", newOrder);

        //POST request for specific customer order
        const orderResponse = await axios.post(API_PREFIX_LONG + "/Orders", newOrder, 
        {
            headers: headers,
            withCredentials: true
        });
        console.log("Added order successfully:", orderResponse);

        const orderID = orderResponse.data.OrderID;    
        
        console.log("Cart items before order:", cart);

        //Loops through cart and creates a ProductInOrders entry
        for (const item of cart) {
            const productInOrder = {
                OrderId: orderID,
                ProduktId: item.id,
                Quantity: item.quantity,
            };

            console.log("ProductInOrder Object:", productInOrder);

            await axios.post(API_PREFIX_LONG + "/ProductsInOrders", productInOrder, 
            { 
                headers: headers, 
                withCredentials: true 
            });

            console.log("Added product to order:", productInOrder);
        }
        setResult("Order created successfully!");
    } 
    catch (error) 
    {
        console.error("Error posting data:", error);
        setResult("Error creating order");
    }
}
export { tryAddNewOrder};