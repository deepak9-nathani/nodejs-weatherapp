const path = require('path')
const express = require('express')
const hbs = require('hbs')
const gecode = require('./utils/gecode')
const weather = require('./utils/weather')


const app = express()
const port = process.env.PORT || 3000

const publicDir = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../template/views')
const Path = path.join(__dirname,'../template/partials')

app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(Path)

app.use(express.static(publicDir))
app.get('',(req,res)=>{
    res.render('index',{
        name:'deepak'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        name:'deepak'

    })
})


app.get('/help',(req,res)=>{
    res.render('help',{
        mail:'something@gmail.com',
        name:'deepak'

    })
    
})
app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
       return res.send({
            error:"Cant send File Error Enter Location Name Properly"
        })
    }
  
    const address = req.query.address
    gecode(address,(error,response)=>{
        if(error)
        {
            return res.send(error);
        }
        const lat = response.latitude
        const long = response.longitude
        const location = response.location
        weather(lat,long,(error,Wresponse)=>{
            if(error)
            {
                return res.send(error)
            }
                const location = Wresponse.location
                const temprature = Wresponse.temprature
                const forecast = Wresponse.forecast
                res.send({
                    address:req.query.address,
                    location:response.location,
                    forecast:Wresponse
                })
        })
    })

    
})
    

app.get('/help/*',(req,res)=>{
    res.render('404',{
        mail:'something@gmail.com',
        name:'deepak',
        message: 'Help page not found',
        title:'404'

    })
    
})
app.get('/*',(req,res)=>{
    res.render('404',{
        mail:'something@gmail.com',
        name:'deepak',
        message: 'Not Found',
        title:'404'

    })
    
})






app.listen(port,()=>{
    console.log("server is up" + port)
})