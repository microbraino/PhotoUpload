import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	Image,
	FlatList,
	View,
} from "react-native";
import * as actions from "../redux/actions";
import { dateFormatted } from "../utils";



const Home = ({ navigation }) => {
	const dispatch = useDispatch();
	let data = useSelector((state) => state);

	const createSessionHandler = () => {
		const lastId = data.length > 0 ? data[data.length - 1].id : 0;
		const title = "Session " + String(lastId + 1) + " - " + dateFormatted();
		const titleId = lastId+1;
		dispatch(actions.createSession(title));
		navigation.navigate("Upload", {id:titleId})
	};

	
	const renderItem = (title, id) => {
	  return (
		<View style={styles.listItem}>
		  <Text style={styles.listItemTitle}>{title}</Text>
		  <TouchableOpacity onPress={()=>{
			  navigation.navigate("Upload", {id})
		  }}>
			<Image
			  source={require("../assets/edit_icon.png")}
			  style={styles.listEditIcon}
			/>
		  </TouchableOpacity>
		</View>
	  );
	};

  return (
    <View style={styles.container}>
		<StatusBar />
			{data.length != 0 && (
				<FlatList
				data={data}
				renderItem={(itemData) => renderItem(itemData.item.title,itemData.item.id)}
				/>
			)}
		{data.length == 0 && (
			<View style={styles.noSession}>
			<Text style={styles.noSessionText}>No session yet</Text>
			</View>
		)}

		<View style={styles.buttonContainer}>
			<TouchableOpacity
			style={styles.button}
			activeOpacity={0.5}
			onPress={createSessionHandler}
			>
				<Image
					source={require("../assets/create_session_icon.png")}
					style={styles.buttonIcon}
				/>
				<Text style={styles.buttonText}>Create Session</Text>
			</TouchableOpacity>
		</View>
    </View>
  );
};

const styles = StyleSheet.create({
	noSession: {
		flexDirection: "row",
		justifyContent: "center",
	},
	noSessionText: {
		fontSize: 24,
	},
	listItem: {
		backgroundColor: '#FFF',
		padding: 15,
		borderRadius: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 20,
	},
	listEditIcon: {
		height: 25,
		width: 25,
	},
	listItemTitle: {
		fontSize:16,
	},

	container: {
		justifyContent: "space-between",
		height: "100%",
	},

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

export default Home;
