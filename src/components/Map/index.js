// Step 1 - Including react
import React from 'react';
import ReactDOM from 'react-dom';

// Step 2 - Including the react-fusioncharts component
import ReactFC from 'react-fusioncharts';

// Step 3 - Including the fusioncharts library
import FusionCharts from 'fusioncharts';

// Step 4 - Including the map renderer
import FusionMaps from 'fusioncharts/fusioncharts.maps';

// Step 5 - Including the map definition file
import World from 'fusioncharts/maps/fusioncharts.world';


// Step 6 - Including the theme as fusion
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

// Step 7 - Adding the map as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, FusionMaps, World, FusionTheme);

// Step 8 - Creating the JSON object to store the map configurations
var chartConfigs = {
    type: 'World',
    // width: '800',
    // height: '550',
    dataFormat: 'json',
    dataSource: {
        // Map Configuration
        "chart": {
            "caption": "Facility Location",
            "theme": "fusion",
            "markerBgColor": "#FF0000",
            "markerRadius": "10",
            "showMarkerLabels": "1",
            "entityFillColor": "#A8A8A8",
            "entityFillHoverColor": "#E5E5E9"
        },
        "colorrange": {
            "gradient": 0,
        },
        "markers": {
            "items": [{
                "id": "lon",
                "shapeid": "triangle",
                "x": "340.23",
                "y": "125.9",
                "label": "LHR",
                "tooltext": "Heathrow International Airport {br}IACL Code : EGLL",
                "labelpos": "left"
            }]
        }
    }
}
// Step 10 - Creating the DOM element to pass the react-fusioncharts component
class Map extends React.Component {

    constructor(props) {
        super(props);
    }

    createConfigs() {

        var chartConfigs = null;
        if (this.props.facility === "facility_01") {
            chartConfigs = {
                type: 'World',
                // width: '800',
                // height: '550',
                dataFormat: 'json',
                dataSource: {
                    // Map Configuration
                    "chart": {
                        "caption": "Facility Location",
                        "theme": "fusion",
                        "markerBgColor": "#FF0000",
                        "markerRadius": "10",
                        "showMarkerLabels": "1",
                        "entityFillColor": "#A8A8A8",
                        "entityFillHoverColor": "#E5E5E9"
                    },
                    "colorrange": {
                        "gradient": 0,
                    },
                    "markers": {
                        "items": [{
                            "id": "lon",
                            "shapeid": "triangle",
                            "x": "51.05011",
                            "y": "-114.08529",
                            "label": "YYC",
                            "tooltext": "Calgary Facility {br}IoT Facility",
                            "labelpos": "left"
                        }]
                    }
                }
            }
        } else {


            var chartConfigs = {
                type: 'World',
                // width: '800',
                // height: '550',
                dataFormat: 'json',
                dataSource: {
                    // Map Configuration
                    "chart": {
                        "caption": "Facility Location",
                        "theme": "fusion",
                        "markerBgColor": "#FF0000",
                        "markerRadius": "10",
                        "showMarkerLabels": "1",
                        "entityFillColor": "#A8A8A8",
                        "entityFillHoverColor": "#E5E5E9"
                    },
                    "colorrange": {
                        "gradient": 0,
                    },
                    "markers": {
                        "items": [{
                            "id": "lon",
                            "shapeid": "triangle",
                            "x": "340.23",
                            "y": "125.9",
                            "label": "LHR",
                            "tooltext": "Heathrow International Airport {br}IACL Code : EGLL",
                            "labelpos": "left"
                        }]
                    }
                }

            }

        }

        return chartConfigs;

    }



    render() {

        var configs = this.createConfigs();

        return (
            <ReactFC
                {...configs} />
        );

    }
}

export default Map