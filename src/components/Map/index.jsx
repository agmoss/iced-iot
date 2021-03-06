import React from 'react';

// Including the react-fusioncharts component
import ReactFC from 'react-fusioncharts';

// Including the fusioncharts library
import FusionCharts from 'fusioncharts';

// Including the map renderer
import FusionMaps from 'fusioncharts/fusioncharts.maps';

// Including the map definition file
import World from 'fusioncharts/maps/fusioncharts.world';

// Including the theme as fusion
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

// Bootstrap
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

// Adding the map as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, FusionMaps, World, FusionTheme);

/**
 * **Map Class**
 *
 * Map for displaying the geographic location of IoT facilities
 *
 */
class Map extends React.Component {
  createConfigs() {
    let chartConfigs = null;
    if (this.props.facility === 'facility_01') {
      chartConfigs = {
        type: 'World',
        width: '100%',
        renderAt: 'chart-container',
        containerBackgroundOpacity: '0',
        dataFormat: 'json',
        dataSource: {
          // Map Configuration
          chart: {
            theme: 'fusion',
            markerBgColor: '#eaff00',
            markerRadius: '10',
            showMarkerLabels: '1',
            entityFillHoverColor: '#E5E5E9',
            bgcolor: '#eaff00',
            bgalpha: '0',
          },
          colorrange: {
            gradient: 0,
          },
          markers: {
            items: [
              {
                id: 'lon',
                shapeid: 'triangle',
                x: '110',
                y: '130',
                label: 'YYC',
                tooltext: 'Calgary Facility {br}IoT Facility',
                labelpos: 'left',
              },
            ],
          },
        },
      };
    } else {
      chartConfigs = {
        type: 'World',
        width: '100%',
        renderAt: 'chart-container',
        containerBackgroundOpacity: '0',
        dataFormat: 'json',
        dataSource: {
          // Map Configuration
          chart: {
            theme: 'fusion',
            markerBgColor: '#eaff00',
            markerRadius: '10',
            showMarkerLabels: '1',
            entityFillHoverColor: '#E5E5E9',
            bgcolor: '#eaff00',
            bgalpha: '0',
          },
          colorrange: {
            gradient: 0,
          },
          markers: {
            items: [
              {
                id: 'lon',
                shapeid: 'triangle',
                x: '190',
                y: '140',
                label: 'YYZ',
                tooltext: 'Toronto Facility {br}IoT Facility',
                labelpos: 'left',
              },
            ],
          },
        },
      };
    }

    return chartConfigs;
  }

  render() {
    const configs = this.createConfigs();

    return (
      <Col lg={3} xs={12}>
        <Card className="card-dark mb-5 mb-xs-4">
          <Card.Header>Facility Location</Card.Header>
          <Card.Body>
            <ReactFC {...configs} />
          </Card.Body>
        </Card>
      </Col>
    );
  }
}

export default Map;
