import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import Start from './components/Start';
import CreateParty from './components/CreateParty';
import JoinParty from './components/JoinParty';
import './App.css';



class App extends Component {
    constructor() {
        super();
        this.state = {
            name: "world",
            nummer: 12
        };
        // Notwendig, weil in der Funktion selber "this" genutzt wird
        // Methode bindet das Objekt an sich
        // Kann auch in Html geschrieben werden
        this.changeName = this.changeName.bind(this);
    }

    changeName() {
        this.setState({name: "leon"});
    }

    showValue(value) {
        console.log(value);
    }

    render() {
        return (
            <Router>
                <div>
                    <Route component={Start} path={'/'} exact={true}/>
                    <Route component={CreateParty} path={'/create-party'}/>
                    <Route component={JoinParty} path={'/join-party'}/>
                </div>
            </Router>
        );
    }
}

export default App;
