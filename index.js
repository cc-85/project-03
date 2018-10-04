//3rd party packages
const express = require('express');
//IMPORTANT -  used for getting form data from data from the client
const bodyParser = require('body-parser');
const routes = require('./config/routes');
const errorHandler = require('./lib/errorHandler');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird'); // add bluebird promises to mongoose

//create the app
const app = express();
const { port, dbURI } = require('./config/environment');

//connect to the database
mongoose.connect(dbURI);

//use 3rd party packages - app.use
app.use(express.static(`${__dirname}/public`));

//add body parsed before the routes
app.use(bodyParser.json()); //set up to handle JSON

// add routes here
// don't forget to prefix routes with `/api`
app.use('/api', routes);

//remove later
//app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));

// error handler goes here...
app.use(errorHandler);

app.listen(port, () => console.log(`Express is listening on port ${port}`));
