import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import AppHeader from "./components/AppHeader"
import HomeScreen from "./screens/HomeScreen";
import SummaryScreen from "./screens/SummaryScreen";

class App extends React.Component{
  render(){
    return(
      <View style={styles.container}>
        <AppHeader/>
        <AppContainer/>
      </View>
    );
  }
}

var AppNavigator = createSwitchNavigator({
  HomeScreen: HomeScreen,
  SummaryScreen: SummaryScreen
});

const AppContainer = createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "#d9f3ff"
  }
});

export default App;