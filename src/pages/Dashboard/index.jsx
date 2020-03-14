import React, { Component } from "react";

import "../../index.css";

// Components
import Navig from "../../components/Nav";
import FacilitySelector from "../../components/FacilitySelector";
import Map from "../../components/Map";
import HourButtons from "../../components/HourButtons";

// Containers
import KpiCardsContainer from "../../containers/KpiCards";
import WattsLineChartContainer from "../../containers/WattsLineChart";

// Bootstrap
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

// Loading spinner
import LoadingOverlay from "react-loading-overlay";

/**
 * **App Class**
 *
 * Main
 *
 */
class App extends Component {
    constructor(props) {
        super(props);
        /** IoT facility selection DDL */
        this.selectFacility = this.selectFacility.bind(this);
        /** hourLag button click  */
        this.onHourClick = this.onHourClick.bind(this);
        this.state = {
            loading: true,
            hourLag: 1,
            currentFacility: "facility_01",
        };
    }

    selectFacility(event) {
        this.setState({
            currentFacility: event.target.innerText,
        });
    }

    onHourClick = param => e => {
        this.setState({
            hourLag: param,
        });
    };

    updateLoading = loadingStatus => {
        this.setState({
            loading: loadingStatus,
        });
    };

    render() {
        return (
            <div className="App">
                <Navig />
                <Container fluid>
                    {/* Loading Spinner */}
                    <LoadingOverlay
                        active={this.state.loading}
                        styles={{
                            wrapper: {},
                        }}
                        spinner
                        text="Loading ..."
                    ></LoadingOverlay>

                    {/* App Content */}
                    <FacilitySelector
                        selectFacility={this.selectFacility.bind(this)}
                    ></FacilitySelector>
                    <KpiCardsContainer
                        currentFacility={this.state.currentFacility}
                    ></KpiCardsContainer>
                    <HourButtons
                        onHourClick={this.onHourClick.bind(this)}
                    ></HourButtons>
                    <Row>
                        <WattsLineChartContainer
                            currentFacility={this.state.currentFacility}
                            hourLag={this.state.hourLag}
                            updateLoading={this.updateLoading}
                        ></WattsLineChartContainer>
                        <Map facility={this.state.currentFacility} />
                    </Row>
                </Container>
            </div>
        );
    }
}

export default App;
