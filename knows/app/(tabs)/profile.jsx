import { View, Text } from 'react-native'
import React from 'react'
import useAuthStore from '../../store/authStore.js'

export default function Profile () {
  const {user ,logout } = useAuthStore()

  const handleLogout = () => {
    logout()
  }

  return (
    <View>
      <Text>profile</Text>
      <Text>{user?.name}</Text>
      <Text>{user?.email}</Text>

      <Text onPress={handleLogout}>Logout</Text>
    </View>
  )
}
