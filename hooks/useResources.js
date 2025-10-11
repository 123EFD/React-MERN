import { useContext } from "react";
import { ResourcesContext } from "../contexts/ResourcesContext";

export function useResources() {
     const context = useContext(ResourcesContext); //GRAB the userprovider and pass into context var.
        
        if(!context) {
            throw new Error("useResources must be used within a ResourcesProvider")
        }

        return context;
}