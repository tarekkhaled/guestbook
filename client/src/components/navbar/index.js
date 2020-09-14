import React, { Component } from 'react';
import './navbar.css';
import axios from 'axios'

export default class Navbar extends Component {
    goHome = () => {
        window.location.assign('/home');
    }
    goOut = async () => {
        await axios.get('/auth/logout');
        localStorage.clear();
        window.location.assign('/login');
    }

    render() {
        const {show} = this.props
        return (
            <div className="Navbar">
                <button className="Navbar_btn" onClick={this.goHome}>{show === 'home'?'Create Message' : 'Home'}</button>
                <button className="Navbar_btn" onClick={this.goOut}>Logout</button>
            </div>
        )
    }
}
