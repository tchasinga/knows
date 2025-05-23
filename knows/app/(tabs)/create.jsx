import { useState } from 'react'
import {
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  TouchableOpacity
} from 'react-native'
import { useRouter } from 'expo-router'
import styles from '../../assets/styles/create.styles.js'
import Ionicons from '@expo/vector-icons/Ionicons'
import COLORS from '../../constant/colors'
import { Image } from 'expo-image'

export default function Create () {
  const [title, setTitle] = useState('')
  const [caption, setCaption] = useState('')
  const [rating, setRating] = useState(2)
  const [image, setImage] = useState(null)
  const [imageBase64, setImageBase64] = useState(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async () => {}

  const handleImageUpload = async () => {}

  const renderRatingPicker = async () => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity
        key={i}
        onPress={() => setRating(i)}
        style={styles.starButton}
        >
          <Ionicons
            name={i <= rating ? 'star' : 'star-outline'}
            size={24}
            color={i <= rating ? "#f4b400" : COLORS.textSecondary}
          />
        </TouchableOpacity>
      )
    }
    return <View style={styles.ratingContainer}>{stars}</View>
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.scrollViewStyle}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps='handled'
      >
        <View style={styles.card}>
          <Text style={styles.title}>Create a new books post</Text>
          <Text style={styles.subtitle}>Share your thoughts and reviews</Text>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Book Title</Text>
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

           <View style={styles.inputGroup}>
             <Text style={styles.label}>Pick rating</Text>
             {renderRatingPicker()}
           </View>

           {/* Image Picker */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Upload Image</Text>
             
            </View>

          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
