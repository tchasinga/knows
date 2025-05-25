import { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import React from 'react'
import useAuthStore from '../../store/authStore.js'
import styles from '../../assets/styles/profile.styles.js'

export default function Profile () {
  const {user ,logout, token } = useAuthStore()
  const [loading, setLoading] = useState(false)
  const [refreshingc, setRefreshing] = useState(false)

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
