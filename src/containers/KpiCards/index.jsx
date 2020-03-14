import React, { Component } from 'react';

// Component
import KpiCards from '../../components/KpiCards';

/**
 * KpiCardsContainer.
 *
 * @constructor
 * @param {Object} props - properties from component
 */
class KpiCardsContainer extends Component {
  constructor(props) {
    super(props);
    /** API Location */
    this.BASE_URL = 'https://iotsimbackend.azurewebsites.net/api';
    /** Initial Data */
    this.state = {
      wind: '-',
      tank: '-',
      energy: '-',
    };
  }

  componentDidMount() {
    // Card data
    this.getDataFor(
      `/devices/facility/${this.props.currentFacility}/type/wind?last=true`,
      'wind',
    );
    this.getDataFor(
      `/devices/facility/${this.props.currentFacility}/type/energy?last=true`,
      'energy',
    );
    this.getDataFor(
      `/devices/facility/${this.props.currentFacility}/type/tank?last=true`,
      'tank',
    );

    // Realtime method
    this.startUpdatingData();
  }

  /**
   * **Update the card data**
   */
  startUpdatingData() {
    setInterval(() => {
      this.getDataFor(
        `/devices/facility/${this.props.currentFacility}/type/wind?last=true`,
        'wind',
      );
      this.getDataFor(
        `/devices/facility/${this.props.currentFacility}/type/energy?last=true`,
        'energy',
      );
      this.getDataFor(
        `/devices/facility/${this.props.currentFacility}/type/tank?last=true`,
        'tank',
      );
    }, 2000);
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
        mode: 'cors',
      })
        .then((res) => res.json())
        .then((d) => {
          if (value === 'wind') {
            this.setState({
              [value]: d.data,
            });
          }

          if (value === 'energy') {
            this.setState({
              [value]: d.data.watts,
            });
          }

          if (value === 'tank') {
            this.setState({
              [value]: d.data,
            });
          }
        })
        .then(() => resolve())
        .catch((error) => reject(error));
    });
  }

  /**
   * **Render the presentation component**
   */
  render() {
    return React.createElement(KpiCards, {
      wind: this.state.wind,
      energy: this.state.energy,
      tank: this.state.tank,
      currentFacility: this.props.currentFacility,
    });
  }
}

export default KpiCardsContainer;
