const port = process.env.PORT || 4000;
const env = process.env.NODE_ENV || 'dev';
const dbURI = `mongodb://localhost:27017/project-03-${env}`;
const secret = 'shhh';

module.exports = { port, dbURI, secret };
