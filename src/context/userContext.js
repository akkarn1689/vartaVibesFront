// Pending

import { createContext, useState } from "react";

export const userContext = createContext();

export function UserAuthContextProvider({children}){
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <userContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
            {children}
        </userContext.Provider>
    )
}