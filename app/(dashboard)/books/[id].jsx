//dynamic routes for book page based on book id
//When access the book details, we need to access the ID of the book from the route(to use bookID to fetch the database)
import { StyleSheet, Text} from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useState, useEffect } from 'react'
import { useBooks } from '../../../hooks/useBooks'
//theme components
import ThemeView from '../../../components/ThemeView'
import ThemeText from '../../../components/ThemeText'
import ThemeCard from '../../../components/ThemeCard'
import ThemeLoader from '../../../components/ThemeLoader'
import Spaces from '../../../components/Spaces'
import ThemeButton from '../../../components/ThemeButton'
import { Colors } from '../../../constants/Colors'

const BooksDetails = () => {
  const [books, setBooks] = useState(null)

    //inside the curly braces, any of the route parameter 
    // can be destructured within the routes(which matches the [id] in the file name)
    const { id } = useLocalSearchParams() 

    const { fetchBooksById, deleteBooks } = useBooks() //from the BooksContext

    const router = useRouter()

    const handleDelete = async () => {
      await deleteBooks(id)
      setBooks(null)
      router.push('/books') //redirect to book list after delete
    }

    //useEffect to run the first loads component and when the ID value changes 
    useEffect(() => {
          //fetch book needed
          async function loadBook() {
            const bookData = await fetchBooksById(id)
            setBooks(bookData) //update the book state     
          }

          loadBook()
    }, [id])
  
    //If the book is null, we will show the loader. If have, it will rerender and show the book page
    if (!books) {
      return (
        <ThemeView safe={true} style={styles.container}>
          <ThemeLoader/>
        </ThemeView>
      )
    }

  return (
    <ThemeView safe={true} style={styles.container}>
      <ThemeCard style={styles.card}>
        <ThemeText style={styles.title}>{books.title}</ThemeText>
        <ThemeText>Written by {books.author}</ThemeText>
        <Spaces/>

        <ThemeText title={true}>Book description:</ThemeText>
        <Spaces height={10}/>

        <ThemeText>{books.description}</ThemeText>
      </ThemeCard>

      <ThemeButton style={styles.delete} onPress={handleDelete}>
        <Text style={{color: '#6B0106', textAlign: 'center', fontSize: 15}}>Delete Books</Text>
      </ThemeButton>
    </ThemeView>
  )
}

export default BooksDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
    },
    title: {
      fontSize: 24,
      marginVertical: 10,
    },
    card: {
      margin: 20,
    },
    delete: {
      marginTop: 'auto',
      backgroundColor: Colors.warning,
      width: '90%',
      alignSelf: 'center',
    }
})

//link to the page from each individual book inside the book list 