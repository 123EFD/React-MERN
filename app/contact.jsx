import { StyleSheet, Text, View,useColorScheme } from 'react-native'
import { Link } from 'expo-router';
import {Colors} from '../constants/Colors.js'

const Contact = () => {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.dark

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
        <Text style={styles.title}>Contact Page</Text>
        
        <Link href="/" style={styles.link}>Home</Link>
    </View>

    
  )
}

export default Contact

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
        color:'#E8B76D',
    }
})