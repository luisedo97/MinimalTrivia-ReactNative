import React, { Component } from 'react';
import { Container, Content, Button, Text, Body, Input , Form, Item} from 'native-base';
import { registerTaskAsync } from 'expo-background-fetch';

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
                    username: this.state.username,
                    email: this.state.email,
                    password: this.state.password,
                })
            }

            await fetch('http://192.168.1.110:8084/TowerTrivia/register', config)
                .then((response)=>{
                    return response.json();
                })
                .then((response)=>{
                    alert(JSON.stringify(response));
                })
        } catch (err) {
          alert(err);
        }
      };

    render() {
        return (
            <Container>
                <Content padder>
                    <Text>
                        Register
                    </Text>
                
                    <Form>
                        <Item>
                            <Input placeholder="Name"
                            onChangeText={name => this.setState({ name })}
                            value={this.state.name} />
                        </Item>
                        <Item>
                            <Input placeholder="Username" 
                            onChangeText={username => this.setState({ username })}
                            value={this.state.username} />
                        </Item>
                        <Item>
                            <Input placeholder="Email" 
                            onChangeText={email => this.setState({ email })}
                            value={this.state.email}/>
                        </Item>
                        <Item>
                            <Input placeholder="Password" 
                            onChangeText={password => this.setState({ password })}
                            value={this.state.password}
                            secureTextEntry={true}/>
                        </Item>
                    </Form>
                
                    <Button onPress={()=>this.registerUser()}>
                        <Text>Register</Text>
                    </Button>
                    
                </Content>
            </Container>
        );
    }
}




export default RegisterScreen;
