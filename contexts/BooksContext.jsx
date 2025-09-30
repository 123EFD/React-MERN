import { createContext, useState} from "react";
import { databases  } from "../lib/appwrite";
import { ID, Permission, Role } from "react-native-appwrite";
import { useUser } from "../hooks/useUser";

const DATABASE_ID = "68da6c0a0011b4fff670"
const COLLECTION_ID = "68da722d000f4209198d"

export const BooksContext = createContext();

//provider function to manage all the state, destructure props arg. using children 
export function BooksProvider({ children }) {
    const [books, setBooks] = useState([]); //empty array since we're not fetching yet
    const { user } = useUser() //to detect the user logged in

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
        //save new record to the collection database
        //spread operator to get all the data from the form, add userId to link book to user
        //data contains the properties: title, author, description... using spread operator to get all
        try {
            const newBook = await databases.createDocument(
                DATABASE_ID, 
                COLLECTION_ID, 
                ID.unique(), 
                {...data, userId: user.$id},
                [
                    Permission.read(Role.user(user.$id)), //only user can read
                    Permission.update(Role.user(user.$id)),
                    Permission.delete(Role.user(user.$id)), 
                ]
            ) 
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