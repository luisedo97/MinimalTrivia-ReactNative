import React, { Component } from 'react';

class Utility extends Component {
    
    state = {
        url:'http://192.168.43.115:8084/TowerTrivia/'
    }

    getUrl(endpoint){
        return this.state.url+endpoint;
    }

}

export default Utility;
