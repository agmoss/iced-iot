import React, { Component } from 'react';

// Bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

/**
 * **HourButtons Class**
 *
 * Display toggle buttons for altering the hourLag prop
 *
 */
class HourButtons extends Component {
  render() {
    return (
      <Row>
        <Col xs={12} className="mb-3">
          <ToggleButtonGroup type="checkbox">
            <ToggleButton
              variant="secondary"
              onClick={this.props.onHourClick(1)}
            >
              Last Hour
            </ToggleButton>
            <ToggleButton
              variant="secondary"
              onClick={this.props.onHourClick(2)}
            >
              Last 2 Hours
            </ToggleButton>
            <ToggleButton
              variant="secondary"
              onClick={this.props.onHourClick(4)}
            >
              Last 4 Hours
            </ToggleButton>
          </ToggleButtonGroup>
        </Col>
      </Row>
    );
  }
}

export default HourButtons;
