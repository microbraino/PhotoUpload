import AsyncStorage from "@react-native-async-storage/async-storage";
import { PermissionsAndroid } from "react-native";

export const dateFormatted = ()=>{
    const date = new Date;
    const formatted = date.getDate() + 
    "." +(date.getMonth()+1)+
    "."+date.getFullYear()+
    "_"+
    date.getHours() + ":" +
    date.getMinutes() + ":" +
    date.getSeconds();
    return formatted;
}

export const saveToStorage = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.log(e);
    }
  };
  
  export const getFromStorage = async (key) => {
    try {
      const data = await AsyncStorage.getItem(key);
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  export const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera");
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };