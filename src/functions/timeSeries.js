/**
 * Convert object array into time series data.
 *
 * @param {String} dsn - device serial number.
 * @param {String} geolocation  - location of the IoT device.
 * @param {String} type  - type of device.
 * @param {String} connectionString  - connection paramater for Azure IoT hub.
 */
function timeSeries(data){

    // var map = {}; data.forEach(function(val){
    //     console.log(val.data.watts);
    //     map[val.timestamp] = map[val.timestamp] || {};
    //     map[val.timestamp][val.data][val.watts] = map[val.timestamp][val.data][val.watts] || 0;
    //     map[val.timestamp][val.status][val.watts]++;
    //   });

    var ret = []; data.forEach(val =>{

        var entry = [new Date(val.timestamp),val.data.watts];

        ret.push(entry);
    })

    return ret;
}

export default timeSeries;