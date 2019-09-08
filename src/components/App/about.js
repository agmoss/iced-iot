import React, { Component, Fragment } from 'react';

import "bootstrap/dist/css/bootstrap.css";
import '../style.css';

import Navig from '../Nav';

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
                                    <h1 className = "logo-header">Sytems Architecture</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="container">
                        <div class="row">
                            <div class="col-12">
                                <div class="text-center">
                                    <div>
                                    <img src={process.env.PUBLIC_URL + '/systems-architecture.png'} alt="Sytem Architecture"/>
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