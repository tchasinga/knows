import { create } from 'zustand'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'

const useAuthStore = create(set => ({
  user: null,
  token: null,
  isLoading: false,
  register: async (name, email, password, gender) => {
    set({ isLoading: true })
    try {
      const response = await fetch('http://localhost:8000/api/v1/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password, gender })
      })
      const data = await response.json()
      if (response.ok) {
        set({ user: data.user, token: data.token, isLoading: false })
        await AsyncStorage.setItem('user', JSON.stringify(data.user))
        await AsyncStorage.setItem('token', data.token)
        console.log('Registration successful:', data)

        return {
          success: true,
          message: 'Registration successful',
          user: data.user,
          token: data.token
        }
      } else {
        console.error('Registration failed:', data.message)
        set({ isLoading: false })
      }
    } catch (error) {
      set({ isLoading: false })
      return {
        success: false,
        message: 'Error during registration',
        error
      }
    }
  },

  checkAuth: async () => {
    try {
      const userJson = await AsyncStorage.getItem('user')
      const token = await AsyncStorage.getItem('token')

      const user = userJson ? JSON.parse(userJson) : null
      set({ user, token })
    } catch (error) {
      console.error('Error checking authentication:', error)
    }
  },

  logout: async () => {
    set({ user: null, token: null })
    await AsyncStorage.removeItem('user')
    await AsyncStorage.removeItem('token')
  },

  login: async (email, password) => {
    set({ isLoading: true })
    try {
      const response = await fetch('http://localhost:8000/api/v1/user/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })
      const data = await response.json()
      if (response.ok) {
        set({ user: data.user, token: data.token, isLoading: false })
        await AsyncStorage.setItem('user', JSON.stringify(data.user))
        Alert.alert('Login Successful', 'You have successfully logged in.', [
          {
            text: 'OK',
            onPress: () => {
              // Navigate to the home screen or perform any other action
            }
          }
        ])
        await AsyncStorage.setItem('token', data.token)
        console.log('Login successful:', data)
      } else {
        console.error('Login failed:', data.message)
        Alert.alert('Login Failed', data.message, [
          {
            text: 'OK',
            onPress: () => {
              // Handle the error
            }
          }
        ])
        set({ isLoading: false })
      }
    } catch (error) {
      console.error('Error during login:', error)
      set({ isLoading: false })
    }
  }
}))

export default useAuthStore
