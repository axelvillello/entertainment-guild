//Depreciated component

import { useAuth } from "./providers/AuthProvider";
import { useState, useEffect } from "react";
import { useSnackbar } from "./providers/SnackbarProvider";

const AdminPanel = () => {
    const sbar = useSnackbar();
    const auth = useAuth();
    const [adminWelcome, setWelcome] = useState();

    useEffect(() => {
        setWelcome(auth.user.Name);
        sbar.setSnackMsg('Welcome admin user ' + adminWelcome + '.', 'success');
    }, [adminWelcome]);

    return(
        <div style={{display: "flex", justifyContent:"center", alignItems:"center"}}>
            <h1></h1>
        </div>
    )
}

export default AdminPanel;