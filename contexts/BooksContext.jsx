import { createContext, useEffect, useState} from "react";
import { databases ,client } from "../lib/appwrite";
import { ID, Permission, Role, Query } from "react-native-appwrite";
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
            const response = await databases.listDocuments(
                DATABASE_ID, 
                COLLECTION_ID,
                //query subsection of the book record
                [
                    Query.equal("userId", user.$id) //only fetch books created by the logged in user
                ]
            )

            //return all the books in an array by updating book state
            setBooks(response.documents);
            console.log(response.documents);
        } catch (error) {
            console.error(error.message);
        }
    }

    async function fetchBooksById(id) {
        try {
            const response =  await databases.getDocument(
                DATABASE_ID,
                COLLECTION_ID,
                //pass the book ID we want to fetch (params of the function)
                id
            ) //fetch single record

            return response 
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

    useEffect(() => {
        //real-time listener to listen to any changes in the book collection
        let unsubscribe
        //channel(identifier to service on the server we want to subcribe to such database events)
        // for subcribe path format in the books collections
        const channel = `databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents`
        if (user) {
            fetchBooks(); //fetch and update book state

            unsubscribe = client.subscribe(channel, (response) => {
                const {payload, events} = response //payload contain data associated with event such added or deleted book event
                
                //update the state current using payload and events, the first[0] event in the array is the create or delete etc.
                //to search the specific event, use includes() to input keyword
                if (events[0].includes('create')) {
                    //update book state using payload
                    setBooks((prevBooks) => [...prevBooks, payload])
                }
            }) 
        } else {
            setBooks([]) //clear book state when user log out
        }

        return() => {
            if (unsubscribe) unsubscribe() //clean up function to unsubscribe from the real-time listener
        }
    }, [user]) //when user log in(sub) or log out(unsub) , book will be fetch right away 

    //value specify objects to dif. properties (pass functions and state above)
    return (
        <BooksContext.Provider
            value={{books, fetchBooks, fetchBooksById, createBooks, deleteBooks}}
        >
            {children}
        </BooksContext.Provider>
    )
}