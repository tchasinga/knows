import { View, Text, KeyboardAvoidingView, Platform } from 'react-native'
import React from 'react'
import styles from '../../assets/styles/signup.styles'

export default function signup() {
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

        <View style={styles.formContainer}>
          
        </View>
       </View>
     </View>
    </KeyboardAvoidingView>
  )
}