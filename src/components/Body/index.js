
import React from 'react';
import KpiCard from '../kpiCard';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import Widgets from 'fusioncharts/fusioncharts.widgets';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

import timeSeries from '../../functions/timeSeries';

ReactFC.fcRoot(FusionCharts, Charts, Widgets, FusionTheme);

class Body extends React.Component {
    constructor(props) {
        super(props);
        this.BASE_URL = 'https://iotsimbackend.azurewebsites.net/api/';
        this.chartRef = null;
        this.state = {
            facility1Devices:'-',
            facility2Devices:'-',
            wind:'-',
            tank:'-',
            energy:'-',
            windTs:'-',
            energyTs:'-',
            tankTs:'-',
            showChart: false,
            initValue: 0,
            dataSource: {
                "chart": {
                    "caption": "Facility Wattage",
                    "subCaption": "",
                    "xAxisName": "Local Time",
                    "yAxisName": "watts",
                    "numberPrefix": "-->",
                    "refreshinterval": "2",
                    "slantLabels": "1",
                    "numdisplaysets": "10",
                    "labeldisplay": "rotate",
                    "showValues": "0",
                    "showRealTimeValue": "0",
                    "theme": "fusion"
                },
                "categories": [{
                    "category": [{
                        "label": "Time"
                    }]
                }],
                "dataset": [{
                    "data": [{
                        "value": 0
                    }]
                }]
            }
        };
        this.chartConfigs = {
            type: 'realtimeline',
            renderAt: 'container',
            width: '100%',
            height: '350',
            dataFormat: 'json'
        };
    }

    componentDidMount() {

        var now = new Date();
        now.setHours(now.getHours()-1);

        this.getDataFor('/devices/facility/facility_01/type/energy', 'energyTs');
        this.getDataFor('/devices/facility/facility_01/type/wind?last=true','wind');
        this.getDataFor('/devices/facility/facility_01/type/energy?last=true','energy');
        this.getDataFor('/devices/facility/facility_01/type/tank?last=true','tank');
        
    }

    startUpdatingData() {
        setInterval(() => {
            fetch(this.BASE_URL + '/devices/facility/facility_01/type/energy')
                .then(res => res.json())
                .then(d => {

                    var data = timeSeries(d);
                    var timeTs = data.map(function(value,index) { return value[0]; });
                    var wattsTs = data.map(function(value,index) { return value[1]; });

                    let x_axis = timeTs;
                    let y_axis = wattsTs;
                    this.chartRef.feedData("&label=" + x_axis + "&value=" + y_axis);
                });
        }, 20000);
    }


    // TODO: Fix this
    getDataFor(conversion, prop) {
        fetch(this.BASE_URL + conversion, {
            mode: 'cors'
        })
            .then(res => res.json())
            .then(d => {
                if (prop === 'energyTs') {

                    const dataSource = this.state.dataSource;

                    var data = timeSeries(d);
                    var timeTs = data.map(function(value,index) { return value[0]; });
                    var wattsTs = data.map(function(value,index) { return value[1]; });

                    dataSource.chart.yAxisMaxValue = parseInt(wattsTs.max) + 5;
                    dataSource.chart.yAxisMinValue = parseInt(wattsTs.min) - 5;
                    //dataSource.dataset[0]['data'][0].value = wattsTs;


                    this.setState({
                        showChart: true,
                        dataSource: dataSource,
                        //initValue: wattsTs
                    }, () => {

                        this.startUpdatingData();
                    })
                }

                if (prop === 'wind'){
                    this.setState({
                        [prop]: d.data.mph
                    });
                }

                if (prop === 'energy'){
                    this.setState({
                        [prop]: d.data.watts
                    });
                }

                if (prop === 'tank'){
                    this.setState({
                        [prop]: d.data.liters
                    });
                }
            })
    }

    static addLeadingZero(num) {
        return (num <= 9) ? ("0" + num) : num;
    }


    getChartRef(chart) {
        this.chartRef = chart;
    }

    render() {
        return (
            <div className="row mt-5 mt-xs-4">
                <div className="col-12 mb-3">
                    <div className="card-deck custom-card-deck">
                        <KpiCard header="Wind" src={'/wind.png'} alt="-" label="(mPh)" value={this.state.wind} />
                        <KpiCard header="Energy" src={'/energy.png'} alt="-" label="(Watts)" value={this.state.energy} />
                        <KpiCard header="Tank" src={'/tank.png'} alt="-" label="(liters)" value={this.state.tank} />
                    </div>
                </div>
                <div className="col-12">
                    <div className="card custom-card mb-5 mb-xs-4">
                        <div className="card-body">
                            {
                                this.state.showChart ?
                                    <ReactFC
                                        {...this.chartConfigs}
                                        dataSource={this.state.dataSource}
                                        onRender={this.getChartRef.bind(this)} /> : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Body;