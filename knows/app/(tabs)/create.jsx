import { useState, useCallback } from 'react'
import {
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from 'react-native'
import { useRouter } from 'expo-router'
import styles from '../../assets/styles/create.styles.js'
import Ionicons from '@expo/vector-icons/Ionicons'
import COLORS from '../../constant/colors'
import { Image } from 'expo-image'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import useAuthStore from '../../store/authStore.js'

export default function Create() {
  const [title, setTitle] = useState('')
  const [caption, setCaption] = useState('')
  const [rating, setRating] = useState(2)
  const [image, setImage] = useState(null)
  const [imageBase64, setImageBase64] = useState(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { token } = useAuthStore()

  const handleSubmit = async () => {
    if (!title || !caption || !image) {
      Alert.alert('Error', 'Please fill in all fields.')
      return
    }
    
    try {
      setLoading(true)
      // get file extension from uri or default to jpeg
      const uriParts = image.split('.')
      const fileType = uriParts[uriParts.length - 1]
      const imageType = fileType ? `image/${fileType.toLowerCase()}` : 'image/jpeg'

      const imageDataUrl = `data:${imageType};base64,${imageBase64}`

      const response = await fetch(
        'http://localhost:8000/api/v2/book',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            title,
            caption,
            rating,
            image: imageBase64
          })
        }
      )
      const data = await response.json()
      if (response.ok) {
        Alert.alert('Success', 'Book posted successfully!')
        router.push('/(tabs)')
      } else {
        Alert.alert('Error', data.message || 'Something went wrong.')
      }
    } catch (error) {
      console.error('Error:', error)
      Alert.alert('Error', 'Something went wrong while posting the book.')        
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async () => {
    try {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== 'granted') {
          Alert.alert(
            'Sorry, we need media library permissions to make this work!'
          )
          return
        }
      }
      
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
        base64: true
      })

      if (!result.canceled) {
        setImage(result.assets[0].uri)
        setImageBase64(result.assets[0].base64 || await FileSystem.readAsStringAsync(
          result.assets[0].uri,
          { encoding: FileSystem.EncodingType.Base64 }
        ))
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while uploading the image.')
    }
  }

  const renderRatingPicker = useCallback(() => {
    return (
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((i) => (
          <TouchableOpacity
            key={i}
            onPress={() => setRating(i)}
            style={styles.starButton}
          >
            <Ionicons
              name={i <= rating ? 'star' : 'star-outline'}
              size={24}
              color={i <= rating ? '#f4b400' : COLORS.textSecondary}
            />
          </TouchableOpacity>
        ))}
      </View>
    )
  }, [rating])

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <Text style={styles.title}>Create a new books post</Text>
          <Text style={styles.subtitle}>Share your thoughts and reviews</Text>

          <View style={styles.form}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Book Title</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="book-outline"
                  size={24}
                  color="black"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter the book title"
                  value={title}
                  onChangeText={setTitle}
                  keyboardType="default"
                  autoCapitalize="none"
                  returnKeyType="next"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Pick rating</Text>
              {renderRatingPicker()}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Upload Image</Text>
              <TouchableOpacity
                style={styles.imagePicker}
                onPress={handleImageUpload}
              >
                {image ? (
                  <Image source={{ uri: image }} style={styles.previewImage} />
                ) : (
                  <View style={styles.placeholderContainer}>
                    <Ionicons
                      name="image-outline"
                      size={24}
                      color={COLORS.textSecondary}
                      style={styles.placeholderIcon}
                    />
                    <Text style={styles.placeholderText}>Select an image</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Book description</Text>
              <TextInput
                style={styles.textArea}
                placeholder="Enter the book description"
                value={caption}
                onChangeText={setCaption}
                keyboardType="default"
                autoCapitalize="none"
                multiline
                returnKeyType="done"
              />
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons
                    name="cloud-upload-outline"
                    size={24}
                    color="white"
                    style={styles.buttonIcon}
                  />
                  <Text style={styles.buttonText}>Post a book</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}