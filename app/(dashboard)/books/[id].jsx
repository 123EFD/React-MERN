//dynamic routes for book page based on book id
//When access the book details, we need to access the ID of the book from the route(to use bookID to fetch the database)
import { StyleSheet} from 'react-native'
import { useLocalSearchParams } from 'expo-router'
//theme components
import ThemeView from '../../../components/ThemeView'
import ThemeText from '../../../components/ThemeText'
/*import ThemeButton from '../../../components/ThemeButton'
import Spaces from '../../../constants/Spaces'
import ThemeCard from '../../../components/ThemeCard'*/

const BooksDetails = () => {
    //inside the curly braces, any of the route parameter 
    // can be destructured within the routes(which matches the [id] in the file name)
    const { id } = useLocalSearchParams() 
  return (
    <ThemeView safe={true} style={styles.container}>
        <ThemeText>Book Details - {id}</ThemeText>
    </ThemeView>
  )
}

export default BooksDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
    },
})

//link to the page from each individual book inside the book list 