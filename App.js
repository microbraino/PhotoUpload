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
import { Provider } from "react-redux";

import API from "./api";
import {store} from './api/redux/store';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <API />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({});

export default App;
