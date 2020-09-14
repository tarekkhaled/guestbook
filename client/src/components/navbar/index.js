import React, { Component } from 'react';
import './navbar.css';
import axios from 'axios'

export default class Navbar extends Component {
    goHome = () => {
        window.location.assign('/home');
    }
    goPrivate = () => {
        window.location.assign('/my/messages');
    }
    goOut = async () => {
        await axios.get('/auth/logout');
        localStorage.clear();
        window.location.assign('/login');
    }

    render() {
        return (
            <div className="Navbar">
                <button className="Navbar_btn" onClick={this.goHome}>Home</button>
                <button className="Navbar_btn" onClick={this.goPrivate}>My Messages</button>
                <button className="Navbar_btn" onClick={this.goOut}>Logout</button>
            </div>
        )
    }
}
