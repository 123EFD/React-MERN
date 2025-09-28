import { ActivityIndicator, useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";
import ThemeView from "./ThemeView";

const ThemeLoader = () => {
    const colorScheme = useColorScheme()
    const theme = Colors[colorScheme] ?? Colors.dark

    return(
        <ThemeView style={{
            flex: 1, 
            justifyContent: 'center', 
            alignItems: 'center'
        }}>
            <ActivityIndicator size="large" color={theme.iconColorFocused}></ActivityIndicator>
        </ThemeView>
    )
}

export default ThemeLoader;