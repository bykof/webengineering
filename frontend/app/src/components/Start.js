/**
 * Created by Leon on 11.05.2017.
 */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import logo from '../assets/logo.png';
import '../styles/Start.css';

export default class Start extends Component {

    render() {
        return (
            <div className="col-xs-12 text-center background">
                <div className="marginTop">
                    <span className="title">Drink Olympics</span>
                    <img src={logo} className="img-responsive centerImage" alt="Logo"/>
                </div>
                <div className="btn-group marginTop" role="group">
                    <Link to="/create-party" className="btn btnCreate">Spiel erstellen</Link>
                    <Link to="/join-party" className="btn btnJoin">Spiel beitreten</Link>
                </div>
            </div>
        );
    }
}

