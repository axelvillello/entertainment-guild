//Component definition for rendering user search results
//WRITTEN BY: Axel Ello

import { useState, useEffect } from "react";
import axios from "axios";
import User from "./User";
import { useLoading } from "./providers/LoadingProvider";
import { useParams } from "react-router-dom";
import Search from "./Search";
import { useAuth } from "./providers/AuthProvider";

const SearchUsers = () => {
    const [users, setUsers] = useState([]);
    const loading = useLoading();
    const auth = useAuth();
    const {searchTerm} = useParams();

    //GET request for all users 
    useEffect (() => {
        loading.setLoadingStatus(true);
        const promise = axios.get("http://localhost:3001/api/inft3050/User", {withCredentials: true});
        promise.then((response) => {
            console.log(response);
            const loadedUsers = response.data.list;
            const filteredUsers = loadedUsers.filter((lu) => lu.Name.toLowerCase().includes(searchTerm.toLowerCase()) || lu.UserName.toLowerCase().includes(searchTerm.toLowerCase()));
            if (filteredUsers) {    
                setUsers(filteredUsers);
            }
            else {
                setUsers([]);
            }
            loading.setLoadingStatus(false);
        });
    }, [searchTerm])

    return (
        <div
            className="Flyin-anim"
            style={{
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center",
                flexDirection: "column"   
            }
        }>
            <Search/>
            <h1 className="Page-headings" display="flex" justifyContent="center" alignItems="center">{auth.user?.IsAdmin ? "User Search Results" : "Search Results"}</h1>
            <div 
                className="Container-flex"
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)", 
                }}>
                {loading.loadingProg ? 
                    (
                        <img className="Loading-wheel" alt="Loading..." src="/images/loading.png"/>
                    )
                    :
                    users.length > 0 ?
                    (
                        users.map((u) => { 
                            if (auth.user?.IsAdmin) {
                                return (
                                    <User 
                                        key={u.UserID} 
                                        id ={u.UserID}
                                        username={u.UserName} 
                                        name={u.Name}
                                        email={u.Email} 
                                        hashPw={u.HashPW} 
                                        salt={u.Salt} 
                                        isAdmin={u.IsAdmin} 
                                    />
                                );
                            }
                            else {
                                return (
                                    <User
                                        key={u.UserID} 
                                        id ={u.UserID}
                                        username={u.UserName} 
                                        name={u.Name}
                                        email={u.Email} 
                                        hashPw={u.HashPW} 
                                        salt={u.Salt} 
                                        isAdmin={u.IsAdmin} 
                                    />
                                );
                            }
                        }
                    ))
                    : 
                    (
                        <p>No results</p>
                    )

                }
            </div>
        </div>
    );
}

export default SearchUsers;