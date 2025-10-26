import { Box, FormControl, FormGroup, TextField, Button } from '@mui/material';
import { useState } from 'react';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    }

    const handleSearch = (event) => {

    }

    return (
        <Box display="flex" justifyContent="center" alignItems="center">
        <Box
            alignItems="center"
            textAlign="center"
            sx={{
                '.MuiTextField-root, .MuiFormControl-root': { m: 1, ml: 0 },
                '.MuiButton-root': { m: 1 },
            }}>
            <form method="post" onSubmit={handleSearch}>
                <FormControl>
                    <FormGroup>
                        <TextField id="search-field" label="Search for Entertainment" variant="outlined"
                        type="text" fullWidth value={searchTerm} onChange={handleSearchTermChange} 
                        sx={{
                            width: '700px',
                            '& .MuiInputBase-root': {
                            height: 60,
                            },
                            '& .MuiInputBase-input': {
                            fontSize: '1.3rem',
                            padding: '15px',
                            },
                        }}/>
                    </FormGroup>
                </FormControl>
                <Box >
                    <Button type="submit" variant="outlined">Search</Button>
                </Box>
            </form>
        </Box >
    </Box >
    );
}

export default Search;