import React, { Component } from 'react';

// Chart Library
import ReactApexChart from 'react-apexcharts';

// Bootstrap
import Col from 'react-bootstrap/Col';

/**
 * WattsLineChart Class.
 *
 * Presentation component
 *
 */
class WattsLineChart extends Component {
  render() {
    return (
      <Col lg={9} xs={12} className="mb-3">
        <div className="card card-dark mb-xs-4">
          <div className="card-body">
            <div id="chartReal">
              <ReactApexChart
                options={this.props.options}
                series={this.props.series}
                type="line"
                height="350"
              />
            </div>
          </div>
        </div>
      </Col>
    );
  }
}

export default WattsLineChart;
