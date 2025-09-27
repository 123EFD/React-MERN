import { Tabs } from "expo-router"
import { useColorScheme } from "react-native"
import {Colors} from "../../constants/Colors"

const DashboardLayout = () => {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.dark

  
  return (
    <Tabs
        screenOptions={{ headerShown: false, tabBarStyle: {
          backgroundColor: theme.navBackground,
          paddingTop: 10,
          height: 70,
        },
        tabBarActiveTintColor: theme.iconColorFocused,
        tabBarInactiveTintColor: theme.iconColor,
      }}
    >
      <Tabs.Screen 
      name="profile" 
      options={{ title:'Profile' }}
      />
       <Tabs.Screen 
      name="books" 
      options={{ title:'Books' }}
      />
       <Tabs.Screen 
      name="create" 
      options={{ title:'Create' }}
      />

    </Tabs>
  )
}

export default DashboardLayout