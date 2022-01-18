/**
 * Photo Upload
 * React Native Redux App
 * https://github.com/microbraino/PhotoUpload.git
 *
 * @format
 * @flow strict-local
 */

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Provider, useDispatch } from "react-redux";

import API from "./api";
import { store } from "./api/redux/store";
import { getFromStorage, saveToStorage } from "./api/utils/";

class App extends React.Component {
  componentDidMount() {
    getFromStorage("persist_state").then((response) => {
      //dispatch(actions.initState(response));
      //console.log("state restored from  perminent storage:", response);
    });
  }

  render() {
    store.subscribe(() => {
      saveToStorage("persist_state", store.getState());
      // getFromStorage("persist_state").then((response) => {
      //   console.log("state saved to perminent:", response);
      // });
    });
    return (
      <Provider store={store}>
        <API />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({});

export default App;
