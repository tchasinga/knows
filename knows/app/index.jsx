import { Text, View, StyleSheet } from 'react-native'
import { Image } from 'expo-image'

export default function Index () {
  return (
    <View style={styles.Container}>
      <Text>To edit this screen... now</Text>
      <Image
        source={{ uri: 'https://storyset.com/illustration/bookshop/rafiki' }}
        style={{ width: 150, height: 150 }}
      />
    </View>
  )
}

// adding a style
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
