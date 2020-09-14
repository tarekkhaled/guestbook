import React, { Component } from 'react';
import axios from 'axios';
import { getW_authCookie,config } from '../utilities';

export default class MessageCard extends Component {
   
    state = {
        formSuccess: false,
        currentMessageID : '',
        reply: false,
        formData: {
          reply: '',
          replyBy: '',
          message:''
        },
      };

    updateReply = (e) => {
        const {formData} = this.state;
        const newFormData = {...formData};
        newFormData['reply'] = e.target.value;
        this.setState({
            formData:newFormData
        })
    }

    handleFormSubmit = async (messageId,e) => {
        e.preventDefault();
        const { formData:{reply} } = this.state;
        if(!reply) return alert('write a reply please !');
        let user = localStorage.getItem('user') ;
        if(user) {
            user = JSON.parse(user);
            const name = user?.firstname + ' ' + user?.lastname;
            const {formData} = this.state;
            const newFormData = {...formData};
            newFormData['replyBy'] = name;
            const response = await axios.post(`/api/messages/reply/${messageId}`,newFormData,config(getW_authCookie()));
            if(response.status === 200) {
              window.location.reload();
            }        
        }
       
    }

    deleteMessage = async (id) => {
        const response = await axios.delete(`/api/messages/${id}`,config(getW_authCookie()));
        if (response.status === 200)
            window.location.reload();
    }

    updateMessage = async (message,id,e) => {
        localStorage.setItem('toUpdate',{id,message});
    }
    render() {
        const {message,id,messageCreator,showDengrousFn,replies} = this.props
        return (
            <div className="MessageCard">
                <div className="MessageCard__creator">
                    <i className="fas fa-user "/>
                    {messageCreator}
                </div>
                {showDengrousFn ? 
                    <div className="MessageCard_dangerous">
                         <i className="fas fa-trash" onClick={(e) => this.deleteMessage(id,e)}/> 
                         <i className="fas fa-edit" onClick={(e) => this.updateMessage(message,id,e)}/>
                    </div> : null
                }
                <p className="MessageCard__message">
                    {message}
                </p>
                
                { <form
                    className="signup__form"
                    autoComplete="off"
                    onSubmit={(e) =>this.handleFormSubmit(id,e)}
                >
                {replies && replies.map((reply,i) => (
                    <div className="MessageCard__reply" key={i}>
                        <div className="MessageCard__reply__replier">
                            <i className="fas fa-user"></i>
                            {!reply.replyBy ? 'user' : reply.replyBy}
                        </div>
                        {reply?.reply}     
                    </div>
                ))}
            
            <textarea onChange={this.updateReply} className="MessageCard__textarea" name="reply" placeholder="write your message here..."></textarea>
            <button className="MessageCard__submit" type="submit" onClick={(e) =>this.handleFormSubmit(id,e)}>
                reply
            </button>
        </form>
                }
            </div>
        )
    }
}
