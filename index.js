const config = require('config');
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const helmet = require('helmet');
const morgan = require('morgan'); //logger

const Joi = require('joi');
const express = require('express');
const logger = require('./middleware/logger');
const courses = require('./routes/courses')
const home = require('./routes/home')

const app = express();

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get('env')}`);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses);

app.use('/', home);



//Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server Name: ' + config.get('mail.host'));


if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    // console.log('Morgan enabled..');
    startupDebugger('Morgan enabled...');
}

dbDebugger('')

app.use(logger);

app.use(function (req, res, next) {
    console.log('Authenticating...');
    next();
});




const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));