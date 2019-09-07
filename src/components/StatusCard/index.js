import React, { Component } from 'react';
import 'status-indicator/styles.css'

import '../dot.css'

class StatusCard extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="card custom-card mb-5 mb-xs-4">
                <div className='card-header'>
                    {this.props.facility}
                </div>
                <div className="card-body">
                    <status-indicator active pulse></status-indicator>
                </div>
            </div>
        )
    }
}

export default StatusCard;