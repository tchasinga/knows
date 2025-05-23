import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons.js'

// add tabs layout
export default function TabsLayout () {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name='index' options={{ title: 'Home' }} />
      <Tabs.Screen name='create' options={{ title: 'Create' }} />
      <Tabs.Screen name='profile' options={{ title: 'Profile' }} />
    </Tabs>
  )
}
