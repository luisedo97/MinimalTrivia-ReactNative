import React, { Component } from 'react';
import { Text } from 'native-base';
import {AsyncStorage} from 'react-native';
import Utility from '../util/Utility';

class RankingComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ranking:'',
      playerScore:''
    };
  }

  util = new Utility();

  async componentWillMount() {
    try {
      let config = {
        crossDomain: true,
        method: "GET",
        credential:'include',
        headers: {
            "Content-Type": "application/json",
            "Cookie": await AsyncStorage.getItem('Cookie')
        },
        processData: false
      }
        await fetch(this.util.getUrl('Score'),config)
            .then((response)=>{
                return response.json();
            })
            .then((response)=>{
                //alert(JSON.stringify(response.status));
                if(response.status == 200 ){
                  this.setState({ranking:response.data});
                  this.setState({playerScore:response.data.yourScore});
                  AsyncStorage.setItem('score', JSON.stringify(response.data.yourScore), (err) => console.log(err));
                  console.log(this.state.ranking);
                  //this.storeData(response.data);
                  //this.props.navigation.navigate("Dashboard");
                }else{
                    //alert(JSON.stringify(response));
                }
            })
    } catch (err) {
        alert(err);
    }
  }

  render() {
    return (
      <Text>
        {JSON.stringify(this.state.ranking)}
      </Text>
    );
  }
}

export default RankingComponent;
