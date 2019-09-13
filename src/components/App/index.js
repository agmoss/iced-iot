import React, { Component } from 'react';

import '../style.css';

// Components
import Navig from '../Nav';
import KpiCards from '../kpiCards';
import FacilitySelector from '../FacilitySelector';
import WattsLineChart from '../WattsLineChart';
import Map from '../Map';
import HourButtons from '../HourButtons';

// Bootstrap
import "bootstrap/dist/css/bootstrap.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

// Loading spinner
import LoadingOverlay from 'react-loading-overlay';

class App extends Component {

	constructor(props) {
		super(props);
		this.selectFacility = this.selectFacility.bind(this);
		this.onHourClick = this.onHourClick.bind(this);
		this.state = {
			loading: true,
			hourLag: 1,
			currentFacility: "facility_01",
		}
	}

	selectFacility(event) {
		this.setState({
			currentFacility: event.target.innerText
		})
	}

	onHourClick = param => e => {

		this.setState({
			hourLag: param
		})
	}

	updateLoading = (loadingStatus) =>{

		this.setState({
			loading:loadingStatus
		})

	}

	render() {

		return (

			<div className="App">

				<Navig />
				<Container fluid>

					<LoadingOverlay
						active={this.state.loading}
						styles={{
							wrapper: {}
						}}
						spinner
						text='Loading ...'
					></LoadingOverlay>

					<FacilitySelector selectFacility={this.selectFacility.bind(this)}></FacilitySelector>
					<KpiCards currentFacility={this.state.currentFacility}></KpiCards>
					<HourButtons onHourClick={this.onHourClick.bind(this)}></HourButtons>
					<Row>
						<WattsLineChart currentFacility={this.state.currentFacility} hourLag={this.state.hourLag} updateLoading={this.updateLoading} ></WattsLineChart> 
						<Map facility={this.state.currentFacility} />
					</Row>

				</Container>

			</div>
		);
	}
}

export default App;