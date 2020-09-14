import React, { Component } from 'react';

export default class MessageCard extends Component {
   
    render() {
        const {message,messageCreator,showDengrousFn,replies} = this.props
        console.log({replies})
        return (
            <div className="MessageCard">
                <div className="MessageCard__creator">
                    <i className="fas fa-user "/>
                    {messageCreator}
                </div>
                <p className="MessageCard__message">
                    {message}
                </p>
                {showDengrousFn ? 
                    <div className="MessageCard_dangerous">
                         <i className="fas fa-trash"/> 
                         <i className="fas fa-edit"/>
                    </div>
                    : <form
                    className="signup__form"
                    autoComplete="off"
                    onSubmit={this.handleFormSubmit}
                >
                {replies && replies.map((reply,i) => (
                    <div className="MessageCard__reply">
                        <div className="MessageCard__reply__replier">
                            <i className="fas fa-user"></i>
                            {!reply.replyBy ? 'user' : reply.replyBy}
                        </div>
                        {reply?.reply}     
                    </div>
                ))}
            <textarea className="MessageCard__textarea" name="message" placeholder="write your message here..." onChange={this.updateMessage}></textarea>
            <button className="MessageCard__submit" type="submit">
                Submit
            </button>
        </form>
                }
            </div>
        )
    }
}
