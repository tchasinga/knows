import { View, Text } from 'react-native'
import React from 'react'
import styles from '../../assets/styles/login.styles.js'
import { useState } from 'react'

export default function login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

const handleLogin = () => {
}

  return (
    <View>
      <Text>login</Text>
    </View>
  )
}