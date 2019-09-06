import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
import ApexCharts from 'apexcharts';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import KpiCard from '../kpiCard';
import timeSeries from '../../functions/timeSeries';


var data = [];
class Body extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.selectFacility = this.selectFacility.bind(this);
        this.BASE_URL = 'https://iotsimbackend.azurewebsites.net/api/';
        this.chartRef = null;
        this.state = {
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
                    id: 'realtime',
                    zoom: {
                        enabled: false
                    }
                },
                colors: ['#3957ab', '#77B6EA'],
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'smooth'
                },
                animations: {
                    enabled: true,
                    easing: 'linear',
                    dynamicAnimation: {
                        speed: 1000
                    }
                },
                title: {
                    text: 'Wattage',
                    align: 'left'
                },
                grid: {
                    row: {
                        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.5
                    },
                },
                xaxis: {
                    type: 'datetime'
                },
                tooltip: {
                    enabled: true, //TODO: Fix this
                    followCursor: true,
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
            clearInterval(this.chartInterval);
            this.energyLineChart();
            this.startUpdatingData();

        })
    }

    // Create the wattage time series chart
    energyLineChart() {
        var now = new Date();
        now.setHours(now.getHours() - 1);
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


    chartInterval = null;
    startUpdatingData() {

        setInterval(() => {

            this.getDataFor('/devices/facility/' + this.state.currentFacility + '/type/wind?last=true', 'wind');
            this.getDataFor('/devices/facility/' + this.state.currentFacility + '/type/energy?last=true', 'energy');
            this.getDataFor('/devices/facility/' + this.state.currentFacility + '/type/tank?last=true', 'tank');

        }, 2000);

        this.chartInterval = setInterval(() => {

            var now = new Date();
            now.setHours(now.getHours() - 1);
            var oneHourAgo = now.getTime().toString();
            this.getDataFor('/devices/facility/' + this.state.currentFacility + '/type/energy/gte/' + oneHourAgo, 'energyTs');

        }, 30000);
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

    render() {
        return (
            <div className="row mt-5 mt-xs-4">

                <div className="col-3">
                    <div className="card custom-card mb-5 mb-xs-4">
                        <div className="card-body">
                            <DropdownButton id="dropdown-basic-button" title="Facility">
                                <Dropdown.Item onClick={this.selectFacility}>facility_01</Dropdown.Item>
                                <Dropdown.Item onClick={this.selectFacility}>facility_02</Dropdown.Item>
                            </DropdownButton>
                        </div>
                        <div>
                            <p>Facility: {this.state.currentFacility}</p>
                        </div>
                    </div>

                </div>

                <div className="col-12 mb-3">
                    <div className="card-deck custom-card-deck">
                        <KpiCard header="Wind" src={''} data={[{ "label": "(mPh)", "value": this.state.wind.mph }, { "label": "(Direction)", "value": this.state.wind.direction }]} alt="-" />
                        <KpiCard header="Energy" src={''} data={[{ "label": "(watts)", "value": this.state.energy }, { "label": "(State)", "value": "Normal" }]} alt="-" label1="(Watts)" value1={this.state.energy} />
                        <KpiCard header="Tank" src={''} data={[{ "label": "(Liters)", "value": this.state.tank.liters }, { "label": "(ph)", "value": this.state.tank.pH }]} alt="-" />
                    </div>
                </div>

                <div className="col-12">
                    <div className="card custom-card mb-5 mb-xs-4">
                        <div className="card-body">
                            <div id="chartReal">
                                <ReactApexChart options={this.state.options} series={this.state.series} type="line" height="350" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Body;