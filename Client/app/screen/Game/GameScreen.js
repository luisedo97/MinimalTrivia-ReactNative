import React, { Component } from 'react';

class GameScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        bufferQuiz:[]
        ,
        isReady: ()=>{
            if(this.state.bufferQuiz.length == 0)
                return false;
            else
                return true;
        },
    };
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this.componentWillMount}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        /> //Pantalla de carga
      );
    }

    return <AppContainer />;
  }
}

export default GameScreen;
