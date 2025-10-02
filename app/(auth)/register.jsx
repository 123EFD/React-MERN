import {Keyboard, StyleSheet, Text, TouchableWithoutFeedback} from 'react-native'
//import Spaces from '../components/Spaces'
import {Link} from 'expo-router'    
import ThemeText from '../../components/ThemeText'
import ThemeView from '../../components/ThemeView'
import Spaces from '../../components/Spaces'
import ThemeButton from '../../components/ThemeButton'
import ThemeTextInput from '../../components/ThemeTextInput'
import { useState } from 'react'
import { useUser } from '../../hooks/useUser'
import { Colors } from '../../constants/Colors'

const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    //grab the user and the register function
    const { register } = useUser()

    const handleSubmit = async () => {
        setError(null)
        try {
            await register(email, password)
            
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    //dismiss the keyboard when click outside the input area
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
        <ThemeView style={styles.container}>

            <Spaces/>
            <ThemeText title={true} style={styles.title}>
                Register your account
            </ThemeText>

            <ThemeTextInput 
            style={{ width: '80%', marginBottom: 20 }}
            placeholder="Email" 
            keyboardType="email-address"
            onChangeText= {setEmail} //same as (text) => setEmail(text)
            value={email} //two-way data binding->if update email in elsewhere, it still update in the input form
            />

            <ThemeTextInput 
            style={{ width: '80%', marginBottom: 20 }}
            placeholder="Password" 
            onChangeText= {setPassword} //same as (text) => setEmail(text)
            value={password} //two-way data binding->if update email in elsewhere, it still update in the input form
            secureTextEntry //hide the password input using dots
            />

            <ThemeButton onPress={handleSubmit}>
                <Text style={{ color: '#590653' }}>Register</Text>
            </ThemeButton>

            <Spaces/>
            
            {error && <Text style={styles.error}>{error}</Text>}

            <Spaces height={50}/>
            <Link href='/login'>
                <ThemeText style={{ textAlign:'center', fontSize: 16 }}>
                    Don't have an account? Register
                </ThemeText>
            </Link>
        </ThemeView>
    </TouchableWithoutFeedback>
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
    },
    error:{
        color: Colors.warning,
        padding: 10,
        backgroundColor:'#FCC0DB',
        borderColor: Colors.warning,
        borderWidth: 1,
        borderRadius: 5,
        marginHorizontal: 10,
    }
})