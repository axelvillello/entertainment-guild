import { Box, FormControl, FormGroup, TextField, Button } from '@mui/material';
import { useState } from 'react';
import { useAuth } from './providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import AdminPanel from './AdminPanel';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchTermUser, setSearchUser] = useState("");
    const auth = useAuth();
    const navigate = useNavigate();

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    }

    const handleUserSearchTermChange = (event) => {
        setSearchUser(event.target.value);
    }

    const handleSearch = (event) => {
        event.preventDefault();
        if (!searchTerm) {
            navigate("/");
        }
        else {
            navigate("/searchProducts/" + searchTerm.trim());
    
        }
    }

    const handleUserSearch = (event) => {
        event.preventDefault();
        if (!searchTermUser) {
            navigate("/");
        }
        else {
            navigate("/searchUsers/" + searchTermUser.trim());
    
        }
    }

    return (
        <div>
            {
            auth.user?.IsAdmin === true ?
            (
                <>
                    <Box className="Search-bar" display="flex" justifyContent="center" alignItems="center">
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
                                    label="Search for products" 
                                    variant="outlined"
                                    type="text" 
                                    fullWidth 
                                    value={searchTerm} 
                                    onChange={handleSearchTermChange} 
                                    sx={{
                                        width: '300px',
                                        '& .MuiInputBase-root': {
                                        height: 30,},
                                        '& .MuiInputBase-input': {
                                            fontSize: '1rem',
                                            padding: '15px',
                                            color: '#DC143C'},
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#DC143C',
                                        },
                                        '& .MuiInputLabel-root': {
                                            fontSize: '0.7rem', 
                                        },
                                        
                                    }}
                                />
                                <Box >
                                    <Button type="submit" variant="outlined" sx={{height: 30, width: 180}}>Search Products</Button>
                                </Box>
                            </FormControl>
                        </form>
                    </Box >
                    </Box >

                    <Box className="Search-bar" display="flex" justifyContent="center" alignItems="center">
                    <Box
                        alignItems="center"
                        textAlign="center"
                        sx={{
                            '.MuiTextField-root, .MuiFormControl-root': { m: 1, ml: 0 },
                            '.MuiButton-root': { m: 1 },
                        }}>
                        <form method="post" onSubmit={handleUserSearch}>
                            <FormControl sx={{
                                display: 'flex',
                                flexDirection: 'row',
                            }}>
                                <TextField 
                                    id="search-field" 
                                    label="Search for users" 
                                    variant="outlined"
                                    type="text" 
                                    fullWidth 
                                    value={searchTermUser} 
                                    onChange={handleUserSearchTermChange} 
                                    sx={{
                                        width: '300px',
                                        '& .MuiInputBase-root': {
                                        height: 30,},
                                        '& .MuiInputBase-input': {
                                        fontSize: '1rem',
                                        padding: '15px',
                                        color: '#DC143C'},
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#DC143C',
                                        },
                                        '& .MuiInputLabel-root': {
                                            fontSize: '0.7rem',
                                        },
                                    }}
                                />
                                <Box >
                                    <Button type="submit" variant="outlined" sx={{height: 30, width: 180}}>Search Users</Button>
                                </Box>
                            </FormControl>
                        </form>
                    </Box >
                    </Box >
                </>
            )
            :
            (
                <Box className="Search-bar" display="flex" justifyContent="center" alignItems="center">
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
                                    color: '#DC143C',
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#DC143C',
                                    },
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