import React, { Component } from 'react';
import Navig from '../../components/Nav';

/**
 * **About Class**
 *
 * Render the "About" page
 *
 */
class About extends Component {
  render() {
    return (
      <>
        <div className="App">
          <Navig />
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="text-center">
                  <div>
                    <h1 className="logo-header">
                      Sytems Architecture
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="text-center">
                  <div>
                    <img
                      className="architecture"
                      src={`${process.env.PUBLIC_URL}/system.png`}
                      alt="Sytems Architecture"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default About;
