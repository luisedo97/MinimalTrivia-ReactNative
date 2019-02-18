import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import {FooterTab,Button,Text, Footer,Container, Content} from 'native-base';
import DashboardContent from '../../components/DashboardComponent';
import StatsContent from '../../components/StatsComponent';
import RankingContent from '../../components/RankingComponent';

class DashboardScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cup: '',
      username: '',
      index: 0 //Dashboard home
    };

  }

  switchScreen(index) {
    this.setState({index: index})
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
            <ViewContent/>
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
