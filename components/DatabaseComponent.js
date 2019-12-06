import React, {Component} from 'react';
import {View, StyleSheet, Platform, FlatList, TextInput, TouchableOpacity, Text} from 'react-native';
import {firebase} from '@react-native-firebase/database';
const iosConfig = {
  clientId: '1042326425623-otulir2r81s28f1d69dl8mmvamlu47nr.apps.googleusercontent.com',
  appId: '1:1042326425623:ios:d16630541a855320cd0c52',
  apiKey: 'AIzaSyDvE_vkfY9hlWXb0QykDqfNe3nHIR71pEs',
  databaseURL: 'https://fir-demo-b7395.firebaseio.com',
  storageBucket:'fir-demo-b7395.appspot.com',
  messagingSenderID: '1042326425623',
  projectId: 'fir-demo-b7395',
  //enable persitance by adding the below flag
  persitence: true
}

const androidConfig = {
  clientId: '1042326425623-otulir2r81s28f1d69dl8mmvamlu47nr.apps.googleusercontent.com',
  appId: '1:1042326425623:ios:d16630541a855320cd0c52',
  apiKey: 'AIzaSyDvE_vkfY9hlWXb0QykDqfNe3nHIR71pEs',
  databaseURL: 'https://fir-demo-b7395.firebaseio.com',
  storageBucket:'fir-demo-b7395.appspot.com',
  messagingSenderID: '1042326425623',
  projectId: 'fir-demo-b7395',
  //enable persitance by adding the below flag
  persitence: true
}
const animalApp = firebase.initializeApp(
  //use platform specific firebase config
  Platform.OS === 'ios' ? iosConfig : androidConfig,
  //name of this app
  'FirebaseDemo'
);

const rootRef = firebase.database().ref();
const animalRef = rootRef.child('animals')

export default class extends Component {
  constructor() {
    super();
    this.state = {
      animals: [],
      newAnimalName: '',
      loading: false
    };
  }

  componentDidMount(){
    animalRef.on('value', (childSnapshot) =>{
      const animals = [];
      childSnapshot.forEach((doc) => {
        animals.push({
          key: doc.key,
          animalName: doc.toJSON().animalName
        });
        this.setState({
          animals: animals
        })
      })
    })
  }

  onPressAdd = () => {
    if(this.state.newAnimalName.trim() === ''){
      alert('Animal name is blank');
      return;
    }
    animalRef.push({
      animalName: this.state.newAnimalName
    });
    this.setState({newAnimalName: ''})
  }
renderAnimalName(item){
  return(
    <View>
    <Text>{item.animalName}</Text></View>
  )

}
  render() {
    return (
      <View style={styles.container}>
        <View style={{padding: 10, flexDirection: 'row'}}>
          <TextInput style={{color: 'white', height: 40, width: 200, margin: 10, padding: 10, borderColor: 'white', borderWidth: 1}}
          onChangeText={(text) =>{
            this.setState({newAnimalName: text})
          }}
          value={this.state.newAnimalName}
          placeholder={'Enter animal name'}
          placeholderTextColor={'white'}/>
          <TouchableOpacity onPress={this.onPressAdd} style={{margin: 10, backgroundColor: 'blue', alignItem: 'center', justifyContent: 'center', padding: 10, borderRadius: 5}}>
          <Text style={{color: 'white'}}>{'Add'}</Text></TouchableOpacity>
            </View>
          <View style={{padding: 10}}>

          <FlatList
          data={this.state.animals}
          renderItem={({item}) => this.renderAnimalName(item)}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}/>
          </View>

      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    flex: 1,
  },
});
