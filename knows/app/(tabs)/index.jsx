import { View, Text } from 'react-native'
import useAuthStore from '../../store/authStore.js'

export default function Index () {

  const { token } = useAuthStore()

  return (
    <View>
      <Text>index welcome page</Text>
    </View>
  )
}
