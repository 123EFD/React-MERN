import { Tabs } from "expo-router"
import { useColorScheme } from "react-native"
import {Colors} from "../../constants/Colors"
import { Ionicons } from '@expo/vector-icons';
import UserOnly from "../../components/auth/UserOnly";

const DashboardLayout = () => {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.dark

  
  return (
    <UserOnly>
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
        options={{ title:'Profile', tabBarIcon: ({ focused }) => ( //focused is true when the tab is active
          <Ionicons
              size={24}
              name={focused ? "person" : "person-outline"} //icon you desired to use, using ternary operator 
              color={focused ? theme.iconColorFocused : theme.iconColor} //change color based on active/inactive state
          />
        ) }}
        />
        <Tabs.Screen 
        name="books" 
        options={{ title:'Books', tabBarIcon: ({ focused }) => (
          <Ionicons
              size={24}
              name={focused ? "book" : "book-outline"} //icon you desired to use, using ternary operator 
              color={focused ? theme.iconColorFocused : theme.iconColor} //change color based on active/inactive state
          />
        ) }}
        />
        <Tabs.Screen 
        name="create" 
        options={{ title:'Create', tabBarIcon: ({focused}) => (
          <Ionicons
              size={24}
              name={focused ? "create" : "create-outline"} //icon you desired to use, using ternary operator 
              color={focused ? theme.iconColorFocused : theme.iconColor} //change color based on active/inactive state
          />
        ) }}
        />
        <Tabs.Screen 
          name="books/[id]" 
          options={{ href: null}} //hides the tab for dynamic route
        />

        <Tabs.Screen
          name="Charts/ProgressLineChart"
          options={{ title: 'Progress Chart'}}
        />

      </Tabs>
    </UserOnly>
  )
}

export default DashboardLayout