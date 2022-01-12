const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');
const port = process.env.PORT || 8000;
// const port = 8000;

// all path 
// public static path 
const staticPath = path.join(__dirname ,'../public');
const tempPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')
// console.log(partialsPath);

// static middle ware -->
app.use(express.static(staticPath))

// template engine -->
app.set('view engine', 'hbs');
app.set('views', tempPath);
hbs.registerPartials(partialsPath);

// routing -->
app.get('/', (req, res) => {
    res.render('index')
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/weather', (req, res) => {
    res.render('weather')
})



// error page 
app.get('*', (req, res) => {
    res.render('error')
})



app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})