import React, { Component } from 'react';

// Components
import StatusCard from '../StatusCard';
import KpiCard from '../KpiCard';

// Bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

/**
 * KpICards Class.
 *
 * Presentation component
 * 
 * Displays key info on IoT devices
 * 
 * @constructor
 * @param {Object} props - properties from parent
 */
class KpiCards extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

            <Row>
                <Col xs={12} className="mb-3 mb-xs-4 align-items-stretch">
                    <div className="card-deck custom-card-deck ">
                        <KpiCard header="Wind" src={process.env.PUBLIC_URL + '/windsock.png'} data={[{ "label": "(mPh)", "value": this.props.wind.mph }, { "label": "(Direction)", "value": this.props.wind.direction }]} alt="-" />
                        <KpiCard header="Energy" src={process.env.PUBLIC_URL + '/logo192.png'} data={[{ "label": "(watts)", "value": this.props.energy }, { "label": "(State)", "value": "Normal" }]} alt="-" label1="(Watts)" value1={this.props.energy} />
                        <KpiCard header="Tank" src={process.env.PUBLIC_URL + '/water-tank.png'} data={[{ "label": "(Liters)", "value": this.props.tank.liters }, { "label": "(ph)", "value": this.props.tank.pH }]} alt="-" />
                        <StatusCard facility={this.props.currentFacility} />
                    </div>
                </Col>
            </Row>

        )
    }
}

export default KpiCards;