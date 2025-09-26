import {StyleSheet, Text} from 'react-native'
//import Spaces from '../components/Spaces'
import {Link} from 'expo-router'    
import ThemeText from '../../components/ThemeText'
import ThemeView from '../../components/ThemeView'
import Spaces from '../../components/Spaces'
import {Colors} from '../../constants/Colors'
import ThemeButton from '../../components/ThemeButton'


const Login = () => {

    const handleSubmit = () => {
        console.log('Login')
    }

  return (
    <ThemeView style={styles.container}>

        <Spaces/>
        <ThemeText title={true} style={styles.title}>
            Login your account
        </ThemeText>

        <ThemeButton onPress={handleSubmit}>
            <Text style={{ color: '#590653' }}>Login</Text>
        </ThemeButton>

        <Spaces height={50}/>
        <Link href='/register'>
            <ThemeText style={{ textAlign:'center' }}>
                Don't have an account? Register
            </ThemeText>
        </Link>

    </ThemeView>
  )
}

export default Login

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
    btn: {
        backgroundColor: Colors.primary,
        padding: 15,
        borderRadius: 10,
    },
    pressed: {
        opacity: 0.7
    }
})

//About pressable to make a button: () => ({}) pass a func by destructuring the pressed (boolean)
// props instead of passing argument
//For the pressed argu. in the pressed function create a hover effect when pressed is true