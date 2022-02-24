import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import db from "../config";

export default class HomeScreen extends React.Component{
  constructor(){
    super();
    this.state={
      all_students: [],
      presentPressedList: [],
      absentPressedList: [],
    }
  }

  componentDidMount = async () => {
    var class_ref = await db.ref('/').on('value', data => {
      var all_students = [];
      var class_a = data.val();
      for (var i in class_a) {
        all_students.push(class_a[i]);
      }
      all_students.sort(function(a,b){
        return a.roll_no - b.roll_no;
      });
      this.setState({ all_students: all_students});
    });
  }

  updateAttendance(roll_no, status){
    var id = "";
    if (roll_no <= 9){
      id = "0" + roll_no;
    }
    else{
      id = roll_no;
    }

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }

    today = dd + "-" + mm + "-" + yyyy;
    var ref_path = id;
    var class_ref = db.ref(ref_path);
    class_ref.update({
      [today]: status
    });
  }
  
  render(){
    var all_students = this.state.all_students;
    if (all_students.length === 0){
      return(
        <View style={styles.noStudent}>
          <Text>YOU'RE TEACHING NO STUDENTS</Text>
        </View>
      );
    }

    return(
      <View style={{flex: 1}}>

        <View style={{flex: 3}}>
          {all_students.map((student, index) => (
            <View style={styles.studentChartContainer} key={index}>
              <View 
                key={"name" + index} 
                style={{flex: 1, flexDirection: "row"}}
              >
                <Text style ={{
                  fontSize: 15,
                  fontWeight: "bold",
                  marginLeft: 10
                }}>
                  {student.roll_no}.
                </Text>

                <Text style ={{
                  fontSize: 15,
                  fontWeight: "bold",
                  marginLeft: 20
                }}>
                  {student.name}
                </Text>
              </View>

              <View style={{flex: 1, flexDirection: "row"}}>

                <TouchableOpacity
                  style={
                    this.state.presentPressedList.includes(index)
                      ? [styles.present, {backgroundColor: "green"}]
                      : styles.present
                  }
                  onPress={()=>{
                    var presentPressedList = this.state.presentPressedList;
                    presentPressedList.push(index);
                    this.setState({presentPressedList: presentPressedList});
                    var roll_no = index + 1;
                    this.updateAttendance(roll_no, "present")
                  }}>
                    <Text>Present</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={
                    this.state.absentPressedList.includes(index)
                      ? [styles.absent, {backgroundColor: "red"}]
                      : styles.absent
                  }
                  onPress={()=>{
                    var absentPressedList = this.state.absentPressedList;
                    absentPressedList.push(index);
                    this.setState({absentPressedList: absentPressedList});
                    var roll_no = index + 1;
                    this.updateAttendance(roll_no, "absent")
                  }}>
                    <Text>Absent</Text>
                </TouchableOpacity>
                
              </View>
            </View>
          ))}
          
          <View style={{flex:1}}>
            <TouchableOpacity 
              style={styles.footer}
              onPress={() => {
                this.props.navigation.navigate("SummaryScreen")
              }}>
              <Text style={styles.submit}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  studentChartContainer:{
    flexDirection: "row",
    padding: 10,
    marginTop: 10,
    alignItems: "center"
  },
  present:{
    width: 80,
    height: 40,
    marginLeft: -30,
    //backgroundColor: presentColor1,
    borderRadius: 15,
    borderColor: "black",
    borderWidth: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  absent:{
    width: 80,
    height: 40,
    marginLeft: 20,
    //backgroundColor: absentColor1,
    borderRadius: 15,
    borderColor: "black",
    borderWidth: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  footer:{
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "orange",
    height: 50,
    marginTop: 10
  },
  submit:{
    padding: 10,
    fontSize: 20,
    fontWeight: "regular",
    textAlign: "center"
  },
  noStudent:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});