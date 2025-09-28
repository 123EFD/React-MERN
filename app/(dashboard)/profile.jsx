import Spaces from "../../components/Spaces";
import ThemeText from "../../components/ThemeText";
import ThemeView from "../../components/ThemeView";
import { StyleSheet, Text } from "react-native";
import { useUser } from "../../hooks/useUser";
import ThemeButton from "../../components/ThemeButton";

const Profile = () => {
    const { logout, user } = useUser() //to call the logout function from UserContext
    return (
        <ThemeView style={styles.container}>

            <ThemeText title={true} style={styles.heading}>
                {user.email}
            </ThemeText>
            <Spaces/>

            <ThemeText style={styles.quote}>Books are the destination and the journey</ThemeText>
            <Spaces/>

            <ThemeButton onPress={logout}>
                <Text style={{ color: '#590653' }}>Logout</Text>
            </ThemeButton>

        </ThemeView>
    )
}

export default Profile

const styles  =StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    heading:{
        fontWeight:'bold',
        fontSize: 20,
        textAlign: 'center',
    },
    quote:{
        fontFamily: 'cursive',
        textAlign: 'center',
        marginHorizontal: 20,
    }
})