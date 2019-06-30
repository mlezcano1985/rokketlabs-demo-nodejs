// In this file you can configure migrate-mongo

const dbHost = process.env['DB_HOST'] ? 'db:27017': 'localhost:27017';
console.log('dbHost: ', dbHost);
module.exports = {
	mongodb: {
		// TODO Change (or review) the url to your MongoDB:
		url: `mongodb://${dbHost}`,

		// TODO Change this to your database name:
		databaseName: 'reign_db',

		options: {
			useNewUrlParser: true // removes a deprecation warning when connecting
			//   connectTimeoutMS: 3600000, // increase connection timeout to 1 hour
			//   socketTimeoutMS: 3600000, // increase socket timeout to 1 hour
		}
	},

	// The migrations dir, can be an relative or absolute path. Only edit this when really necessary.
	migrationsDir: 'migrations',

	// The mongodb collection where the applied changes are stored. Only edit this when really necessary.
	changelogCollectionName: 'changelog'
};
