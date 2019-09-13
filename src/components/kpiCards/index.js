import React, { Component } from 'react';

// Components
import StatusCard from '../StatusCard';
import KpiCard from '../kpiCard';

// Bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class KpiCards extends Component {
    constructor(props) {
        super(props);
        this.BASE_URL = 'https://iotsimbackend.azurewebsites.net/api/';
        this.state = {
            wind: '-',
            tank: '-',
            energy: '-',
        }
    }

    componentDidMount() {

        // Card data
        this.getDataFor('/devices/facility/' + this.props.currentFacility + '/type/wind?last=true', 'wind');
        this.getDataFor('/devices/facility/' + this.props.currentFacility + '/type/energy?last=true', 'energy');
        this.getDataFor('/devices/facility/' + this.props.currentFacility + '/type/tank?last=true', 'tank');

        // Realtime method
        this.startUpdatingData();

    }

    startUpdatingData() {

        setInterval(() => {

            this.getDataFor('/devices/facility/' + this.props.currentFacility + '/type/wind?last=true', 'wind');
            this.getDataFor('/devices/facility/' + this.props.currentFacility + '/type/energy?last=true', 'energy');
            this.getDataFor('/devices/facility/' + this.props.currentFacility + '/type/tank?last=true', 'tank');

        }, 2000);
    }


    getDataFor(conversion, prop) {
        return new Promise((resolve, reject) => {
            fetch(this.BASE_URL + conversion, {
                mode: 'cors'
            })
                .then(res => res.json())
                .then(d => {

                    if (prop === 'wind') {
                        this.setState({
                            [prop]: d.data
                        });
                    }

                    if (prop === 'energy') {
                        this.setState({
                            [prop]: d.data.watts
                        });
                    }

                    if (prop === 'tank') {
                        this.setState({
                            [prop]: d.data
                        });
                    }

                }).then(() => {
                    return resolve();
                })
        })
    }


    render() {
        return (

            <Row>
                <Col xs={12} className="mb-3 mb-xs-4 align-items-stretch">
                    <div className="card-deck custom-card-deck ">
                        <KpiCard header="Wind" src={process.env.PUBLIC_URL + '/windsock.png'} data={[{ "label": "(mPh)", "value": this.state.wind.mph }, { "label": "(Direction)", "value": this.state.wind.direction }]} alt="-" />
                        <KpiCard header="Energy" src={process.env.PUBLIC_URL + '/logo192.png'} data={[{ "label": "(watts)", "value": this.state.energy }, { "label": "(State)", "value": "Normal" }]} alt="-" label1="(Watts)" value1={this.state.energy} />
                        <KpiCard header="Tank" src={process.env.PUBLIC_URL + '/water-tank.png'} data={[{ "label": "(Liters)", "value": this.state.tank.liters }, { "label": "(ph)", "value": this.state.tank.pH }]} alt="-" />
                        <StatusCard facility={this.props.currentFacility} />
                    </div>
                </Col>
            </Row>

        )
    }
}

export default KpiCards;