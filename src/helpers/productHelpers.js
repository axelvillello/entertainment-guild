//Helper for handling stock in the database
//WRITTEN BY: Axel Ello

import axios from 'axios';

const tryAddNewProduct = async (name, author, description, type, genre, source, setResult, updaterName, price) => {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    };

    //Convert the dropdown value to the appropriate integer
    let genreId;
        switch (type) {
            case "Book":
                genreId = 1;
                break;
            case "Movie":
                genreId = 2;
                break;
            case "Game":
                genreId = 3;
                break;
            default:
                genreId = null;
                break;
    }

    let newProduct = {
        Name: name,
        Author: author,
        Description: description,
        Genre: genreId,
        SubGenre: null,
        Published: new Date().toISOString(), 
        LastUpdatedBy: updaterName,
        LastUpdated: new Date().toISOString(),

    }

    let newStock = {
        SourceId: source,
        ProductId: null,
        Quantity: 1,
        Price: price,
    }

        //GET request for all genres of the entered media type
        const GenreResponse = await axios.get(`http://localhost:3001/api/inft3050/${type}Genre`); 
        console.log(GenreResponse); 
        const genres = GenreResponse.data.list; 
        const findGenre = genres.find((g) => g.Name.toLowerCase() === genre.toLowerCase());
        if (findGenre) {
            newProduct.SubGenre = findGenre.SubGenreID;
            console.log("Genre found!");
        } 
        else 
        {
            //If entered genre is missing, create a new genre
            const GenrePostResponse = await axios.post(`http://localhost:3001/api/inft3050/${type}Genre`, { Name: genre }, 
            {
                headers: headers,
                withCredentials: true
            });
            console.log("Added to a genre table:", GenrePostResponse);
            newProduct.SubGenre = GenrePostResponse.data.SubGenreID;
        }

    try {
        console.log("Final product object:", newProduct);

        //POST request for the Product table
        //Disclaimer: Incorrectly creates a Product entry, ignoring if the product exist
        const ProductResponse = await axios.post("http://localhost:3001/api/inft3050/Product", newProduct, 
        {
            headers: headers,
            withCredentials: true
        });
        console.log("Added to Product table:", ProductResponse);

        newStock.ProductId = ProductResponse.data.ID;

        //POST request for Stocktake table
        //Disclaimer: If a product already exists in a differing source type, this should be the only
        //entry made and not the previous Product table
        const StockTakeResponse = await axios.post("http://localhost:3001/api/inft3050/Stocktake", newStock, 
        {
            headers: headers,
            withCredentials: true
        });

        console.log("Added to Stocktake table:", StockTakeResponse);

        setResult("Product created successfully!");
    } 
    catch (error) 
    {
        console.error("Error posting data:", error);
        setResult("Error creating product");
    }

}

const tryDeleteProduct = async (stockId, setResult) => {
    try 
    {
        //DELETE request for a stocktake item based on ID
        const response = await axios.delete(`http://localhost:3001/api/inft3050/Stocktake/${stockId}`, {
            headers: {
                    "Accept": "application/json",
                },
                withCredentials: true,
        });
        console.log("Stock item deleted");
        setResult("Successfully deleted stock item");
    }
    catch (error)
    {
        console.log("Error deleting stock item:", error);
        setResult("Failed to delete stock item");
    }
}

export { tryAddNewProduct, tryDeleteProduct };