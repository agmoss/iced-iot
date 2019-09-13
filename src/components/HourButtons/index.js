import React, { Component } from 'react';

// Chart Libraries
import ReactApexChart from 'react-apexcharts';
import ApexCharts from 'apexcharts';

// Functions
import timeSeries from '../../functions/timeSeries';

// Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';


class HourButtons extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

            <Row>
                <Col xs={12} className="mb-3">
                    <ToggleButtonGroup type="checkbox">
                        <ToggleButton variant="secondary" onClick={this.props.onHourClick(1)} >Last Hour</ToggleButton>
                        <ToggleButton variant="secondary" onClick={this.props.onHourClick(2)} >Last 2 Hours</ToggleButton>
                        <ToggleButton variant="secondary" onClick={this.props.onHourClick(4)} >Last 4 Hours</ToggleButton>
                    </ToggleButtonGroup>
                </Col>

            </Row>
        )
    }
}

export default HourButtons;