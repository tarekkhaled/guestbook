import React, { Component } from 'react';
import axios from 'axios';
import MessageCard from '../../reComponents/card';
import { getW_authCookie,config } from '../../utilities';
import Navbar from '../navbar';



export default class Home extends Component {
    state = {
        messages : []
    }
    async componentDidMount() {
        if(!getW_authCookie()) {
            window.location.assign('/login/') 
        }
        const response = await axios.get('/api/messages/',config(getW_authCookie()));
        if(response.status === 200) {
            this.setState({messages:response.data.data});
        }
    }

    showDengrousFn = (messageId) => {
        const user = localStorage.getItem('user');
        if(user) {
            const id = JSON.parse(user)._id;
            if(id === messageId) return true;
            return false;
        }
    }

    
    render() {
        return (
            <div className="Home">
                <Navbar show="home"/>
                {this.state.messages.length > 0 ? this.state.messages.map((message,i) => (
                    <MessageCard
                     message = {message.message}
                     id = {message._id}
                     messageCreator = {message.createdBy.firstname + ' ' + message.createdBy.lastname}
                     replies = {message.replies}
                     showDengrousFn = {this.showDengrousFn(message.createdBy._id)}
                     key={i}
                 />
                )) : <h3>No messags to shown for now</h3>}
            </div>
        )
    }
}
