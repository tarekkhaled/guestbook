import React, { Component } from 'react';
import './profile.css';
import '../signup/signup.css';
import {getW_authCookie, config} from '../../utilities';
import axios from 'axios';
import Navbar from '../navbar';

class Profile extends Component {
    componentDidMount() {
        if(!getW_authCookie()) {
            window.location.assign('/login/')
        }
    }
    
    state = {
        formSuccess: false,
        oldMessage : JSON.parse(localStorage.getItem('toUpdate')).message,
        messageId : JSON.parse(localStorage.getItem('toUpdate')).id,
        formData: {
          message: ''
        },
      };

    updateMessage = (e) => {
        const {formData} = this.state;
        const newFormData = {...formData};
        newFormData['message'] = e.target.value;
        this.setState({
            formData:newFormData
        })
    }

    handleFormSubmit = async (e) => {
        e.preventDefault();
        const { formData,formData:{message} } = this.state;
        if(!message) return alert('write a message please !');
        const response = await axios.patch(`/api/messages/${this.state.messageId}`,formData,config(getW_authCookie()));
        console.log({response})
        if(response.status === 200) {
          localStorage.setItem('message', JSON.stringify(response.data.data));
          window.location.assign('/home');
        }
         
        
    }
    render() {
        return (
            <div className="Profile">
                <Navbar/>
                <form
                    className="signup__form"
                    autoComplete="off"
                    onSubmit={this.handleFormSubmit}
                >
            <h2>Create New Message </h2>
            <textarea className="Profile__textarea" name="message" defaultValue={this.state.oldMessage} onChange={this.updateMessage}></textarea>
          <button className="signup__form_submit" type="submit">
            Edit
          </button>
        </form>
            </div>
        )
    }
}

export default Profile;
