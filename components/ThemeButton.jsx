import { Pressable, StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";
import ThemeText from "./ThemeText";

function ThemeButton({style, children, textStyle, ...props }) {
     // Detect if the direct children is a plain string or number
    const isPrimitive = typeof children === 'string' || typeof children === 'number';

    // props: onPress, children etc. (...props) and style
    return(
        <Pressable
            style={
                ({pressed}) => [
                    styles.btn, pressed && styles.pressed,style
                ]
            }
            {...props}
        >
            {isPrimitive ? (
                //wrap primitives in text 
                <ThemeText style={[styles.label, textStyle]}>{children}</ThemeText>
            ) : (
                //if it's ThemeText/>, <View/>, just render it
                children
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    btn:{
        backgroundColor: Colors.primary,
        padding: 18,
        borderRadius: 8,
        marginVertical: 10,
    },
    pressed:{
        opacity: 0.7,
    },
    label:{
        fontWeight: 'bold',
    },
});

export default ThemeButton