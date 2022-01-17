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

const renderItem = (text) => {
  return (
    <View style={styles.listItem}>
      <Text style={styles.listItemTitle}>{text}</Text>
      <TouchableOpacity onPress={() => {}}>
        <Image
          source={require("../assets/edit_icon.png")}
          style={styles.listEditIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const Home = ({ navigation }) => {
	const dispatch = useDispatch();
	let data = useSelector((state) => state);
	let selectedSession = data[data.length - 1];
	
	const createSessionHandler = () => {
		const lastId = data.length > 0 ? data[data.length - 1].id : 0;
		const title = "Session " + String(lastId + 1) + " - " + dateFormatted();
		dispatch(actions.createSession(title));
		navigation.navigate("Upload", selectedSession);
	};

  return (
    <View style={styles.container}>
		<StatusBar />
			{data.length != 0 && (
				<FlatList
				data={data}
				renderItem={(itemData) => renderItem(itemData.item.title)}
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
			onPress={() => createSessionHandler()}
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
	sessionList: {
		flexDirection: "row",
		alignContent: "center",
	},
	header: {
		height: 30,
		paddingLeft: 20,
		fontSize: 18,
		borderBottomColor: "black",
		borderBottomWidth: 1,
		marginBottom: 20,
	},
	headerText: {
		fontSize: 18,
	},
	noSession: {
		flexDirection: "row",
		justifyContent: "center",
	},
	noSessionText: {
		fontSize: 24,
	},
	listItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		borderColor: "black",
		padding: 10,
		borderWidth: 1,
	},
	listEditIcon: {
		height: 25,
		width: 25,
	},
	listItemTitle: {},

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
