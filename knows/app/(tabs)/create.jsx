import { useState } from 'react'
import { View, Text } from 'react-native'

export default function Create() {

  const [title, setTitle] = useState('') 
  const [caption, setCaption] = useState('')
  const [ratinng, setRating] = useState(2)
  const [image, setImage] = useState(null)

  return (
    <View>
      <Text>create</Text>
    </View>
  )
}