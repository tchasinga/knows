import { useState } from 'react'
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput
} from 'react-native'
import styles from '../../assets/styles/signup.styles'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function Signup () {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [gender, setGender] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setLoading] = useState(false)


  const handleSignup = () => {}

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

        </View>
      </View>
    </KeyboardAvoidingView>
  )
}
