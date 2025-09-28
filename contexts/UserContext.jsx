import { createContext, useEffect } from "react";
import { useState } from "react";
import { account } from "../lib/appwrite";
import { ID } from "react-native-appwrite";

export const UserContext = createContext();

//create, track and update userState(allow user login) using function
//Provider holds the userState, value and functions, so no need to pass props down manually at every level
export function UserProvider({ children }) {
    const [user, setUser] = useState(null)
    const [authChecked, setAuthChecked] = useState(false)

    async function login(email, password) {
        try {
            await account.createEmailPasswordSession(email, password)
            const response = await account.get() //reach out the server and grabs the session object (user details)
            setUser(response) //update user state with the response object
            console.log('has createEmailPasswordSession?', !!account.createEmailPasswordSession);
        } catch (error) {
            throw Error(error.message)
        }
    }

    async function register(email, password) {
        try {
            await account.create(ID.unique(), email, password)
            await login(email, password) //automatically log in the user after registration
        } catch (error) {
            throw Error(error.message)
        }
    }

    async function logout() { 
        await account.deleteSession('current') //delete the current session
        setUser(null) //reset user state to null
    }

    async function getInitialUserValue() {
        try {
            const response = await account.get()
            setUser(response)
        } catch (error) {
            setUser(null) //if error, set user to null
        } finally{
            setAuthChecked(true) //set authChecked to true after checking the user authentication status
        }
    }

    useEffect(() => {
        getInitialUserValue()
    }, [])
    
    return (
        <UserContext.Provider value={{ user, login, register, logout, authChecked }}>
            {children}
            
        </UserContext.Provider>
    )
}

/*wrap children with UserContext.Provider to provide context to all child components
UserProvider:Wraps children in UserContext.Provider.
Provides authentication functions (login, register, logout
*/