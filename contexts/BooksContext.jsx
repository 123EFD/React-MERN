import { createContext, useState} from "react";
import { databases  } from "../lib/appwrite";

const DATABASE_ID = "68da722d000f4209198d"
const COLLECTION_ID = "68da6c0a0011b4fff670"

export const BooksContext = createContext();

//provider function to manage all the state, destructure props arg. using children 
export function BooksProvider({ children }) {
    const [books, setBooks] = useState([]); //empty array since we're not fetching yet

    //fetch all the books
    async function fetchBooks() {
        try {
            
        } catch (error) {
            console.error(error.message);
        }
    }

    async function fetchBooksById(id) {
        try {
            
        } catch (error) {
            console.error(error.message);
        }
    }

    async function createBooks(data) {
        try {
            
        } catch (error) {
            console.error(error.message);
        }
    }

    async function deleteBooks(id) {
        try {
            
        } catch (error) {
            console.error(error.message);
        }
    }

    //value specify objects to dif. properties (pass functions and state above)
    return (
        <BooksContext.Provider
            value={{books, fetchBooks, fetchBooksById, createBooks, deleteBooks}}
        >
            {children}
        </BooksContext.Provider>
    )
}