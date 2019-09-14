import React, { Component } from 'react';

// Component
import KpiCards from '../../components/KpiCards';

class KpiCardsContainer extends Component {
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
            React.createElement(KpiCards,{wind: this.state.wind, energy:this.state.energy, tank:this.state.tank, currentFacility:this.props.currentFacility})
        )
    }
}

export default KpiCardsContainer;