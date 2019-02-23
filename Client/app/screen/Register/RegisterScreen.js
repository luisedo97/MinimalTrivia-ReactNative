import React, { Component } from 'react';
import { Container, Content, Button, Text, Body, Input , Form, Item, Grid, Row} from 'native-base';
import {AsyncStorage,StyleSheet} from 'react-native';
import { registerTaskAsync } from 'expo-background-fetch';
import Utility from '../../util/Utility';

class RegisterScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            username: '',
            password: '',
            email: '',
        };
    }

    util = new Utility();

    static navigationOptions = {
        headerStyle: {
            shadowOpacity: 0,
            shadowOffset: {
            height: 0
            },
            shadowRadius: 0,
            borderBottomWidth: 0,
            elevation: 0,
            backgroundColor:'black',
            color:'white'
        }
    };

    registerUser = async () => {
        try {
            let status;
            let config = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: this.state.name,
                    username: this.state.username.toLowerCase(),
                    email: this.state.email.toLowerCase(),
                    password: this.state.password.toLowerCase(),
                })
            }

            await fetch(this.util.getUrl('register'), config)
                .then((response)=>{
                    return response.json();
                })
                .then((response)=>{
                    if(response.status == 200){
                        this.props.navigation.navigate('Login');
                    }else{
                        alert('Wrong user or password');
                    }
                })
        } catch (err) {
          alert(err);
        }
      };


    render() {
        
        return (
            <Container style={{backgroundColor:'black'}}>
                <Grid>
                    <Row size={20}>
                        <Text style={{
                            flex: 1,  
                            justifyContent: 'center', 
                            alignItems: 'center',
                            color: colorList.primary,
                            fontSize:75,
                            textAlign:'center',
                            fontFamily: 'Simplifica'}}>
                            Register
                        </Text>
                    </Row>
                    <Row size={45}>
                        <Form style={{color:'white',fontFamily:'Simplifica',flex: 0.95,  justifyContent: 'center', alignItems: 'center'}}>
                            <Item>
                            <Input placeholder="Name" 
                                onChangeText={name => this.setState({ name })}
                                value={this.state.name}
                                style={{color:'white',fontFamily:'Simplifica'}}/>
                            </Item>
                            
                            <Item>
                            <Input placeholder="Username"
                                onChangeText={username => this.setState({ username })}
                                value={this.state.username} 
                                style={{color:'white',fontFamily:'Simplifica'}}/>
                            </Item>
                            <Item>
                            <Input placeholder="Email" 
                                onChangeText={email => this.setState({ email })}
                                value={this.state.email}
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
                        <Button onPress={()=>{
                            this.registerUser()
                            }} style={styles.button}>
                            <Text style={styles.buttonText}>
                                Register
                            </Text>
                        </Button>    
                    </Row>
                    <Row size={10}/>
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


export default RegisterScreen;
