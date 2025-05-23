import { Stack, useRouter, useSegments } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import SafeScreen from '../components/SafeScreen'
import { StatusBar } from 'expo-status-bar'
import useAuthStore from '../store/authStore.js'


export default function RootLayout () {
  const router = useRouter()
  const segments = useSegments()
  const {checkAuth ,user, token } = useAuthStore()

  // Check if user is logged in

  return (
    <SafeAreaProvider>
      <SafeScreen>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name='(auth)' options={{ title: 'Authentication' }} />
          <Stack.Screen name='(tabs)' options={{ title: 'Tabs' }} />
        </Stack>
      </SafeScreen>
      <StatusBar style='auto' />
    </SafeAreaProvider>
  )
}
