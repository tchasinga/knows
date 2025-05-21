import { View, Text } from 'react-native'
import React from 'react'
import styles from '../../assets/styles/login.styles'
import { useState } from 'react'
import { Image } from 'expo-image'

export default function Login () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLogin = () => {}

  return (
    <View style={styles.container}>
      <View style={styles.topIllustration}>
        <Image
          source={require('../../assets/images/Bookshop-amico.png')}
          style={styles.illustrationImage}
        />
      </View>
      {/* addinng form here for data collection */}
      <View style={styles.card}>
       <View style={styles.formContainer}></View>
      </View>
    </View>
  )
}
