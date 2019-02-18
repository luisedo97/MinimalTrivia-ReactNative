import React, { Component } from 'react';
import { Container, Content, Button, Text, Body, Input , Form, Item} from 'native-base';
import {AsyncStorage,StyleSheet} from 'react-native';

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
            elevation: 0
          }
    };

    loginUser = async () => {
        try {
            let config = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password,
                })
            }

            await fetch('http://192.168.1.116:8084/TowerTrivia/session', config)
                .then((response)=>{
                    return response.json();
                })
                .then((response)=>{
                    if(response.status === 200 ){
                        this.storeData(response.data);
                        this.props.navigation.navigate("Dashboard");
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
            await AsyncStorage.setItem('dataUser', JSON.stringify(data), (err) => console.log(err));
        } catch (error) {
            alert('Error while saving data :( Try it again...');
            alert(error)
        }
    }

    render() {
        return (
            <Container>
                <Content padder>
                    <Text>
                        Login
                    </Text>
                
                    <Form>
                        <Item>
                        <Input placeholder="Username"
                            onChangeText={username => this.setState({ username })}
                            value={this.state.username} />
                        </Item>
                        <Item password>
                        <Input placeholder="Password" 
                            onChangeText={password => this.setState({ password })}
                            value={this.state.password}
                            secureTextEntry={true}/>
                        </Item>
                    </Form>
                
                    <Button onPress={()=>this.loginUser()}>
                        <Text>Login</Text>
                    </Button>
                    
                </Content>
            </Container>
        );
    }
}

export default LoginScreen;