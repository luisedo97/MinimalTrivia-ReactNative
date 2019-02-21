import React, { Component } from 'react';
import {Text, Button, Container, Grid, Col, Row, Spinner} from 'native-base';
import {AsyncStorage} from 'react-native';
import Utility from '../../util/Utility';

class GameScreen extends Component {
  constructor(props) {
    super(props);
    
  }

  state = {
    quiz:{},
    playerScore: '',
    status: 'waitingNewQuiz',
    correct:'',
    counter:10,
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
          this.setState({quiz: response.results[0]});
          this.setState({status:'playing'});
          //console.log(this.state.quiz);

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
          this.setState({correct:correct});
          AsyncStorage.setItem('score',response.data.score+'');
          this.setState({playerScore:response.data.score});
        }
    })
  
  }

  async componentWillMount () {
    let score = await AsyncStorage.getItem('score');
    this.setState({playerScore: score});
    await this.newQuiz();
    
  }

  refillArrayAnswer(){
    let response = [{text:this.state.quiz.correct_answer,isCorrect:true}];
    this.state.quiz['incorrect_answers'].forEach(element => {
      response.push({text:element,isCorrect:false});
    });
    response.sort();
    console.log(response);
    return response;
  }

  render() {
    switch(this.state.status){
      case 'waitingNewQuiz':
        return(
          <Container>
            <Spinner color='blue' />
          </Container>
        );
      case 'playing':
        //Render game
        return(
          <Container>
            <Grid>
              <Row>
              </Row>
              <Row>
                <Text>
                  {JSON.stringify(this.state.quiz.question)}
                </Text>
              </Row>
                <Row>
                  {
                    ((this.state.quiz.length === 0) ? 
                    alert('empty array') : 
                    this.refillArrayAnswer().map((answer) => {
                        return (
                          <Col>
                            <Button block onPress={()=>this.answerResponse(answer.isCorrect)}>
                              <Text>
                                {answer.text}
                              </Text>
                            </Button>
                          </Col>                              
                        )
                    }))
                  }
                </Row>
              <Row/>
            </Grid>
          </Container>
        );

      case 'waitingAction':

        let MessageContent = ((this.state.correct) ? 
        ()=>{
          return(
              <Text>
                Correct!
              </Text>
            )}: 
        ()=>{
          return(
              <Text>
                Incorrect!
              </Text>
            )
        })

        return (
          <Container>
            <Grid>
              <Row>
                <Text>
                  {this.state.playerScore}$
                </Text>
              </Row>
              <Row>
                <MessageContent/>
              </Row>
              <Row>
              <Col>
                <Button onPress={this.newQuiz}>
                  <Text>
                    Waiting Action
                  </Text>
                </Button>
              </Col>
              <Col>
                <Button onPress={()=>this.props.navigation.navigate("Dashboard")}>
                  <Text>
                    Go back home
                  </Text>
                </Button>
              </Col>                
              </Row>
              <Row>

              </Row>
              
            </Grid>
            
          </Container>
        );
    }
  }
}

export default GameScreen;
