var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const axios = require('axios');
const db = require('./db');
const NodeArticles = require('./node_articles');

var app = express();

// configurations
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//security
app.use(helmet());

//performance
app.use(compression());

//database
connect();

//routes
app.get('/angular/issues', async (req, res, next) => {
	try {
		let url = 'https://api.github.com/search/issues?q=repo:angular/components';
		const page = req.query['page'];
		if(page) {
			url += `&page=${page}`;
		}
		const response = await axios.default.get(url);
		if(response.status === 200) {
			const items = response.data.items.map(d => {
				return {
					'title': d.title,
					'state': d.state,
					'created_at': d.created_at,
					'number': d.number
				};
			});
			res.status(200).send({
				'items': items,
				total: response.data.total_count
			});
		}
		else {
			console.log(response);
			res.status(500).send({'msg': 'An error has ocurred'});
		}
	} catch (err) {
		console.log(err);
		res.status(500).send({'msg': 'An error has ocurred'});
	}
});

app.get('/nodejs/articles', async (req, res, next) => {
	try {
		const data = await NodeArticles.model.find().lean().exec();
		const response = {
			'items': data,
			'total': data.length
		};
		res.status(200).send(response);
	} catch (err) {
		console.log(err);
		res.status(500).send({'msg': 'An error has ocurred'});
	}
});

async function connect() {
	await db.connect();
}

module.exports = app;