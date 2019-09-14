import React, { Component } from 'react';

/**
 * **KpiCard Class**
 *
 * Construct each KpI card for the KpiCards render
 * 
 * @constructor
 * @param {Object} props - properties from parent
 */
class KpiCard extends Component {
    constructor(props) {
        super(props);
    }

    /**
     * Construct a data/label pair for the card
     *
     * @param {Object} pair - A metric (mph, watts) etc. to display on the card with an accompanying label
     * @return {React.Fragment} The label/value pair
     */
    createPair(pair) {

        const value = typeof parseInt(pair.value) === 'number' && !isNaN(parseInt(pair.value)) ? Math.round(parseInt(pair.value)) : pair.value;

        return <React.Fragment>
            <h2 className="text-main mb-1">{value}</h2>
            <p className="card-text"><small className="text-muted">{pair.label}</small></p>
        </React.Fragment>

    }

    /**
     * Apply createPair to each pair
     *
     * @param {Array} pairs - An array of key value data to render into a fragment
     */
    createPairs(pairs) {

        return pairs.map(this.createPair)

    }

    render() {
        return (
            <div className="card card-dark">
                <div className="card-body left-space">
                    <img src={this.props.src} alt={this.props.src} className="img-responsive float-right" />
                    <h6 className="card-title mb-4">{this.props.header} </h6>
                    {this.createPairs(this.props.data)}
                </div>
            </div>
        )
    }
}

export default KpiCard;