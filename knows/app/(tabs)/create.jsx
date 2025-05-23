import { useState } from 'react'
import { View, Text, Platform, KeyboardAvoidingView, ScrollView } from 'react-native'
import { useRouter } from 'expo-router' 
import styles from '../../assets/styles/create.styles.js'

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
      
      >

      </ScrollView>
    </KeyboardAvoidingView>
  )
}