import React from 'react';
import { Asset, AppLoading } from 'expo';
import HomeScreen from './app/screen/Home/HomeScreen';
import LoginScreen from './app/screen/Login/LoginScreen';
import { createStackNavigator, createAppContainer } from "react-navigation";
import RegisterScreen from './app/screen/Register/RegisterScreen';
import DashboardScreen from './app/screen/Dashboard/DashboardScreen';
import GameScreen from './app/screen/Game/GameScreen'

export default class App extends React.Component {
  state = {
    isReady: false,
  };

  

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this.componentWillMount}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    return <AppContainer />;
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
  }

}

const RootStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        header: null
      }
    },
    Login: LoginScreen,
    Register: RegisterScreen,
    Dashboard: {
      screen: DashboardScreen,
      navigationOptions: {
        header: null
      }
    },
    Game:{
      screen: GameScreen,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: "Dashboard"
  }
);

const AppContainer = createAppContainer(RootStack);
