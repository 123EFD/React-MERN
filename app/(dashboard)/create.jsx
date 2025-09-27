import Spaces from "../../components/Spaces";
import ThemeText from "../../components/ThemeText";
import ThemeView from "../../components/ThemeView";
import { StyleSheet } from "react-native";

const Create = () => {
    return (
        <ThemeView style={styles.container}>

            <ThemeText title={true} style={styles.heading}>
                Time to add new books to your shelf!
            </ThemeText>
            <Spaces/>

        </ThemeView>
    )
}

export default Create

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
    }
})