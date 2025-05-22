import { useEffect } from 'react'
import { View, StyleSheet, Text} from 'react-native'
import { Image } from 'expo-image'
import { Link } from 'expo-router'
import useAuthStore from '../store/authStore.js'

export default function Index () {

  const { user, token, checkAuth } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [])

  console.log('User:', user)
  console.log('Token:', token)

  return (
    <View style={styles.Container}>

      <Image
        source={require('../assets/images/Bookshop-amico.png')}
        style={{ width: 250, height: 300 }}
        contentFit='contain'
        transition={1000}
      />
      <Link href="/login">Login</Link>
      <Link href="/signup">Sign Up</Link>
      <Link href="/">Home</Link>
    </View>
  )
}

// adding a style
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
