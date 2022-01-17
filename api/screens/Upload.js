import React, {useCallback} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Button,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';

const captureImage = () => {
	const options = {
		title: 'Take Image',
		type: 'capture',
		options: {
		saveToPhotos: false,
		mediaType: 'photo',
		includeBase64: false,
		includeExtra:true,
		maxWidth:600,
		maxHeight: 600,
		},
	};
    launchCamera(options, (response)=>{
		if(!response.didCancel){
			response.assets.map(asset=>console.log(asset));
		}
		else{
			console.log(response.errorMessage) 
		}
	});
};

// const captureImage = async () => {
// 	console.log("taking picture");
//     const options = {
// 		title: 'Take Image',
// 		type: 'capture',
// 		options: {
// 		saveToPhotos: true,
// 		mediaType: 'photo',
// 		includeBase64: false,
// 		includeExtra,
// 		},
// 	};
//     let isCameraPermitted = await requestCameraPermission();
//     let isStoragePermitted = await requestExternalWritePermission();
//     if (isCameraPermitted && isStoragePermitted) {
//       launchCamera(options, (response) => {
//         console.log('Response = ', response);
//       });
//     }
//   };

const Upload = (navigation,selectedSession) => {
	const dispatch = useDispatch();
	const store = useSelector(state => state);
	console.log("selectedSession------------start");
	console.log(selectedSession);
	console.log("selectedSession------------end");
	return (
		<View style={styles.content}>
		<Text style={styles.uploadText}>Uploaded Documents</Text>
		<ScrollView horizontal={true} style={styles.carousel}>
			<Image
			style={styles.carouselImage}
			source={require('../assets/csp1.jpeg')}
			/>
			<Image
			style={styles.carouselImage}
			source={require('../assets/csp2.jpeg')}
			/>
			<Image
			style={styles.carouselImage}
			source={require('../assets/csp3.jpeg')}
			/>
			<Image
			style={styles.carouselImage}
			source={require('../assets/csp4.jpeg')}
			/>
			<Image
			style={styles.carouselImage}
			source={require('../assets/csp5.jpeg')}
			/>
		</ScrollView>
		<TouchableOpacity style={styles.addPhoto} onPress={() => captureImage()}>
			<Image
			style={styles.addPhotoIcon}
			source={require('../assets/create_session_icon.png')}
			/>
			<Text>Add Photo</Text>
		</TouchableOpacity>

		<View style={styles.buttonContainer}>
			<TouchableOpacity
			style={styles.button}
			activeOpacity={0.5}
			onPress={() => navigation.navigate("Home")}>
			<Image
				source={require('../assets/create_session_icon.png')}
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'white',
    height: 200,
    width: 200,
    borderWidth: 1,
    marginTop: 50,
  },
  content: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  carousel: {
    flexDirection: 'row',
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
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'black',
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
