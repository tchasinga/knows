import { Text, View, StyleSheet } from 'react-native'
import { Image } from 'expo-image'

export default function Index () {
  return (
    <View style={styles.Container}>

      <Image
        source={require('../assets/images/Bookshop-amico.png')}
        style={{ width: 250, height: 300 }}
        contentFit='contain'
        transition={1000}
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
