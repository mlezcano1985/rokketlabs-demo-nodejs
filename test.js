/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./app');

// Configure chai
chai.use(chaiHttp);
chai.should();

describe('Angular Issues', () => {
	describe('GET /angular/issues', () => {
		it('should get last angular issues', (done) => {
			chai.request(app)
				.get('/angular/issues')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					done();
				});
		});
	});
});

describe('NodeJS Articles', () => {
	describe('GET /nodejs/articles', () => {
		it('should get last nodejs articles', (done) => {
			chai.request(app)
				.get('/nodejs/articles')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					done();
				});
		});
	});
});