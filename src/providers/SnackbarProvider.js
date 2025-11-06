import {useContext, createContext, useState} from "react";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const SnackbarContext = createContext();

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const SnackbarProvider = ({children}) => {
    const [snackbar, setSnackbar] = useState ({
        open: false,
        message: "",
        severity: "success",
    });

    const closeSnackbar = (event) => {
        setSnackbar({...snackbar, open: false});
    };

    const setSnackMsg = (msg, svrty) => {
        setSnackbar({
            open: true,
            message: msg,
            severity: svrty,
        })
    };
    const contextValue={
        setSnackMsg,
    }
    return(
        <SnackbarContext.Provider value={contextValue}>
            {children}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000} 
                onClose={closeSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={closeSnackbar}
                    variant="outlined"
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
};

export default SnackbarProvider;

export const useSnackbar = () => {
    return useContext(SnackbarContext);
};