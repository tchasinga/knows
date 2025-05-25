import { useState } from 'react'
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native'
import styles from '../../assets/styles/signup.styles'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useRouter } from 'expo-router'
import useAuthStore from '../../store/authStore'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [gender, setGender] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { isLoading, register } = useAuthStore()

  const router = useRouter()

  const handleSignup = async () => {
    // Validate fields before submission
    if (!name.trim() || !email.trim() || !password.trim() || !gender.trim()) {
      Alert.alert('Please fill all fields', 'All fields are required to create an account.')
      return
    }

    // Basic email validation
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.')
      return
    }

    // Password strength check (optional)
    if (password.length < 8) {
      Alert.alert('Weak Password', 'Password should be at least 8 characters long.')
      return
    }

    try {
      const result = await register(name, email, password, gender)
      if (result.success) {
        Alert.alert(
          'Registration Successful',
          'You have successfully registered.',
          [{ text: 'OK',  }]
        )
      } else {
        Alert.alert('Registration Failed', result.message || 'An error occurred during registration.')
      }
    } catch (error) {
      console.error('Registration error:', error)
      Alert.alert('Error', 'Something went wrong. Please try again.')
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>Create an Account</Text>
            <Text style={styles.subtitle}>Sign up to get started</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Username</Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name='person-outline'
                size={24}
                color='black'
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder='Enter your username'
                value={name}
                onChangeText={setName}
                keyboardType='default'
                autoCapitalize='words'
                autoCorrect={false}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name='mail-outline'
                size={24}
                color='black'
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder='example@email.com'
                value={email}
                onChangeText={setEmail}
                keyboardType='email-address'
                autoCapitalize='none'
                autoComplete='email'
                autoCorrect={false}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name='lock-closed-outline'
                size={24}
                color='black'
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder='Enter your password'
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize='none'
                autoCorrect={false}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={24}
                  color='black'
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.passwordHint}>Use at least 8 characters</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Gender</Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name='person-outline'
                size={24}
                color='black'
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder='male/female/other'
                value={gender}
                onChangeText={setGender}
                keyboardType='default'
                autoCapitalize='none'
              />
            </View>
          </View>

          <TouchableOpacity
            style={[styles.button, isLoading && styles.disabledButton]}
            onPress={handleSignup}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            {isLoading ? (
              <ActivityIndicator size='small' color='#fff' />
            ) : (
              <Text style={styles.buttonText}>Sign Up</Text>
            )}
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.link}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}