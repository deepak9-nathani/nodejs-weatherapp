const request = require('request')

const weather = (latitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=7d4e4d51d3bacde608dc90417fc144a0&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'&units=m'
    request({url , json:true},(error,{body})=>{
            if(error)
            {
                callback('cant connect to api',undefined)
            }
            else if(body.error)
            {
                callback('Enter Location properly',undefined)
            }
            else
            {
                callback(undefined,'The temprature is '+ body.current.temperature+' and it feels like '+body.current.feelslike+' degree celsius (last updated on '+body.current.observation_time+')')

            }
    })
}
module.exports = weather