import React, { Component } from 'react';
import { Text } from 'native-base';

class RankingComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ranking:this.props.data
    };
  }

  render() {
    return (
      <Text>
        {JSON.stringify(this.state.ranking)}
      </Text>
    );
  }
}

export default RankingComponent;
