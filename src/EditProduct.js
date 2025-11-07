//Component definition for admins to edit a product
//WRITTEN BY: Axel Ello

import { Box, FormControl, FormGroup, TextField, Button, Select, InputLabel, MenuItem } from '@mui/material';
import { useState, useEffect } from "react";
import axios from "axios";
import { tryAddNewProduct } from './helpers/productHelpers';
import { useAuth } from './providers/AuthProvider';
import { useLocation } from 'react-router-dom';


const EditProduct = () => {
    const location = useLocation();
    const productData = location.state; //Retrieves product data from previous page

    const [author, setAuthor] = useState(productData.author || "");
    const [description, setDescription] = useState(productData.description || "");
    const [price, setPrice] = useState(productData.price || "");
    const [type, setType] = useState("");
    const [name, setName] = useState(productData.title || "");
    const [genre, setGenre] = useState("");
    const [result, setResult] = useState("");
    const [source, setSource] = useState("");
    const [publishDate, setPublishDate] = useState("");
    const [sources, setSources] = useState([]);
    const auth = useAuth();

    useEffect (() => { 
        //GET request for source drop down
        const promise = axios.get("http://localhost:3001/api/inft3050/Source"); 
        promise.then((response) => { 
            console.log(response); 
            const sources = response.data.list; 
            const filteredSources = sources.filter((ls) => ls.SourceName && ls.SourceName.trim() !== "")
            .sort((a, b) => a.SourceName.localeCompare(b.SourceName));
            if (filteredSources) {
                setSources(filteredSources);
            } 
            else {
                setSources([]); 
            }
        }) 
    }, [source])

    function handleEditProduct(event) {
        event.preventDefault(); //Prevent reloading of the page
        tryAddNewProduct(name, author, description, type, genre, source, setResult, auth.user.UserName, price); //placeholder as PUT is not working
    }
    
    const handleAuthorChange = (event) => {
        setAuthor(event.target.value);
    }

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    }

    const handleGenreChange = (event) => {
        setGenre(event.target.value);
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }

    const handleTypeChange = (event) => {
        setType(event.target.value);
    }

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleSourceChange = (event) => {
        setSource(event.target.value);
    }

    return (
        <Box display="flex" justifyContent="center">
            <Box
                width={700}
                alignItems="center"
                textAlign="center"
                justifyContent= "right"
                sx={{
                '.MuiTextField-root, .MuiFormControl-root': { m: 1, ml: 0 },
                '.MuiButton-root': { m: 1 },
            }}>
                <h1 className='Page-headings'>Edit Product</h1>
                <form method="post" onSubmit={handleEditProduct}>
                    <FormControl sx={{justifyContent: "right"}}>
                        <Box sx={{display: "flex", alignItems: "center", justifyContent: "right", flexDirection: "row", gap: 2}}>
                            <p>{productData.title} →</p>
                            <TextField id="name-field" label="New Product Name" variant="outlined"
                            value={name} onChange={handleNameChange} />
                        </Box>
                        <Box sx={{display: "flex", alignItems: "center", justifyContent: "right", flexDirection: "row", gap: 2}}>
                            <p>${productData.price} →</p>
                            <TextField id="name-field" label="New Price $" variant="outlined"
                            value={price} onChange={handlePriceChange} />
                        </Box>
                        <Box sx={{display: "flex", alignItems: "center", justifyContent: "right", flexDirection: "row", gap: 2}}>
                            <p>{productData.author} →</p>
                            <TextField id="author-field" label="New Author" variant="outlined"
                            value={author} onChange={handleAuthorChange} />
                        </Box>
                        <Box sx={{display: "flex", alignItems: "center", justifyContent: "right", flexDirection: "row", gap: 2}}>
                            <p>{productData.description} →</p>
                            <TextField id="description-field" label="New Description" variant="outlined"
                            value={description} onChange={handleDescriptionChange} />
                        </Box>
                        
                        <FormGroup>
                            <FormControl fullWidth>
                                <InputLabel id="genre-label">New Media Type</InputLabel>
                                <Select
                                    labelId="genre-label"
                                    id="genre-select"
                                    value={type}
                                    label="Type"
                                    onChange={handleTypeChange}
                                >
                                    <MenuItem value={"Book"}>Book</MenuItem>
                                    <MenuItem value={"Movie"}>Movie</MenuItem>
                                    <MenuItem value={"Game"}>Game</MenuItem>
                                </Select>
                                </FormControl>
                            <TextField id="genre-field" label="New Genre" variant="outlined"
                            value={genre} onChange={handleGenreChange} />
                        </FormGroup>

                        <FormGroup>
                            <FormControl fullWidth>
                                <InputLabel id="source-label">New Source</InputLabel>
                                <Select
                                    labelId="source-label"
                                    id="source-select"
                                    value={source}
                                    label="Source"
                                    onChange={handleSourceChange}
                                >
                                    {sources.map((s) => (<MenuItem key={s.Sourceid} value={s.Sourceid}>{s.SourceName}</MenuItem>))}
                                </Select>
                                </FormControl>
                        </FormGroup>
                    </FormControl>
                    <Box >
                        <Button type="submit" variant="outlined">Submit Edits</Button>
                    </Box>
                </form>
            </Box >
        </Box >
    );
}

export default EditProduct;