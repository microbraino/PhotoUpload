import React from "react";
import { Text, View, Button } from "react-native";

const Home = ({navigation}) => {
  return (
    <View>
      <Text>Hello from Home screen</Text>
      <Button title = "Navigato the Upload Screen" onPress={()=>navigation.navigate("Upload")} />
    </View>
  );
};

export default Home;
