import React, { Component } from 'react';
import { Container, Content, Button , Text, Footer, FooterTab } from 'native-base';
import { StyleSheet } from 'react-native';

class HomeScreen extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
        };
    }

    render() {
        return (
        <Container>
            <Content contentContainerStyle={{ justifyContent: 'center', flex: 1 ,alignItems:'center'}} padder>
                <Text style={styles.titleName}>
                    Trivia Tower
                </Text>
                
                
            </Content>
            <Footer>
                <FooterTab>
                    <Button onPress={() => this.props.navigation.navigate("Login")}>
                        <Text style={styles.footerText}>
                            Login
                        </Text>
                    </Button>
                    <Button onPress={() => this.props.navigation.navigate("Register")}>
                        <Text style={styles.footerText}>
                            Register
                        </Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleName :{
        fontSize: 42,
    },
    footerText:{
        color: 'white',
        fontSize: 12
    }

});

export default HomeScreen;
