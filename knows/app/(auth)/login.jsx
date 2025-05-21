import { View, Text, TextInput } from 'react-native'
import React from 'react'
import styles from '../../assets/styles/login.styles'
import { useState } from 'react'
import { Image } from 'expo-image'
import Ionicons from '../../node_modules/@expo/vector-icons/Ionicons.d';

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
       <View style={styles.formContainer}>
        {/* EMAIL */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={24} color="black" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>
       </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={24} color="black" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={24}
              color="black"
              onPress={() => setShowPassword(!showPassword)}
            />
          </View>
        </View>
      </View>
    </View>
  )
}
