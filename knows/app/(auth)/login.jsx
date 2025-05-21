import { View, Text } from 'react-native'
import React from 'react'
import styles from '../../assets/styles/login.styles'
import { useState } from 'react'

export default function login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)


  return (
    <View>
      <Text>login</Text>
    </View>
  )
}