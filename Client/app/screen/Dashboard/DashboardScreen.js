import React, { Component } from 'react';
import {StyleSheet,AsyncStorage} from 'react-native';
import {FooterTab,Button,Text, Footer,Container, Content} from 'native-base';
import DashboardContent from '../../components/DashboardComponent';
import StatsContent from '../../components/StatsComponent';
import RankingContent from '../../components/RankingComponent';
import Utility from '../../util/Utility';

class DashboardScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player:{
        data:'',//La data lo uso con el store
        score:''//El score lo relleno con el sistema.
      },
      index: 0, //Dashboard home
      ranking: {}
    };

  }

  util = new Utility();

  switchScreen(index) {
    this.setState({index: index})
  }

  async componentWillMount() {
    
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
                alert(JSON.stringify(response.status));
                if(response.status == 200 ){
                  this.setState({ranking:response.data});
                  this.setState({player:{score:response.data.yourScore}});
                  console.log(this.state.ranking);
                  console.log(this.state.player);
                  //this.storeData(response.data);
                  //this.props.navigation.navigate("Dashboard");
                }else{
                    //alert(JSON.stringify(response));
                }
            })
    
    } catch (err) {
        alert(err);
    }
  }


  render() {
    let ViewContent = null;

    switch(this.state.index){
      case 0:
        ViewContent = DashboardContent;
        break;
      case 1:
        ViewContent = StatsContent;
        break;
      case 2:
        ViewContent = RankingContent;
        break;
    }

    return (
        <Container>
          <Content>
            <ViewContent data={this.state.ranking} player={this.state.player} navigation={this.props.navigation}/>
          </Content>
          <Footer>
            <FooterTab>
              <Button onPress={() => this.switchScreen(1)}>
                <Text style={styles.footerText}>
                    Stats
                </Text>
              </Button>
              <Button onPress={() => this.switchScreen(0)}>
                <Text style={styles.footerText}>
                    Play
                </Text>
              </Button>
              <Button onPress={() => this.switchScreen(2)}>
                <Text style={styles.footerText}>
                    Ranking
                </Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
    );
  }
}

const styles = StyleSheet.create({

});

export default DashboardScreen;
