import React, { Component } from 'react';
import axios from 'axios';
import MessageCard from '../../reComponents/card';
import { getW_authCookie,config } from '../../utilities';


export default class Home extends Component {
    state = {
        messages : []
    }
    async componentDidMount() {
        const response = await axios.get('/api/messages/',config(getW_authCookie()));
        if(response.status === 200) {
            this.setState({messages:response.data.data});
        }
    }

    showDengrousFn = (messageId) => {
        const user = localStorage.getItem('user');
        if(user) {
            const id = JSON.parse(user)._id;
            console.log({messageId,userId:id})
            if(id === messageId) return true;
            return false;
        }
    }
    render() {
        console.log({messages:this.state.messages})
        return (
            <div className="Home">
                {this.state.messages && this.state.messages.map((message,i) => (
                    <MessageCard
                     message = {message.message}
                     id = {message._id}
                     messageCreator = {message.createdBy.firstname + ' ' + message.createdBy.lastname}
                     replies = {message.replies}
                     showDengrousFn = {this.showDengrousFn(message.createdBy._id)}
                     key={i}
                 />
                ))}
            </div>
        )
    }
}
