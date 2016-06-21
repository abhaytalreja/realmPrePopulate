/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 const Realm = require('realm');
 // require the module
var RNFS = require('react-native-fs');

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
let realm;

class Realm13 extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount(){
    RNFS.unlink(RNFS.DocumentDirectoryPath+"/default.realm.lock");
    RNFS.unlink(RNFS.DocumentDirectoryPath+"/default.realm.management");
    RNFS.unlink(RNFS.DocumentDirectoryPath+"/default.realm");
    RNFS.moveFile(RNFS.MainBundlePath+"/default.realm", RNFS.DocumentDirectoryPath+"/default.realm")
    .then((success) => {
      console.log('FILE WRITTEN!');
       // console.log(realm.path, RNFS.DocumentDirectoryPath);
       // return realm
       realm = new Realm({
        // path: 'newDefault.realm',
        schema: [{name: 'Dog', properties: {name: 'string'}}]
       });
       this.setState({realm: realm});
       return realm;
    })
    .catch((err) => {
      console.log(err.message);
    });
    this.state = {realm: realm};
  }
  renderNewComponent(){
    console.log(this.state.realm.path, RNFS.DocumentDirectoryPath);
    return (
      <Text style={styles.welcome}>
        Count of Dogs in Realm: {this.state.realm.objects('Dog').length};
      </Text>
      );
  }
   render() {

     // Realm.defaultPath = 'newDefault.realm';

     let renderComponent = this.state.realm != undefined ? this.renderNewComponent() : null;

     // let dogs = realmObj.objects('Dog');
     // let dog = dogs.slice(0, 1)[0];
     // console.log(dog);


     // realmObj.write(() => {
     //   realmObj.create('Dog', {name: 'Rex'});
     // });

     // realmObj.write(() => {
     //  dog.name = "John Snow";
     // });

     return (
       <View style={styles.container}>
         {renderComponent}
       </View>
     );
   }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Realm13', () => Realm13);
