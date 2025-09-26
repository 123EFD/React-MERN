import { View, useColorScheme } from 'react-native'
import {Colors}  from '../constants/Colors'

const ThemeView = ({style, ...props}) => {
    const colorScheme = useColorScheme()
    const theme = Colors[colorScheme] ?? Colors.dark

  return (
    <View 
      style={[{backgroundColor: theme.background}, style]}
        {...props}
    />
  )
}

export default ThemeView


//const ... = (props) => {} is property, can create a single comp. that can used repeatedly (props.name ->Object)
//...(spread) helps to add other props without explicitly defining them all
//using {} to destructure the props object
//nested content is called children (but actually it is a default prop so just self closing the <View/> only )
//When we use this themeview component anywhere, the content that nested inside that will be output at children component