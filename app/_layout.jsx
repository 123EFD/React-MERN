import { Stack } from "expo-router"
import { useColorScheme } from "react-native"   
import {Colors} from '../constants/Colors'
import { StatusBar } from "expo-status-bar";
import { UserProvider } from "../contexts/UserContext";
import { BooksProvider } from "../contexts/BooksContext";

const RootLayout = () => {
    //set dark,light theme
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.dark //??: coalescing operator, left-side is default(null)
    
  return (
    <UserProvider>
      <BooksProvider>
          <StatusBar value='auto'/>
          <Stack screenOptions={{
              headerStyle: { backgroundColor: theme.navBackground },
              headerTintColor: theme.title,
              headerTitleStyle: { fontWeight: 'semibold' }
          }}>
              <Stack.Screen name="(auth)" options={{ headerShown: false }}></Stack.Screen> 

              <Stack.Screen name="(dashboard)" options={{ headerShown: false }}></Stack.Screen> 

              <Stack.Screen name="index" options={{title: 'Home'}}></Stack.Screen> 
              
          </Stack>
      </BooksProvider>
    </UserProvider>
  )
}

export default RootLayout


//_layout: expo-route will render the layout file 
//slot component: to tell the expo router where we want to output the page content within the layout
//When using <slot> we will the footer is fixed in same position on all pages
//Stack is a navigation component, it will handle the navigation between different pages (just like a "<-" back button in your PC website)
//<Stack> create a "section" which show the current page title and allow smooth transition between pages
//Stack.Screen (name="filename") help to customize the nav background design of each title section pages
//screenOptions: a global scope of options={}
//Statusbar: provides quick, at-a-glance information about a system, application, or window to the user, without requiring them to interrupt their current task