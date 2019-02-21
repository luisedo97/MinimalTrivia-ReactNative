import React, { Component } from 'react';
import {Button,Text, Container} from 'native-base';

class ButtonAnswer extends Component {
  
    constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <Container>
            <Button onPress={this.props.click}>
                <Text>
                    {this.props.text}
                </Text>
            </Button>
        </Container>
    );
  }
}

export default ButtonAnswer;
