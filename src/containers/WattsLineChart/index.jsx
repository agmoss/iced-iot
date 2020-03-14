import React, { Component } from "react";

// Chart Library
import ApexCharts from "apexcharts";

// Functions
import timeSeries from "../../functions/timeSeries";

// Component
import WattsLineChart from "../../components/WattsLineChart";

var data = [];
/**
 * **WattsLineChartContainer**
 *
 * @constructor
 * @param {Object} props - properties from component
 */
class WattsLineChartContainer extends Component {
    constructor(props) {
        super(props);
        /** API Location */
        this.BASE_URL = "https://iotsimbackend.azurewebsites.net/api";
        this.chartRef = null;
        this.state = {
            /** currentFacility is a parent prop that gets set to state*/
            currentFacility: "facility_01",
            /** Initial time series lag */
            hourLag: 1,
            /** Watts time series data */
            energyTs: "-",
            /** ApexCharts Options object */
            options: {
                chart: {
                    foreColor: "#fff",
                    id: "realtime",
                    zoom: {
                        enabled: false,
                    },
                    toolbar: {
                        show: false,
                    },
                },
                grid: {
                    borderColor: "#40475D",
                },
                colors: ["#FCCF31", "#17ead9", "#f02fc2"],
                dataLabels: {
                    enabled: false,
                },
                fill: {
                    type: "gradient",
                    gradient: {
                        gradientToColors: ["#F55555", "#6078ea", "#6094ea"],
                    },
                },
                stroke: {
                    curve: "smooth",
                },
                title: {
                    text: "Wattage",
                    align: "left",
                },
                xaxis: {
                    type: "datetime",
                },
                tooltip: {
                    enabled: true,
                    followCursor: true,
                    theme: "dark",
                },
            },
            /** ApexCharts Series Object */
            series: [
                {
                    data: data,
                },
            ],
        };
    }

    /**
     * **Create the wattage time series chart**
     *
     * @async
     * IMPORTANT - This clears the global update chart interval
     */
    async energyLineChart() {
        clearInterval(this.chartInterval);
        var now = new Date();
        now.setHours(now.getHours() - this.state.hourLag);
        var xHoursAgo = now.getTime().toString();
        await this.getDataFor(
            "/devices/facility/" +
                this.state.currentFacility +
                "/type/energy/gte/" +
                xHoursAgo,
            "energyTs"
        );
    }

    async componentDidMount() {
        // Chart data
        await this.energyLineChart();

        // Realtime method
        this.startUpdatingData();

        this.props.updateLoading(false);
    }

    // Global for clearing the interval on re-render
    chartInterval = null;
    /**
     * **Update the chart data**
     */
    startUpdatingData() {
        this.chartInterval = setInterval(() => {
            var now = new Date();
            now.setHours(now.getHours() - this.state.hourLag);
            var xHoursAgo = now.getTime().toString();
            this.getDataFor(
                "/devices/facility/" +
                    this.state.currentFacility +
                    "/type/energy/gte/" +
                    xHoursAgo,
                "energyTs"
            );
        }, 10000);
    }

    /**
     * **Fetch data at specific endpoint and set state with resulting data.**
     *
     * @param {string} conversion - url extension ontop of base
     * @param {string} value - state variable to get data for
     *
     * @return {Promise}
     */
    getDataFor(conversion, value) {
        return new Promise((resolve, reject) => {
            fetch(this.BASE_URL + conversion, {
                mode: "cors",
            })
                .then(res => res.json())
                .then(d => {
                    if (value === "energyTs") {
                        var data = timeSeries(d);

                        ApexCharts.exec("realtime", "updateSeries", [
                            {
                                name: "Watts",
                                data: data,
                            },
                        ]);
                    }
                })
                .then(() => {
                    return resolve();
                })
                .catch(error => {
                    return reject(error);
                });
        });
    }

    /**
     * **Handle Props passed from parent.**
     *
     * @async
     *
     * @param {Object} nextProps - new props from parent
     */
    async componentWillReceiveProps(nextProps) {
        // Prevent unessary re-render
        if (
            nextProps.hourLag !== this.state.hourLag ||
            nextProps.currentFacility !== this.state.currentFacility
        ) {
            this.setState(
                {
                    hourLag: nextProps.hourLag,
                    currentFacility: nextProps.currentFacility,
                },
                async () => {
                    this.props.updateLoading(true);
                    await this.energyLineChart();
                    this.startUpdatingData();
                    this.props.updateLoading(false);
                }
            );
        }
    }

    /**
     * **Render the presentation component**
     */
    render() {
        return React.createElement(WattsLineChart, {
            options: this.state.options,
            series: this.state.series,
            currentFacility: this.props.currentFacility,
        });
    }
}

export default WattsLineChartContainer;
