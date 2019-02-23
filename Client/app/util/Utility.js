import React, { Component } from 'react';

class Utility extends Component {
    
    state = {
        
        //Modify the URL, and place the server's
        url:'http://192.168.43.115:8084/MinimalTrivia/'
    }

    getUrl(endpoint){
        return this.state.url+endpoint;
    }

}

export default Utility;
