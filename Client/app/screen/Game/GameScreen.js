import React, { Component } from 'react';
import {Text, Button, Container, Grid, Col, Row, Spinner} from 'native-base';
import {AsyncStorage,StyleSheet} from 'react-native';
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
      case 'playing':
        //Render game
        i = 0;
        return(
          <Container style={styles.container}>
            <Grid>
              <Row size={15}>
              </Row>
              <Row size={35}>
                <Text style={styles.title}>
                  {JSON.stringify(this.state.quiz.question)}
                </Text>
              </Row>
                  {
                    ((this.state.quiz.length === 0) ? 
                    alert('empty array') : 
                    this.refillArrayAnswer().map((answer) => {
                          return (
                            <Row size={10}>
                              <Button
                              style={styles.button} 
                              large 
                              block 
                              onPress={()=>this.answerResponse(answer.isCorrect)}>
                                <Text style={styles.buttonText}>
                                  {answer.text}
                                </Text>
                              </Button>
                            </Row>                              
                          )
                    }
                    ))
                  }
              <Row size={10}/>
            </Grid>
          </Container>
        );

      case 'waitingAction':

        let MessageContent = ((this.state.correct) ? 
        ()=>{
          return(
              <Text style={styles.title}>
                Correct! The answer correct is: {this.state.quiz.correct_answer}
              </Text>
            )}: 
        ()=>{
          return(
              <Text style={styles.title}>
                Incorrect! The answer correct is: {this.state.quiz.correct_answer}
              </Text>
            )
        })

        return (
          <Container style={styles.container}>
            <Grid>
              <Row size={10}>
              </Row>
              <Row size={30} style={styles.title}>
                <MessageContent/>
              </Row>
              <Row size={10}>
                <Text style={styles.title}>
                  Your score:{this.state.playerScore}
                </Text>
              </Row>
              <Row size={15}>
                <Button style={styles.button} onPress={this.newQuiz}>
                  <Text style={styles.buttonText}>
                    Waiting Action
                  </Text>
                </Button>
              </Row>
              <Row size={15}>
                <Button style={styles.button} 
                  onPress={()=>this.props.navigation.navigate("Dashboard")}>
                  <Text style={styles.buttonText}>
                    Go back home
                  </Text>
                </Button>
              </Row>
              <Row size={20}/>
              
            </Grid>
            
          </Container>
        );
    }
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

export default GameScreen;
