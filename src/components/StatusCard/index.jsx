import React, { Component } from 'react';
import 'status-indicator/styles.css';
import '../dot.css';

/**
 * **StatusCard Class**
 *
 * Presentation component
 *
 * Display data on the status of the IoT facility
 *
 */
class StatusCard extends Component {
  constructor(props) {
    super(props);
    this.API_URL = 'https://iotsimbackend.azurewebsites.net/api/devices/facility/facility_01/type/tank?last=true';
    this.state = {
      online: false,
    };
  }


  getServerStaus() {
    fetch(this.API_URL).then((response) => {
      if (response.status === 200) {
        this.setState({
          online: true,
        });
      } else {
        this.setState({
          online: false,
        });
      }
    });
  }


  async componentDidMount() {
    this.getServerStaus();
  }


  render() {
    return (
      <div className="card card-dark">
        <div className="card-body">
          <div className="img-responsive float-right">
            {this.state.online ? <status-indicator positive pulse /> : <status-indicator negative pulse /> }
            {' '}
          </div>
          <h2 className="card-title mb-4">
            {this.props.facility}
            {' '}
          </h2>
          <h6>Energy, Wind, and Tank IoT Monitoring</h6>
        </div>
      </div>
    );
  }
}

export default StatusCard;
