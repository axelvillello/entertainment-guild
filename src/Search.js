import { Box, FormControl, FormGroup, TextField, Button } from '@mui/material';
import { useState } from 'react';
import { useAuth } from './providers/AuthProvider';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const auth = useAuth();
    const navigate = useNavigate();

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    }

    const handleSearch = (event) => {
        event.preventDefault();
        if (!searchTerm) {
            navigate("/");
        }
        else {
            navigate("/search/" + searchTerm.trim());
    
        }
    }

    return (
        <div>
            {
            auth.user?.IsAdmin === true ?
            (
                <p>Welcome to the admin panel.</p>
            )
            :
            (
                <Box className="Flyin-anim" display="flex" justifyContent="center" alignItems="center">
                <Box
                    alignItems="center"
                    textAlign="center"
                    sx={{
                        '.MuiTextField-root, .MuiFormControl-root': { m: 1, ml: 0 },
                        '.MuiButton-root': { m: 1 },
                    }}>
                    <form method="post" onSubmit={handleSearch}>
                        <FormControl sx={{
                            display: 'flex',
                            flexDirection: 'row',
                        }}>
                            <TextField 
                                id="search-field" 
                                label="Search for Entertainment" 
                                variant="outlined"
                                type="text" 
                                fullWidth 
                                value={searchTerm} 
                                onChange={handleSearchTermChange} 
                                sx={{
                                    width: '700px',
                                    '& .MuiInputBase-root': {
                                    height: 60,},
                                    '& .MuiInputBase-input': {
                                    fontSize: '1.3rem',
                                    padding: '15px',
                                    },
                                }}
                            />
                            <Box >
                                <Button type="submit" variant="outlined" sx={{height: 60}}>Search</Button>
                            </Box>
                        </FormControl>
                    </form>
                </Box >
                </Box >
            )}
        </div>
    );
}

export default Search;