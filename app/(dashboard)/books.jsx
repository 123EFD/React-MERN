import Spaces from "../../components/Spaces";
import ThemeText from "../../components/ThemeText";
import ThemeView from "../../components/ThemeView";
import { StyleSheet } from "react-native";

const Books = () => {
    return (
        <ThemeView style={styles.container}>

            <ThemeText title={true} style={styles.heading}>
                Your Knowledge Bookshelf
            </ThemeText>
            <Spaces/>

        </ThemeView>
    )
}

export default Books

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