/**
 * Created by Leon on 11.05.2017.
 */
import React, { Component } from 'react';

export default class Start extends Component {
    render() {
        return (
            <div>
                <div className="btn-group-vertical">
                    Image
                    <button type="button" className="btn btn-primary">Erstelle Party</button>
                    <button type="button" className="btn btn-primary">Party beitreten</button>
                </div>
            </div>
        );

    }
}