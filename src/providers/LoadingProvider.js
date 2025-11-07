//Provider component for loading icon
//WRITTEN BY: Axel Ello

import {useContext, createContext, useState} from "react";

const LoadingContext = createContext();

const LoadingProvider = ({children}) => {
    const [loadingProg, setLoadingProg] = useState (false);

    const setLoadingStatus = (status) => {setLoadingProg(status)};

    return(
        <LoadingContext.Provider value={{loadingProg, setLoadingStatus}}>
            {children}
        </LoadingContext.Provider>
    );
};

export default LoadingProvider;

export const useLoading = () => {
    return useContext(LoadingContext);
};