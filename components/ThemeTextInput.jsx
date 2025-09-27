import {TextInput, useColorScheme} from 'react-native'
import { Colors } from '../constants/Colors';

export const ThemeTextInput = ({ style, ...props }) => {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.dark;

    return (
        <TextInput
            style={[
                {
                    backgroundColor: theme.iconColorFocused,
                    color:'#FAB1AA',
                    padding: 10,
                    borderRadius: 5,
                },
                style,
            ]}
            {...props}
        />
    );
};

export default ThemeTextInput;