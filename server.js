const express = require('express');
const logger = require('./middleware/logger');
const projectRouter = require('./routers/projectRouter');
const actionRouter = require('./routers/actionRouter');
const cors = require('cors');
const server = express();
server.use(cors());
server.use(logger());
server.use(express.json());
server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);
server.use((err, req, res, next) => {
	console.log(err);
	res.status(500).json({ message: 'Something went wrong, try again...' });
});

module.exports = server;
