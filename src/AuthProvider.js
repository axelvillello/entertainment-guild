import {useContext, createContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem("site");
        return stored ? JSON.parse(stored) : null;  // parse JSON
    });
    //const [token, setToken] = useState(localStorage.getItem("site") || "");
    const navigate = useNavigate();

    const loginAction = async (data) => {
        try {
            const response = await axios.post("http://localhost:3001/login", 
                {username: data.username, password: data.password}, 
                {
                headers: {
                    "Accept": "application/json",
                },
                withCredentials: true,
            });
            if (response.data) {
                const loggedInUser = response.data;
                
                //GET all details of the logged in user
                const userDetailsResponse = await axios.get(`http://localhost:3001/api/inft3050/User/${loggedInUser.id}`,
                    {
                    headers: {
                    "Accept": "application/json",
                    },
                    withCredentials: true,
                });

                setUser(userDetailsResponse.data);
                //setToken(response.data.token);
                localStorage.setItem("site", JSON.stringify(userDetailsResponse.data));
                navigate("/");
                return;
            }
            throw new Error(response.message);
        }
        catch (err) {
            console.error(err);
        }
    };

    const logOut = () => {
        setUser(null);
        //setToken("");
        localStorage.removeItem("site");
        navigate("/");
    };

    return (
    <AuthContext.Provider value={{user, loginAction, logOut}}>
        {children}
    </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};