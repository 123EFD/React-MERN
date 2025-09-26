import { StyleSheet } from 'react-native'
import { Link } from 'expo-router';
import ThemeView from '../components/ThemeView'
import ThemeText from '../components/ThemeText';

const About = () => {

  return (
    <ThemeView style={styles.container}>
        
        <ThemeText style={styles.title}>About Page</ThemeText>
        
        <Link href="/" style={styles.link}>
            <ThemeText>Home</ThemeText>
        </Link>
    </ThemeView>

  )
}

export default About

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