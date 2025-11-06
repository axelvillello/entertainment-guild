import axios from 'axios';

const tryDeleteProduct = async (stockId, setResult) => {
    try 
    {
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

export { tryDeleteProduct };