import Spaces from "../../components/Spaces";
import ThemeText from "../../components/ThemeText";
import ThemeView from "../../components/ThemeView";
import { StyleSheet, FlatList, Pressable } from "react-native";
import { useBooks } from "../../hooks/useBooks";
import ThemeCard from "../../components/ThemeCard";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";

const Books = () => {
    //bring book state from context
    const { books } = useBooks();
    const router = useRouter();
    return (
        <ThemeView style={styles.container} safe={true}>

            <ThemeText title={true} style={styles.heading}>
                Your Knowledge Bookshelf
            </ThemeText>
            <Spaces/>

            <FlatList
                data={books} //make list based on this data
                keyExtractor={(item) => item.$id} //unique key for each item in the book array
                contentContainerStyle={styles.list}
                renderItem={({item}) => (
                    <Pressable onPress={() => router.push(`/books/${item.$id}`)}> {/*redirect link to book details page*/}
                        <ThemeCard style={styles.card}>
                            <ThemeText style={styles.title}>{item.title}</ThemeText>
                            <ThemeText>Written by {item.author}</ThemeText>
                        </ThemeCard>
                    </Pressable>
                )} //returns template for eact item to access each individual books item
            />

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
    },
    list:{
        marginTop: 40,
    },
    card: {
        width:"90%",
        marginHorizontal: "5%",
        marginVertical: 10,
        padding: 10,
        paddingLeft: 14,
        borderLeftColor: Colors.primary,
        borderLeftWidth: 4
    },
    title: {
        fonstSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
})

//to access the book state from the book page ,output the book list using flatlist(natvie comp.)