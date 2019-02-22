import React, { Component } from 'react';
import {StyleSheet,AsyncStorage} from 'react-native';
import {FooterTab,Button,Text, Footer,Container, Content, Grid,Row,Col} from 'native-base';
import DashboardContent from '../../components/DashboardComponent';
import StatsContent from '../../components/StatsComponent';
import Utility from '../../util/Utility';

class DashboardScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name:this.props.navigation.getParam('nameUser','again...')
    };

  }

  util = new Utility();

  render() {

    return (
        <Container style={styles.container}>
            <Grid>
              <Row size={10}/>
              <Row size={30}>
                <Text style={styles.title}>
                  {this.state.name}... Welcome
                </Text>
              </Row>
              <Row size={10}/>
              <Row size={15}>
                <Button block large padder style={styles.button} onPress={()=>this.props.navigation.navigate("Game")}>
                  <Text style={styles.buttonText}>
                    Play
                  </Text>
                </Button>
              </Row>  
              <Row size={15}>
                <Button block large padder style={styles.button} 
                  onPress={()=>this.props.navigation.navigate("Ranking")}>
                  <Text style={styles.buttonText}>
                    Ranking
                  </Text>
                </Button>
              </Row>
              <Row size={20}>
              </Row>    
            </Grid>
        </Container>
    );
  }
}

const colorList = {
  primary: 'white',
  secondary: 'black'
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:colorList.secondary,
    flex: 1,  justifyContent: 'center', alignItems: 'center'
  },
  button:{
    backgroundColor:colorList.primary,
    color:colorList.secondary,
    flex: 1,  justifyContent: 'center', alignItems: 'center'
  },
  title:{
    color: colorList.primary,
    fontSize:70,
    textAlign:'center',
    fontFamily: 'Simplifica',
  },
  buttonText:{
      color:colorList.secondary,
      fontFamily: 'Simplifica',
      fontSize:40
  }
});

export default DashboardScreen;
