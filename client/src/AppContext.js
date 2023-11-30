// AppContext.js
import { createContext, useState } from 'react';

// Creating a context with a default value
const AppContext = createContext();

// Create a provider component
const AppProvider = ({ children }) => {

    const [loggedinUserDetails, setLoggedinUserDetails] = useState({});
    const [loginStatus, setLoginStatus] = useState(false);
    const [activeTab, setActiveTab] = useState("login");
    // const baseurl = "http://localhost:3001"
    const baseurl = "http://ec2-18-206-41-127.compute-1.amazonaws.com:3001"

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
