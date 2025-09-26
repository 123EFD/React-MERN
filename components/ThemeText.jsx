import { Text, useColorScheme } from 'react-native'
import { Colors } from '../constants/Colors'

const ThemeText = ({ style, title = false, ...props}) => {
    const colorScheme = useColorScheme()
    const theme = Colors[colorScheme] ?? Colors.dark 
    const textColor = title ? theme.title : theme.text
    
    return (
        <Text
            style={[{color: textColor}, style]}
            {...props}
        />
    )
}


export default ThemeText
//title prop is false in default when user doesn't pass the title prop in, 
//this is to ensure the text color is different for title and normal text