'use strict';

const mongoose = require('mongoose');
const dbConfig = require('./migrate-mongo-config');
const connectionString = `${dbConfig.mongodb.url}/${dbConfig.mongodb.databaseName}`;

const db = {
	connect: () => {
		const promise = mongoose.connect(connectionString, {
			useNewUrlParser: true
		});
		const conn = mongoose.connection;
		conn.on('error', (err) => {
			console.log(`connection error: ${err}`);
		});

		conn.once('open', () => {
			console.log('database connected!');
		});

		return promise;
	}
};

module.exports = db;