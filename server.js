const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) =>{ //Guard?
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) =>{
        err && console.log('error');

    });
    //next();
});

//app.use((req, res, next) =>{
//    res.render('maintance.hbs');
//});

app.use(express.static(__dirname + '/public')); //public folder


hbs.registerHelper('getYear', () =>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) =>{
    return text.toUpperCase();
});

app.get('/', (req, res) =>{
    res.render('home.hbs', {
        title: 'Home page',
        welcomeMessage: 'Welcome'
    })
});

app.get('/about', (req, res) =>{
    res.render('about.hbs', {
        title: 'About page'
    })
});

app.get('/bad', (req, res) =>{
    res.send({
        errorMessage: 'Unable to handle request'
    });
});

app.listen(3000, () =>{
    console.log('Server is up on port 3000');
});