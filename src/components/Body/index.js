import React, { Component } from 'react';
import Map from '../Map';
import ReactApexChart from 'react-apexcharts';
import ApexCharts from 'apexcharts';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import KpiCard from '../kpiCard';

import StatusCard from '../StatusCard';
import timeSeries from '../../functions/timeSeries';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


var data = [];
class Body extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.selectFacility = this.selectFacility.bind(this);
        this.BASE_URL = 'https://iotsimbackend.azurewebsites.net/api/';
        this.chartRef = null;
        this.state = {
            hourLag: 1,
            dropdownOpen: false,
            currentFacility: "facility_01",
            facility1Devices: '-',
            facility2Devices: '-',
            wind: '-',
            tank: '-',
            energy: '-',
            windTs: '-',
            tankTs: '-',
            energyTs: '-',
            options: {
                chart: {
                    foreColor: '#fff',
                    id: 'realtime',
                    zoom: {
                        enabled: false
                    },
                    toolbar: {
                        show: false,
                    },
                },
                grid: {
                    borderColor: "#40475D",
                },
                colors: ['#FCCF31', '#17ead9', '#f02fc2'],
                dataLabels: {
                    enabled: false
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        gradientToColors: ['#F55555', '#6078ea', '#6094ea']
                    },
                },
                stroke: {
                    curve: 'smooth'
                },
                title: {
                    text: 'Wattage',
                    align: 'left'
                },
                xaxis: {
                    type: 'datetime'
                },
                tooltip: {
                    enabled: true, //TODO: Fix this
                    followCursor: true,
                    theme: 'dark',
                    fixed: {
                        enabled: false,
                        position: 'topRight',
                        offsetX: 0,
                        offsetY: 0,
                    },
                }
            },
            series: [{
                data: data
            }],
        }
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    selectFacility(event) {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen,
            currentFacility: event.target.innerText
        }, () => {
            // Re-render the chart
            this.energyLineChart();
            this.startUpdatingData();
        })
    }

    // Create the wattage time series chart
    energyLineChart() {

        clearInterval(this.chartInterval);
        var now = new Date();
        now.setHours(now.getHours() - this.state.hourLag);
        var oneHourAgo = now.getTime().toString();
        this.getDataFor('/devices/facility/' + this.state.currentFacility + '/type/energy/gte/' + oneHourAgo, 'energyTs');

    }

    componentDidMount() {

        // Card data
        this.getDataFor('/devices/facility/' + this.state.currentFacility + '/type/wind?last=true', 'wind');
        this.getDataFor('/devices/facility/' + this.state.currentFacility + '/type/energy?last=true', 'energy');
        this.getDataFor('/devices/facility/' + this.state.currentFacility + '/type/tank?last=true', 'tank');

        // Chart data
        this.energyLineChart();

        // Realtime method
        this.startUpdatingData();

    }


    // Global for clearing the interval on re-render
    chartInterval = null;
    startUpdatingData() {

        setInterval(() => {

            this.getDataFor('/devices/facility/' + this.state.currentFacility + '/type/wind?last=true', 'wind');
            this.getDataFor('/devices/facility/' + this.state.currentFacility + '/type/energy?last=true', 'energy');
            this.getDataFor('/devices/facility/' + this.state.currentFacility + '/type/tank?last=true', 'tank');

        }, 2000);

        this.chartInterval = setInterval(() => {

            var now = new Date();
            now.setHours(now.getHours() - this.state.hourLag);
            var oneHourAgo = now.getTime().toString();
            this.getDataFor('/devices/facility/' + this.state.currentFacility + '/type/energy/gte/' + oneHourAgo, 'energyTs');

        }, 10000);
    }


    getDataFor(conversion, prop) {
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

                if (prop === 'energyTs') {
                    var data = timeSeries(d);

                    ApexCharts.exec('realtime', 'updateSeries', [{
                        name: "Watts",
                        data: data
                    }])
                }
            })
    }

    onHourClick = param => e => {

        this.setState({
            hourLag: param
        }, () => {
            // Re-render the chart
            this.energyLineChart();
            this.startUpdatingData();
        })
    }

    render() {
        return (

            <Container fluid>
                <Row>
                    <Col xs={12} className="mb-3 mt-3">
                        <div className="text-left">
                            <DropdownButton variant="secondary" id="dropdown-basic-button dropdown-menu-right pull-right" title=" Facility ">
                                <Dropdown.Item onClick={this.selectFacility}>facility_01</Dropdown.Item>
                                <Dropdown.Item onClick={this.selectFacility}>facility_02</Dropdown.Item>
                            </DropdownButton>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} className="mb-3 mb-xs-4 align-items-stretch">
                        <div className="card-deck custom-card-deck ">
                            <KpiCard header="Wind" src={process.env.PUBLIC_URL + '/windsock.png'} data={[{ "label": "(mPh)", "value": this.state.wind.mph }, { "label": "(Direction)", "value": this.state.wind.direction }]} alt="-" />
                            <KpiCard header="Energy" src={process.env.PUBLIC_URL + '/logo192.png'} data={[{ "label": "(watts)", "value": this.state.energy }, { "label": "(State)", "value": "Normal" }]} alt="-" label1="(Watts)" value1={this.state.energy} />
                            <KpiCard header="Tank" src={process.env.PUBLIC_URL + '/water-tank.png'} data={[{ "label": "(Liters)", "value": this.state.tank.liters }, { "label": "(ph)", "value": this.state.tank.pH }]} alt="-" />
                            <StatusCard facility={this.state.currentFacility} />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} className="mb-3">
                        <ToggleButtonGroup type="checkbox">
                            <ToggleButton variant="secondary" onClick={this.onHourClick(1)} >Last Hour</ToggleButton>
                            <ToggleButton variant="secondary" onClick={this.onHourClick(2)} >Last 2 Hours</ToggleButton>
                            <ToggleButton variant="secondary" onClick={this.onHourClick(4)} >Last 4 Hours</ToggleButton>
                        </ToggleButtonGroup>
                    </Col>
                </Row>
                <Row>
                    <Col lg={9} xs={12} className="mb-3">
                        <div className="card card-dark mb-xs-4">
                            <div className="card-body">
                                <div id="chartReal">
                                    <ReactApexChart options={this.state.options} series={this.state.series} type="line" height="350" />
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col lg={3} xs={12}>
                        <Map facility={this.state.currentFacility} />
                    </Col>
                </Row>
            </Container>

        )
    }
}

export default Body;