import React from "react";
import {Text, View, Button} from "react-native";

const Upload = ({navigation}) => {
  return (
    <View>
      <Text>Hello from Home screen</Text>
      <Button title = "Navigato the Home Screen" onPress={()=>navigation.navigate("Home")} />
    </View>
  );
};

export default Upload;