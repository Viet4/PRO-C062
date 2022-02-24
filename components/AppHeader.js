import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

class AppHeader extends React.Component{
  render(){
    return(
      <View style={styles.textContainer}>
        <Text style={styles.text}>SCHOOL ATTENDANCE</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textContainer:{
    backgroundColor: "skyblue"
  },
  text:{
    color: "white",
    padding: 15,
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center"
  }
});

export default AppHeader;