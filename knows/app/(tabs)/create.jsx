import { useState } from 'react'
import { View, Text, Platform, KeyboardAvoidingView, ScrollView, TextInput } from 'react-native'
import { useRouter } from 'expo-router' 
import styles from '../../assets/styles/create.styles.js'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function Create() {

  const [title, setTitle] = useState('') 
  const [caption, setCaption] = useState('')
  const [ratinng, setRating] = useState(2)
  const [image, setImage] = useState(null)
  const [imageBase64, setImageBase64] = useState(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()


  const handleSubmit = async () => {}

  const handleImageUpload = async () => {}

  return (
    <KeyboardAvoidingView
         style={{ flex: 1 }}
         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
       >
      <ScrollView
        style={styles.scrollViewStyle}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <Text style={styles.title}>Create a new books post</Text>
          <Text style={styles.subtitle}>Share your thoughts and reviews</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
              <Text style={styles.label}>Title</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name='book-outline'
                  size={24}
                  color='black'
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder='Enter the book title'
                  value={title}
                  onChangeText={setTitle}
                  keyboardType='default'
                  autoCapitalize='none'
                />
              </View>
            </View>


        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}