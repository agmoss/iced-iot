import React, { Component } from 'react';
import './App.css';

import Header from '../Header';
import Body from '../Body';
import "bootstrap/dist/css/bootstrap.css";
import '../style.css';


class App extends Component {

	render() {

		return (

			<div className="App">
				<Header branding="IoT Dashboard" />
				<div className="container">

					<Body />
				</div>

			</div>
		);
	}
}

export default App;