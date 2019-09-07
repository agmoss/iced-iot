import React, { Component } from 'react';

import '../style.css';

import Navig from '../Nav';
import Body from '../Body';
import "bootstrap/dist/css/bootstrap.css";

import Container from 'react-bootstrap/Container';


class App extends Component {

	render() {

		return (

			<div className="App">
				 <Navig/> 
				<Container fluid>
					<Body />
				</Container>
			</div>
		);
	}
}

export default App;