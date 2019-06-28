'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	author: mongoose.Schema.Types.String,
	title: mongoose.Schema.Types.String,
	created_at: mongoose.Schema.Types.Date
},{
	collection: 'node_articles'
});

module.exports = {
	model: mongoose.model('NodeArticles', schema),
	schema: schema
};