import React, { Component } from 'react';
import './App.css';

import Header from '../Header';
import Body from '../Body';
import "bootstrap/dist/css/bootstrap.css";
import '../style.css';
import Container from 'react-bootstrap/Container';


class App extends Component {

	render() {

		return (

			<div className="App">
				<Header branding="IoT Dashboard" />
				<Container fluid>
					<Body />
				</Container>
			</div>
		);
	}
}

export default App;