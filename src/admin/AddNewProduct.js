//Form for entering new products via the admin panel
//WRITTEN BY: Axel Ello

import { Box, FormControl, FormGroup, TextField, Button, Select, InputLabel, MenuItem } from '@mui/material';
import { useState, useEffect } from "react";
import axios from "axios";
import { tryAddNewProduct } from '../helpers/productHelpers';
import { useAuth } from '../providers/AuthProvider';


const AddNewProduct = () => {
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [name, setName] = useState("");
    const [genre, setGenre] = useState("");
    const [price, setPrice] = useState("");
    const [result, setResult] = useState("");
    const [source, setSource] = useState("");
    const [publishDate, setPublishDate] = useState("");
    const [sources, setSources] = useState([]);
    const auth = useAuth();

    //GETs sources and filters out sources without a name
    useEffect (() => { 
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

    function handleAddProduct(event) {
        event.preventDefault(); 
        tryAddNewProduct(name, author, description, type, genre, source, setResult, auth.user.UserName, price);
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
                textAlign="center"
                sx={{
                '.MuiTextField-root, .MuiFormControl-root': { m: 1, ml: 0 },
                '.MuiButton-root': { m: 1 },
            }}>
                <h1 className="Page-headings">Enter New Product</h1>
                <form method="post" onSubmit={handleAddProduct}>
                    <FormControl>
                        <FormGroup>
                            <TextField id="name-field" label="Product Name" variant="outlined"
                            value={name} onChange={handleNameChange} />
                        </FormGroup>
                        <FormGroup>
                            <TextField id="price-field" label="Price $" variant="outlined"
                            value={price} onChange={handlePriceChange} />
                        </FormGroup>
                        <FormGroup>
                            <TextField id="author-field" label="Author" variant="outlined"
                            value={author} onChange={handleAuthorChange} />
                        </FormGroup>
                        <FormGroup>
                            <TextField id="description-field" label="Description" variant="outlined"
                            value={description} onChange={handleDescriptionChange} />
                        </FormGroup>
                        
                        <FormGroup>
                            <FormControl fullWidth>
                                <InputLabel id="genre-label">Type</InputLabel>
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
                            <TextField id="genre-field" label="Genre" variant="outlined"
                            value={genre} onChange={handleGenreChange} />
                        </FormGroup>

                        <FormGroup>
                            <FormControl fullWidth>
                                <InputLabel id="source-label">Source</InputLabel>
                                <Select
                                    labelId="source-label"
                                    id="source-select"
                                    value={source}
                                    label="Source"
                                    onChange={handleSourceChange}
                                > 
                                    {/*Map sources as drop down options*/}
                                    {sources.map((s) => (<MenuItem key={s.Sourceid} value={s.Sourceid}>{s.SourceName}</MenuItem>))}
                                </Select>
                                </FormControl>
                        </FormGroup>
                    </FormControl>
                    <Box >
                        <Button type="submit" variant="outlined">Create Product</Button>
                    </Box>
                </form>
            </Box >
        </Box >
    );
}

export default AddNewProduct;