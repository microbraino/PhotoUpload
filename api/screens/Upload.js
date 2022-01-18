import React, { useCallback } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  Button,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { PermissionsAndroid } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as actions from "../redux/actions";
import Carousel from "../components/Carousel";

const requestCameraPermission = async () => {
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

const saveToStorage = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(e);
  }
};

const getFromStorage = async (key) => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data;
  } catch (e) {
    console.log(e);
  }
};


const fetchPhoto = (photos) => {
  return photos.map((photo) => (
    <Image
      key={Math.random()}
      style={styles.carouselImage}
      source={{ uri: `data:image/jpg;base64,${photo.base64}` }}
    />
  ))
};


const Upload = ({ route, navigation }) => {
  const { id } = route.params;
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const captureImage = () => {
    const options = {
      title: "Take Image",
      type: "capture",
      includeBase64: true,
      saveToPhotos: false,
      mediaType: "photo",
      includeExtra: true,
      maxWidth: 600,
      maxHeight: 600,
    };
    requestCameraPermission();
    launchCamera(options, (response) => {
      if (!response.didCancel) {
        const asset = response.assets[0];
        dispatch(actions.addPhotoToSession(id, asset));
        saveToStorage(asset.id, asset.base64);
      } else {
        console.log(response.errorMessage);
      }
    });
  };

  return (
    <View style={styles.content}>
      <Text style={styles.uploadText}>Uploaded Documents</Text>
      <ScrollView horizontal={true} style={styles.carousel}>
        {
		  fetchPhoto(store[id-1].photos)
        }
      </ScrollView>
      <TouchableOpacity style={styles.addPhoto} onPress={() => captureImage()}>
        <Image
          style={styles.addPhotoIcon}
          source={require("../assets/create_session_icon.png")}
        />
        <Text>Add Photo</Text>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.5}
          onPress={() => navigation.navigate("Home")}
        >
          <Image
            source={require("../assets/create_session_icon.png")}
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>End Session</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  addPhotoIcon: {
    height: 50,
    width: 50,
  },
  addPhoto: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "white",
    height: 200,
    width: 200,
    borderWidth: 1,
    marginTop: 50,
  },
  content: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  carousel: {
    flexDirection: "row",
  },
  uploadText: {},
  carouselImage: {
    height: 200,
    width: 200,
  },

  endButton: {
    marginTop: 50,
  },
  ///button

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "black",
    margin: 5,
    padding: 5,
  },
  buttonIcon: {
    height: 25,
    width: 25,
  },
  buttonText: {
    marginLeft: 5,
  },
});
export default Upload;
