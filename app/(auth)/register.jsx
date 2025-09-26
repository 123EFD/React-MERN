import {StyleSheet, Text} from 'react-native'
//import Spaces from '../components/Spaces'
import {Link} from 'expo-router'    
import ThemeText from '../../components/ThemeText'
import ThemeView from '../../components/ThemeView'
import Spaces from '../../components/Spaces'
import ThemeButton from '../../components/ThemeButton'

const Register = () => {

    const handleSubmit = () => {
        console.log('register')
    }

  return (
    <ThemeView style={styles.container}>

        <Spaces/>
        <ThemeText title={true} style={styles.title}>
            Register your account
        </ThemeText>

        <ThemeButton onPress={handleSubmit}>
            <Text style={{ color: '#590653' }}>Register</Text>
        </ThemeButton>

        <Spaces height={50}/>
        <Link href='/login'>
            <ThemeText style={{ textAlign:'center', fontSize: 16 }}>
                Don't have an account? Register
            </ThemeText>
        </Link>

    </ThemeView>
  )
}

export default Register

const styles = StyleSheet.create({
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