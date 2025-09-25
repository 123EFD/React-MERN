import { StyleSheet, Text, View,useColorScheme } from 'react-native'
import { Link } from 'expo-router';
import {Colors} from '../constants/Colors'

const About = () => {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.dark

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
        
        <Text style={styles.title}>About Page</Text>
        
        <Link href="/" style={styles.link}>Home</Link>
    </View>

    
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
        color:'#E8B76D',
    }
})