const port = process.env.PORT || 4000;
const env = process.env.NODE_ENV || 'dev'; //for the testing
const dbURI = process.env.MONGODB_URI || `mongodb://localhost:27017/project-03-${env}`;
const secret = process.env.SECRET || 'shhh'; // secret key to decrypt pwd

module.exports = { port, dbURI, secret, env };
