import { Text, View , StyleSheet} from "react-native";

export default function Index() {
  return (
    <View style={styles.Container}>
      <Text>To edit this screen... now</Text>
    </View>
  );
}


// adding a style
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
