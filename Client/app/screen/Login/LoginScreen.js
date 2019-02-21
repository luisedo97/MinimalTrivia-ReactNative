import React, { Component } from 'react';
import { Container, Content, Button, Text, Body, Input , Form, Item} from 'native-base';
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
            elevation: 0
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
                    username: this.state.username,
                    password: this.state.password,
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