import React, { Component, Fragment } from 'react';

import "bootstrap/dist/css/bootstrap.css";
import '../style.css';

import Navig from '../Nav';
import Container from 'react-bootstrap/Container';


class About extends Component {

    render() {

        return (

            <Fragment>
                <div className="App">
                    <Navig/>
                    <div class="container">
                        <div class="row">
                            <div class="col-12">
                                <div class="text-center">
                                    <div>
                                        <p>TODO: Add info about the project and trip</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default About;