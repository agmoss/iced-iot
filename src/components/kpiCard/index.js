import React, { Component } from 'react';

class KpiCard extends Component {
    constructor(props) {
        super(props);
    }

    createPair(pair) {

        const value = typeof parseInt(pair.value) === 'number' && !isNaN(parseInt(pair.value)) ? Math.round(parseInt(pair.value)) : pair.value;

        return <React.Fragment>
            <h2 className="mb-1 text-primary">{value}</h2>
            <p className="card-text"><small className="text-muted">{pair.label}</small></p>
        </React.Fragment>

    }

    createPairs(pairs) {

        return pairs.map(this.createPair)

    }

    render() {
        return (
            <div className="card mr-0 custom-card">
                <div className="card-body">
                    <img src={this.props.src} alt={this.props.src} className="img-responsive float-right" />
                    <h6 className="card-title mb-4 ">{this.props.header} </h6>
                    {this.createPairs(this.props.data)}
                </div>
            </div>
        )
    }
}

export default KpiCard;