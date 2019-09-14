import React, { Component } from 'react';

// Bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

/**
 * **FacilitySelector Class**
 *
 * DDL for changing the currentFacility/selectFacility prop
 * 
 * @constructor
 * @param {Object} props - properties from parent
 */
class FacilitySelector extends Component {
    constructor(props) {
        /** currentFacility is passed here */
        super(props);
    }

    render() {
        return (

            <Row>
                <Col xs={12} className="mb-3 mt-3">
                    <div className="text-left">
                        <DropdownButton variant="secondary" id="dropdown-basic-button dropdown-menu-right pull-right" title=" Facility ">
                            <Dropdown.Item onClick={this.props.selectFacility}>facility_01</Dropdown.Item>
                            <Dropdown.Item onClick={this.props.selectFacility}>facility_02</Dropdown.Item>
                        </DropdownButton>
                    </div>
                </Col>
            </Row>

        )
    }
}

export default FacilitySelector;