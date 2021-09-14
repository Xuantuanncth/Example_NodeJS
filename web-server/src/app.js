const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewDirectoryPath = path.join(__dirname,'../views')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views',viewPath);
hbs.registerPartials(partialsPath)

//Setup static directory to service
app.use(express.static(publicDirectoryPath))


app.get('/',(req,res)=>{
    res.render('index',{
        title: 'Weather app',
        name: 'The Chosen One'
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title:'About Me',
        name:'Wall-e'
    })
})

app.get('/help',(req, res)=>{
    res.render('about',{
        title:'Page for help me',
        name:'Wall-e'
    })
})

app.get('/product',(req,res) => {
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        product:[]
    })
})

app.get('/weather',(req, res) =>{
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address 1'
        })
    }
    console.log(req.query)
    geocode(req.query.address, (error, response) => {
        if (error) {
            return res.send({error})
        }

        forecast(response.latitude, response.longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                temperature:forecastData,
                location:response.location,
                address:req.query.address
            })
        })
    })
})

app.get('/help/*',(req, res)=>{
    res.send('Page do not support')
})

app.get('*', (req, res)=>{
    res.render('404',{
        title:'404',
        errormessage:'Page not found',
        name:'Wall-e'
    })
})

app.listen(port,()=>{
    console.log('App listen in port',port)
})