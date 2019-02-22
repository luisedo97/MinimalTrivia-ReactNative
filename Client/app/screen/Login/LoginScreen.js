import React, { Component } from 'react';
import { Container, Content, Button, Text, Body, Input , Form, Item, Grid, Row} from 'native-base';
import {AsyncStorage,StyleSheet} from 'react-native';
import Utility from '../../util/Utility';


//const util = new Utility();

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password:''
        };
    }

    static navigationOptions = {
        headerStyle: {
            shadowOpacity: 0,
            shadowOffset: {
              height: 0
            },
            shadowRadius: 0,
            borderBottomWidth: 0,
            elevation: 0,
            backgroundColor: 'black',
        }
    };

    util = new Utility();

    loginUser = async () => {
        try {
            let config = {
                crossDomain: true,
                method: "POST",
                credential:'include',
                headers: {
                    "Content-Type": "application/json",
                    //"Cookie": await AsyncStorage('Cookie')
                },
                body: JSON.stringify({
                    username: this.state.username.toLowerCase(),
                    password: this.state.password.toLowerCase(),
                })
            }


            await fetch(this.util.getUrl('session'), config)
                .then((response)=>{
                    console.log(response.headers.map["set-cookie"]);    
                    AsyncStorage.setItem("Cookie", response.headers.map["set-cookie"]);
                    return response.json();
                })
                .then((response)=>{
                    console.log(response);
                    if(response.status === 200 ){
                        this.storeData(response.data);
                        this.props.navigation.navigate("Dashboard",{
                            nameUser:response.data.name
                        });
                    }else{
                        alert(JSON.stringify(response));
                    }
                })
        
        } catch (err) {
            //alert(err);
        }
    };

    storeData = async (data) => {
        try {
            await AsyncStorage.setItem('dataUser', JSON.stringify(data));
        } catch (error) {
            alert('Error while saving data :( Try it again...');
            alert(error)
        }
    }


    render() {
        
        return (
            <Container style={{backgroundColor:'black'}}>
                <Grid>
                    <Row size={5}/>
                    <Row size={20}>
                        <Text style={{
                            flex: 1,  
                            justifyContent: 'center', 
                            alignItems: 'center',
                            color: colorList.primary,
                            fontSize:75,
                            textAlign:'center',
                            fontFamily: 'Simplifica'}}>
                            Login
                        </Text>
                    </Row>
                    <Row size={30}>
                        <Form style={{color:'white',fontFamily:'Simplifica',flex: 1,  justifyContent: 'center', alignItems: 'center'}}>
                            <Item>
                            <Input placeholder="Username"
                                onChangeText={username => this.setState({ username })}
                                value={this.state.username} 
                                style={{color:'white',fontFamily:'Simplifica'}}/>
                            </Item>
                            <Item>
                            <Input placeholder="Password" 
                                onChangeText={password => this.setState({ password })}
                                value={this.state.password}
                                secureTextEntry={true}
                                style={{color:'white',fontFamily:'Simplifica'}}/>
                            </Item>
                        </Form>
                    </Row>
                    <Row size={25}>
                        <Button onPress={()=>this.loginUser()} style={styles.button}>
                            <Text style={styles.buttonText}>
                                Login
                            </Text>
                        </Button>    
                    </Row>
                    <Row size={20}/>
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
      fontSize:40,
      textAlign:'center',
      fontFamily: 'Simplifica',
    },
    buttonText:{
        color:colorList.secondary,
        fontFamily: 'Simplifica',
        fontSize:30
    },
  });

export default LoginScreen;