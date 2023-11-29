// AppContext.js
import { createContext, useState } from 'react';

// Creating a context with a default value
const AppContext = createContext();

// Create a provider component
const AppProvider = ({ children }) => {

    const [loggedinUserDetails, setLoggedinUserDetails] = useState({});
    const [loginStatus, setLoginStatus] = useState(false);
    const [activeTab, setActiveTab] = useState("projects");
    const baseurl = "http://localhost:3001"

    return (
        <AppContext.Provider value={{ loggedinUserDetails, setLoggedinUserDetails, 
                                      loginStatus, setLoginStatus,
                                      activeTab, setActiveTab,
                                      baseurl}}>
            {children}
        </AppContext.Provider>
    );
};

export { AppProvider, AppContext };
