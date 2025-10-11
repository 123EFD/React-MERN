import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export function useUser() {
    const context = useContext(UserContext); //GRAB the userprovider and pass into context var.
    
    if(!context) {
        throw new Error("useUser must be used within a UserProvider")
    }
    
    return context
}