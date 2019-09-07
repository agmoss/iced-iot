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

            <Card className="card-dark mb-5 mb-xs-4">
                <Card.Header>{this.props.facility}</Card.Header>
                <Card.Body>
                    <Card.Title><status-indicator positive pulse></status-indicator></Card.Title>
                    <Card.Text>
                        Energy, Wind, and Tank Monitoring
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted">60 second frequency</Card.Footer>
            </Card>
        )
    }
}

export default StatusCard;