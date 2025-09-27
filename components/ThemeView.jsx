import { View, useColorScheme } from 'react-native'
import {Colors}  from '../constants/Colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const ThemeView = ({style, safe=false, ...props}) => {
    const colorScheme = useColorScheme()
    const theme = Colors[colorScheme] ?? Colors.dark
    
    //if there's no safe prop, return normal view
    if (!safe) return (
      <View 
        style={[{backgroundColor: theme.background}, style]}
          {...props}
      />
    )

    //this hook returns the space of the content as properties such as top , bottom, left, right
    const insets = useSafeAreaInsets() 

    return (
      <View 
        style={[{
          backgroundColor: theme.background,
          paddingTop: insets.top, 
          paddingBottom: insets.bottom,
        }, 
        style]}
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
