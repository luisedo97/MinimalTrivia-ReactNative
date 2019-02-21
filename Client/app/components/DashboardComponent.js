import React, { Component } from 'react';
import {Text, Button, Container, Footer} from 'native-base';

class DashboardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  startGame()
  {
    this.props.navigation.navigate("Game");
  }

  render() {
    return (
      <Button onPress={()=>this.startGame()}>
        <Text>Play game</Text>
      </Button>
    );
  }

}

export default DashboardComponent;