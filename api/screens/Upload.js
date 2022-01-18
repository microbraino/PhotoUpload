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
import { launchCamera } from "react-native-image-picker";
import { useDispatch, useSelector } from "react-redux";

import * as actions from "../redux/actions";
import {
  saveToStorage,
  getFromStorage,
  requestCameraPermission,
} from "../utils/";

const fetchPhoto = (photos) => {
  return photos.map((photo) => (
    <Image
      key={Math.random()}
      style={styles.carouselImage}
      source={{ uri: `data:image/jpg;base64,${photo.base64}` }}
    />
  ));
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
      
        <ScrollView
          horizontal={true}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={200}
          decelerationRate="fast"
          pagingEnabled
          style={styles.carousel}
        >
          {fetchPhoto(store[id - 1].photos)}
        </ScrollView>
      <View style={styles.addPhotoContainer}>
        <TouchableOpacity
          style={styles.addPhoto}
          onPress={() => captureImage()}
        >
          <Image
            style={styles.addPhotoIcon}
            source={require("../assets/create_session_icon.png")}
          />
          <Text style={styles.addPhotoText}>Add Photo</Text>
        </TouchableOpacity>
      </View>

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
  addPhotoContainer: {
	  flexDirection:"column",
	  justifyContent:"center"
  },
  addPhotoIcon: {
    height: 50,
    width: 50,
  },
  addPhoto: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "white",
    height: 200,
    width: 200,
    borderWidth: 1,
    marginTop: 50,
  },
  addPhotoText:{
	fontSize: 16
  },
  content: {
    flexDirection: "column",
    justifyContent: "center",
	alignContent:"center",
  },
  carousel: {
    flexDirection: "row",
  },
  uploadText: {
	  fontSize:24,
  },
  carouselImage: {
    width: 300,
    flex: 1,
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
