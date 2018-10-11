'use strict';
var express  = require('express'),
bodyParser   = require('body-parser'),
http         = require('http'),
config       = require('./config'),
server       = express(),
mongoose     = require('mongoose'),
TeamInfo     = require('./API/Models/TeamInfo'), //created model loading here
GameSchedule = require('./API/Models/GameSchedule');
const PORT = process.env.PORT || 5000
const path = require('path')
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(config.dbUrl);
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
var routes = require('./API/Routes/Routes'); //importing route
routes(server); //register the route
server.use(express.static(path.join(__dirname, 'public')))
server.set('views', path.join(__dirname, 'views'))
server.set('view engine', 'ejs')
server.get('/', (req, res) => res.render('pages/index'))
server.listen(PORT, () => console.log(`Listening on ${ PORT }`))
;
