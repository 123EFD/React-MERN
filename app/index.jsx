import {StyleSheet , Image} from 'react-native'
import { Link } from 'expo-router'

//ThemeView component
import ThemeView from '../components/ThemeView'
import ThemeText from '../components/ThemeText'
import Spaces from '../components/Spaces'

const Home = () => {
    
  return (
    <ThemeView style={styles.container}>
        <Image 
            source={require('../assets/img/bookshelf.png')}
            style={styles.img}
        />
        
        <Spaces/>
        <ThemeText style={styles.title} title={true}>
            Learning List App
        </ThemeText>
        <Spaces/>

        <Link href="/login" style={styles.link}>
            <ThemeText>Login</ThemeText>
        </Link>

        <Link href="/register" style={styles.link}>
            <ThemeText>Register</ThemeText>
        </Link>

        <Link href="/profile" style={styles.link}>
            <ThemeText>Profile</ThemeText>
        </Link>

    </ThemeView>
  )
}

export default Home

const styles = StyleSheet.create({
    //An object of CSS style
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title:{
        fontWeight:'bold',
        fontSize:20
    },
    img:{
        marginVertical:20,
        width:150,
        height:150,
    },
    link:{
        marginVertical:20,
        borderBottomWidth: 1,
        color:'#F5517F',
    }
})

//<Spaces> 's variable can be overwritten by stating <Spaces width={} height={} />