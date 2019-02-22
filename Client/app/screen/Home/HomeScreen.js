import React, { Component } from 'react';
import {FooterTab,Button,Text, Footer,Container, Content, Grid,Row,Col} from 'native-base';
import { StyleSheet } from 'react-native';

class HomeScreen extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
        };
    }

    render() {
        return (
            <Container style={styles.container}>
            <Grid>
              <Row size={10}/>
              <Row size={30}>
                <Text style={styles.title}>
                  Minimal Trivia
                </Text>
              </Row>
              <Row size={10}/>
              <Row size={15}>
                <Button block large padder style={styles.button} onPress={()=>this.props.navigation.navigate("Login")}>
                  <Text style={styles.buttonText}>
                    Login
                  </Text>
                </Button>
              </Row>  
              <Row size={15}>
                <Button block large padder style={styles.button} 
                  onPress={()=>this.props.navigation.navigate("Register")}>
                  <Text style={styles.buttonText}>
                    Register
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
      flex:1,
      alignItems: 'center',
      justifyContent: 'center'
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

export default HomeScreen;
