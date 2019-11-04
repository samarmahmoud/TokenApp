import React, {Component} from 'react';
import {StyleSheet, View, Text, Platform, Clipboard,TouchableOpacity} from 'react-native';
import RNFirebase from 'react-native-firebase';

const configurationOptions = {
  debug: true,
  promptOnMissingPlayServices: true,
};
const firebase = RNFirebase.initializeApp(configurationOptions);

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      mobileData:{}
    }
  }

 set_Text_Into_Clipboard = async () => {
    await Clipboard.setString(this.state.mobileData.device_token);
  }
  componentDidMount = () => {
   
    firebase.messaging().getToken().then((token) => {
       this._onChangeToken(token)
    });

    firebase.messaging().onTokenRefresh((token) => {
        this._onChangeToken(token)
    });
  }
  _onChangeToken = (token) => {
    let data = {
      'device_token': token,
      'device_type': Platform.OS,
    };
    this.setState({mobileData:data})
  
  }
  
  render() {
    return (
      <View style={styles.continer}>
       <TouchableOpacity style={{margin:5,width:'90%'}}
       onPress={()=>this.set_Text_Into_Clipboard()}>
        <Text style={{margin:5,width:'90%'}}>{this.state.mobileData.device_token}</Text>
        </TouchableOpacity>
        <Text style={{margin:5,width:'90%'}}>{"device_type : "+this.state.mobileData.device_type}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  continer: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
