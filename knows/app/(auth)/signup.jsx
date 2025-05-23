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

export default function Signup () {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [gender, setGender] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { user, token, isLoading, register } = useAuthStore()

  const router = useRouter()

  // check if fields are empty
  if (!name || !email || !password || !gender) {
    Alert.alert('Missing Fields', 'Please fill in all fields.')
  }

  const handleSignup = async () => {
    const result = await register(name, email, password, gender)
    if (result.success) {
      console.log('Registration successful:', result)
      Alert.alert(
        'Registration Successful',
        'You have successfully registered.',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
      )
      // Navigate to the home screen or show a success message
    } else {
      console.error('Registration failed:', result.message)
      Alert.alert('Registration Failed', result.message, [
        { text: 'OK', onPress: () => console.log('OK Pressed') }
      ])
      // Show an error message to the user
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>Create an Account</Text>
            <Text style={styles.subtitle}>Sign up to get started</Text>
          </View>

          <View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>user name</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name='person-outline'
                  size={24}
                  color='black'
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder='Enter your user name'
                  value={name}
                  onChangeText={setName}
                  keyboardType='default'
                  autoCapitalize='none'
                />
              </View>
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
                placeholder='tchasinga@example.com'
                value={email}
                onChangeText={setEmail}
                keyboardType='email-address'
                autoCapitalize='none'
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
              />
              <Ionicons
                name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                size={24}
                color='black'
                onPress={() => setShowPassword(!showPassword)}
              />
            </View>
          </View>

          {/* adding a gender */}
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
                placeholder='Enter your gender'
                value={gender}
                onChangeText={setGender}
                keyboardType='default'
                autoCapitalize='none'
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleSignup}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size='small' color='#fff' />
            ) : (
              <Text style={styles.buttonText}>Sign Up</Text>
            )}
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.back('/index')}>
              <Text style={styles.link}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}
