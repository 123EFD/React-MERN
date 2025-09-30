import { StyleSheet,Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useBooks } from "../../hooks/useBooks";
import { useState } from "react";

//theme components
import ThemeView from "../../components/ThemeView";
import ThemeText from "../../components/ThemeText";
import ThemeButton from "../../components/ThemeButton";
import Spaces from "../../components/Spaces";
import ThemeTextInput from "../../components/ThemeTextInput";
import { useRouter } from "expo-router";

const Create = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const { createBooks } = useBooks(); //get createBooks function from context
    const router = useRouter();

    const handleSubmit = async () => {
        if (!title.trim() || !author.trim() || !description.trim()) return

        setLoading(true);
        
        await createBooks({ title, author, description }); //pass back the data

        //reset the form
        setTitle('');
        setAuthor('');
        setDescription('');

        //redirect
        router.replace('/books')

        //reset loading state
        setLoading(false);
    }

    return (      
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ThemeView style={styles.container}>

                <ThemeText title={true} style={styles.heading}>
                    Time to add new books to your shelf!
                </ThemeText>
                <Spaces/>

                <ThemeTextInput
                style={styles.input}
                placeholder="Book Title"
                value={title}
                onChangeText={setTitle}
                />
                <Spaces/>

                <ThemeTextInput
                style={styles.input}
                placeholder="Author"
                value={author}
                onChangeText={setAuthor}
                />
                <Spaces/>

                <ThemeTextInput
                style={styles.input}
                placeholder="Book Description"
                value={description}
                onChangeText={setDescription}
                multiline={true}
                />
                <Spaces/>

                <ThemeButton onPress={handleSubmit} disabled={loading}> 
                    <Text style={{ color: '#ED0593'}}>
                        {loading ? "Saving..." : "Create Book"} 
                    </Text>
                </ThemeButton>
        
            </ThemeView>
        </TouchableWithoutFeedback>
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
        fontSize: 18,
        textAlign: 'center',
    },
    input: {
        padding: 20,
        borderRadius: 6,
        alignSelf: 'stretch',
        marginerHorizontal: 40,
    },
    multiline: {
        padding: 20,
        borderRadius: 6,
        minHeight: 100,
        alignSelf: 'stretch',
        marginHorizontal: 40,
    },
})