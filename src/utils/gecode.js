const request = require('request')
const gecode = (address,callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiZGVlcGFrMiIsImEiOiJja3BzYWY3NWswM3g2Mm50Z3g2bHN6N3p3In0.8Zu_LV50s_ayDSyPepb3xQ'
    request({url,json:true},(error,{body})=>{
        if(error)
        {
            callback("cant connect to API",undefined)
        }
        else if(body.features.length === 0)
        {
            callback("Enter Location properly. Try Again",undefined)
        }
        else
        {
            callback(undefined,{
                latitude :  body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })
}
module.exports = gecode