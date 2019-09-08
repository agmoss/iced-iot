import React, { Component } from 'react';
import Card, { CardSubtitle } from 'react-bootstrap/Card'
import 'status-indicator/styles.css'
import '../dot.css'

class StatusCard extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (

            <div className="card card-dark">
                <div className="card-body">
                <div className="img-responsive float-right"><status-indicator positive pulse></status-indicator>  </div>
                    <h2 className="card-title mb-4">{this.props.facility} </h2>
                    <h6>Energy, Wind, and Tank IoT Monitoring</h6>
                </div>
            </div>
        )
    }
}

export default StatusCard;