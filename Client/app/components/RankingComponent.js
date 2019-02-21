import React, { Component } from 'react';
import { Text, Container, List, ListItem, Right, Left,Body, Content,Separator, Header,Spinner, Grid, Col} from 'native-base';
import {AsyncStorage,StyleSheet} from 'react-native';
import Utility from '../util/Utility'; 

class RankingComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ranking:'',
      playerScore:'',
      playerName:'',
      isReady:false
    };
  }

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
        <Container>
          <Spinner color='blue' />
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

const styles = StyleSheet.create({

});

export default RankingComponent;
