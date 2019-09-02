/**
 * Convert object array into time series data.
 *
 */
function timeSeries(data){

    var ret = []; data.forEach(val =>{

        var entry = [new Date(val.timestamp),val.data.watts];

        ret.push(entry);
    })

    return ret;
}

export default timeSeries;