import '../styles/Lobby.css'
import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default class Lobby extends Component {
    render() {
        return (
            <div className="content">
                <h1>Lobby</h1>
                <form>
                    <h4>Liste der Spieler</h4>
                    <span>Wird noch gefüllt..</span>
                </form>
                <nav className="bar bar-tab">
                    <Link to="/" className="tab-item danger">Zurück</Link>
                    <Link to="/lobby" className="tab-item primary" >Spiel starten</Link>
                </nav>
            </div>
        );
    }
}