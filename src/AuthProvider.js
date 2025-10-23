import {useContext, createContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(localStorage.getItem("site") || null);
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
                setUser(response.data);
                //setToken(response.data.token);
                localStorage.setItem("site", response.data);
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