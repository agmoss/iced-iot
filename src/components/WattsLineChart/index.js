import React, { Component } from 'react';

// Chart Libraries
import ReactApexChart from 'react-apexcharts';
import ApexCharts from 'apexcharts';

// Functions
import timeSeries from '../../functions/timeSeries';

// Bootstrap
import Col from 'react-bootstrap/Col';

var data = [];
class WattsLineChart extends Component {
    constructor(props) {
        super(props);
        this.BASE_URL = 'https://iotsimbackend.azurewebsites.net/api/';
        this.chartRef = null;
        this.state = {
            currentFacility:'facility_01',
            hourLag:1,
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
                    enabled: true,
                    followCursor: true,
                    theme: 'dark',
                },
            },
            series: [{
                data: data
            }],
        }
    }


    // Create the wattage time series chart
    async energyLineChart() {

        clearInterval(this.chartInterval);
        var now = new Date();
        now.setHours(now.getHours() - this.state.hourLag);
        var oneHourAgo = now.getTime().toString();
        await this.getDataFor('/devices/facility/' + this.state.currentFacility + '/type/energy/gte/' + oneHourAgo, 'energyTs');

    }

    async componentDidMount() {

        // Chart data
        await this.energyLineChart();

        // Realtime method
        this.startUpdatingData();

        this.props.updateLoading(false)

    }


    // Global for clearing the interval on re-render
    chartInterval = null;
    startUpdatingData() {

        this.chartInterval = setInterval(() => {

            var now = new Date();
            now.setHours(now.getHours() - this.state.hourLag);
            var oneHourAgo = now.getTime().toString();
            this.getDataFor('/devices/facility/' + this.state.currentFacility + '/type/energy/gte/' + oneHourAgo, 'energyTs');

        }, 10000);
    }


    getDataFor(conversion, prop) {
        return new Promise((resolve, reject) => {
            fetch(this.BASE_URL + conversion, {
                mode: 'cors'
            })
                .then(res => res.json())
                .then(d => {

                    if (prop === 'energyTs') {
                        var data = timeSeries(d);

                        ApexCharts.exec('realtime', 'updateSeries', [{
                            name: "Watts",
                            data: data
                        }])
                    }
                }).then(() => {
                    return resolve();
                })
        })
    }

    // componentWillUpdate(nextProps,nextState){
        
    //     if(nextState.hourLag){
    //         this.energyLineChart();
    //         this.startUpdatingData();
    //     }
    // }

    async componentWillReceiveProps(nextProps) {
        // Prevent unessary re-render
        if (nextProps.hourLag!==this.state.hourLag || nextProps.currentFacility!==this.state.currentFacility){

            this.setState({ hourLag: nextProps.hourLag, currentFacility:nextProps.currentFacility}, async ()=>{

                this.props.updateLoading(true);
                await this.energyLineChart();
                this.startUpdatingData();
                this.props.updateLoading(false);
            });
        }
    }

    render() {
        return (

            <Col lg={9} xs={12} className="mb-3">
                <div className="card card-dark mb-xs-4">
                    <div className="card-body">
                        <div id="chartReal">
                            <ReactApexChart options={this.state.options} series={this.state.series} type="line" height="350" />
                        </div>
                    </div>
                </div>
            </Col>

        )
    }
}

export default WattsLineChart;