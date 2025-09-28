import { createContext } from "react";
import { useState } from "react";
import { account } from "../lib/appwrite";
import { ID } from "react-native-appwrite";

export const UserContext = createContext();

//create, track and update userState(allow user login) using function
//Provider holds the userState, value and functions, so no need to pass props down manually at every level
export function UserProvider({ children }) {
    const [user, setUser] = useState(null)

    async function login(email, password) {
        try {
            await account.createEmailSession(email, password)
            const response = await account.get() //reach out the server and grabs the session object (user details)
            setUser(response) //update user state with the response object
        } catch (error) {
            console.log(error.message)
        }
    }

    async function register(email, password) {
        try {
            await account.create(ID.unique(), email, password)
            await login(email, password) //automatically log in the user after registration
        } catch (error) {
            console.log(error.message)
        }
    }

    async function logout() {

    }

    return (
        <UserContext.Provider value={{ user, login, register, logout }}>
            {children}
            
        </UserContext.Provider>
    )
}

/*wrap children with UserContext.Provider to provide context to all child components
UserProvider:Wraps children in UserContext.Provider.
Provides authentication functions (login, register, logout
*/