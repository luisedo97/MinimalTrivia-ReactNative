import React, { Component } from 'react';
import { Text, Container, List, ListItem, Right, Left,Body, Content,Separator, Header,Spinner, Grid, Row} from 'native-base';
import {AsyncStorage,StyleSheet} from 'react-native';
import Utility from '../../util/Utility'; 

class RankingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ranking:'',
      playerScore:'',
      playerName:'',
      isReady:false
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
        backgroundColor:'black',
      },
    title:'Leaderboard'
  };


  util = new Utility();

  async componentWillMount() {
    dataUser = JSON.parse(await AsyncStorage.getItem('dataUser'));

    try {
      let config = {
        crossDomain: true,
        method: "GET",
        credential:'include',
        headers: {
            "Content-Type": "application/json",
            "Cookie": await AsyncStorage.getItem('Cookie')
        },
        processData: false
      }
        await fetch(this.util.getUrl('Score'),config)
            .then((response)=>{
                return response.json();
            })
            .then((response)=>{
                if(response.status == 200 ){
                  this.setState({ranking:response.data});
                  this.setState({playerScore:response.data.yourScore});
                  AsyncStorage.setItem('score', JSON.stringify(response.data.yourScore), (err) => console.log(err));
                  this.setState({playerName: dataUser.username});
                  this.setState({isReady:true});
                }else{
                  alert(JSON.stringify(response));
                }
            })
    } catch (err) {
        alert(err);
    }
  }

  render() {
    if(!this.state.isReady){
      return(
        <Container style={{backgroundColor:'black'}}>
            <Grid>
              <Row size={45}/>
              <Row size={10}>
                <Spinner color='white' style={{flex: 1,  justifyContent: 'center', alignItems: 'center'}}/>
              </Row>
              <Row size={45}/>
            </Grid>
        </Container>
      );
    }

    let i = 0;
    return (

        <Content style={styles}>
          <Separator>
          </Separator>
          <ListItem>
            <Left>
              <Text>
                {this.state.ranking.positionUser}
              </Text>
            </Left>
            <Body>
              <Text>
                {this.state.playerName}
              </Text>
            </Body>
            <Right>
              <Text>
                {this.state.ranking.yourScore}
              </Text>
            </Right>
            </ListItem>
            <Separator/>
          {
            ((this.state.ranking.length === 0) ? 
            console.log('empty array') : 
            this.state.ranking.username.map((data) => {
              score = this.state.ranking.score[i];
              i++;
              return (
                  <ListItem>
                      <Left>
                        <Text>
                          {i}
                        </Text>
                      </Left>
                      <Body>
                        <Text>
                          {data}
                        </Text>
                      </Body>
                      <Right>
                        <Text>
                          {score}
                        </Text>
                      </Right>
                  </ListItem>                              
                )
            }))
          }
          <Separator>
          </Separator>
        </Content>
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
  spinnerBackground:{
    backgroundColor:colorList.secondary,
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  spinner:{
    alignItems: 'center',
    justifyContent:'center',
  }
});

export default RankingScreen;
