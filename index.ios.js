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

    RNFS.unlink(RNFS.DocumentDirectoryPath+"/default.realm");
     RNFS.unlink(RNFS.DocumentDirectoryPath+"/default.realm.lock");
     RNFS.unlink(RNFS.DocumentDirectoryPath+"/default.realm.management");

    // RNFS.unlink(RNFS.DocumentDirectoryPath+"/newDefault.realm");
     RNFS.moveFile(RNFS.MainBundlePath+"/default.realm", RNFS.DocumentDirectoryPath+"/default.realm")
      .then((success) => {
        console.log('FILE WRITTEN!');
        realm = new Realm({
          // path: 'newDefault.realm',
          schema: [{name: 'Dog', properties: {name: 'string'}}]
         });
         // console.log(realm.path, RNFS.DocumentDirectoryPath);
         return realm
      })
      .catch((err) => {
        console.log(err.message);
      });
  
    this.state = {};
  }
   render() {

     // Realm.defaultPath = 'newDefault.realm';

     realm = new Realm({
      // path: 'newDefault.realm',
      schema: [{name: 'Dog', properties: {name: 'string'}}]
     });
     console.log(realm.path, RNFS.DocumentDirectoryPath);

     // let dogs = realm.objects('Dog');
     // let dog = dogs.slice(0, 1)[0];
     // console.log(dog);


     // realm.write(() => {
     //   realm.create('Dog', {name: 'Rex'});
     // });

     // realm.write(() => {
     //  dog.name = "John Snow";
     // });

     return (
       <View style={styles.container}>
         <Text style={styles.welcome}>
           Count of Dogs in Realm: {realm.objects('Dog').length}
         </Text>
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
