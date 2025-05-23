import { useState } from 'react'
import { View, Text } from 'react-native'

export default function Create() {

  const [title, setTitle] = useState('') 
  const [caption, setCaption] = useState('')
  const [ratinng, setRating] = useState(2)
  const [image, setImage] = useState(null)
  const [imageBase64, setImageBase64] = useState(null)
  const [loading, setLoading] = useState(false)

  return (
    <View>
      <Text>create</Text>
    </View>
  )
}