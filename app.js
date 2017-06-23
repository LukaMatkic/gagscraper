var express = require ('express');
var cheerio = require('cheerio');
var request = require('request');
var bodyParser = require('body-parser');
var app = express();
var port     = process.env.PORT || 3000;

var urlencodedParser = bodyParser.urlencoded({extended:false}); // Pretvaramo http zahtjev
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./views'));

app.listen(port);

console.log('SERVER STARTED > You are listening to port: ' + port);

require('./controllers/routes.js')(app);
