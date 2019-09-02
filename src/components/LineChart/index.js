import timeSeries from '../../functions/timeSeries';
import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts'

import ApexCharts from 'apexcharts'

var data = [];

class LineChart extends React.Component {

    constructor(props) {
        super(props);

        this.BASE_URL = 'https://iotsimbackend.azurewebsites.net/api/';

        this.state = {

            energyTs: '-',

            options: {
                chart: {
                    id: 'realtime',
                    zoom: {
                        enabled: false
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'straight'
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
                }
            },
            series: [{
                data: data
            }],
        }
    }

    componentDidMount() {

        var now = new Date();
        now.setHours(now.getHours() - 1);
        var oneHourAgo = now.getTime().toString();
        this.getDataFor('/devices/facility/facility_01/type/energy/gte/' + oneHourAgo, 'energyTs');
    }


    getDataFor(conversion, prop) {
        fetch(this.BASE_URL + conversion, {
            mode: 'cors'
        })
            .then(res => res.json())
            .then(d => {

                var data = timeSeries(d);

                ApexCharts.exec('realtime', 'updateSeries', [{
                    data: data
                }])

                if (prop === 'energyTs') {
                    this.startUpdatingData();
                }
            })
    }

    startUpdatingData() {
        setInterval(() => {

            var now = new Date();
            now.setHours(now.getHours() - 1);

            var oneHourAgo = now.getTime().toString();

            fetch(this.BASE_URL + '/devices/facility/facility_01/type/energy/gte/' + oneHourAgo)
                .then(res => res.json())
                .then(d => {

                    var data = timeSeries(d);

                    ApexCharts.exec('realtime', 'updateSeries', [{
                        data: data
                    }])

                });
        }, 10000);
    }

    render() {

        return (

            <div id="chartReal">
                <ReactApexChart options={this.state.options} series={this.state.series} type="line" height="350" />
            </div>

        );
    }
}


export default LineChart;