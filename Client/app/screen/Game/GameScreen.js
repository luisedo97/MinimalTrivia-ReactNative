import React, { Component } from 'react';
import {Text, Button, Container} from 'native-base';
import {AsyncStorage} from 'react-native';
import Utility from '../../util/Utility';

class GameScreen extends Component {
  constructor(props) {
    super(props);
    
  }

  state = {
    quiz:{},
    player:this.props.player,
    status: 'waitingNewQuiz'
  };

  util = new Utility();

  newQuiz = async ()=> {
    this.setState({status:'waitingNewQuiz'});
    await fetch('https://opentdb.com/api.php?amount=1')
      .then((response)=>{
          return response.json();
      })
      .then((response)=>{
        if(response.response_code == 0){
          this.setState({quiz: response.results});
          this.setState({status:'playing'});
        }else{
            alert(JSON.stringify(response));
        }
      });
  }

  async answerResponse(correct){
    let config = {
      crossDomain: true,
      method: "PUT",
      credential:'include',
      headers: {
          "Content-Type": "application/json",
          "Cookie": await AsyncStorage.getItem('Cookie')
      },
      body: JSON.stringify({
          correct: correct
      })
    } 
  
    await fetch(this.util.getUrl('Score'),config)
      .then((response)=>{
        return response.json();
      })
      .then((response)=>{
        if(response.status == 200){
          this.setState({status:'waitingAction'});
        }
      })
  
  }

  async componentWillMount () {
    await this.newQuiz();
  }

  render() {
    switch(this.state.status){
      case 'waitingNewQuiz':
        return(
          <Text>
            Loading
          </Text>
        );
      case 'playing':
        //Render game
        return(
          <Container>
            <Text>
              {JSON.stringify(this.state.quiz)}
            </Text>
            <Button onPress={()=>this.answerResponse(true)}>
              <Text>
                Correct
              </Text>
            </Button>
            <Button danger onPress={()=>this.answerResponse(false)}>
              <Text>
                Incorrect
              </Text>
            </Button>
          </Container>
        );
      case 'waitingAction':
        return (
          <Container>
            <Text>
              Waiting Action
            </Text>
            <Button onPress={this.newQuiz}>
              <Text>
                New Quiz
              </Text>
            </Button>
          </Container>
        );
    }
  }
}

export default GameScreen;
