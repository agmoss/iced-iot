import React, {Component} from 'react';
import './splash-screen.css';


function LoadingMessage() {
  return (
    <div className="splash-screen">
      Loading Dashboard
      <div className="loading-dot">.</div>
    </div>
  );
}

function withSplashScreen(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);

      this.state = {
        loading: true,
        data:{}
      };
    }

    getData(ref){

      return new Promise((resolve, reject) => {
  
        fetch('https://iotsimbackend.azurewebsites.net/api/devices/facility/facility_01')
        .then(resp=> resp.json())
        .then(resp => ref.setState({data:resp}))
        .then(resp => resolve(resp))
        });

    }

    async componentDidMount() {
      try {

        await this.getData(this);

        setTimeout(() => {
          this.setState({
            loading: false,
          });
        }, 1500)

      } catch (err) {
        console.log(err);
        this.setState({
          loading: false,
        });

      }
    }

    render() {
      // while checking user session, show "loading" message
      if (this.state.loading) return LoadingMessage();

      // otherwise, show the desired route
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };
}

export default withSplashScreen;