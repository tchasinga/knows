import { useState } from 'react'
import { View, Text } from 'react-native'

export default function Create() {

  const [title, setTitle] = useState('') 

  return (
    <View>
      <Text>create</Text>
    </View>
  )
}