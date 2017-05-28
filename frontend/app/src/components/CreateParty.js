/**
 * Created by Leon on 11.05.2017.
 */
import React, {Component} from 'react';

export default class CreateParty extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-xs-12">
                    <span>Wie ist dein Name?</span>
                    <input type="text" className="form-control" placeholder="Name"/>
                    <button type="button" className="btn btn-primary">GO!</button>
                </div>
            </div>
        );
    }
}