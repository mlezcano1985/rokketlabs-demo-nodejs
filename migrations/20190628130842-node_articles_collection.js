module.exports = {
	async up(db) {
		const data = [];    

		for (let i = 0; i < 5; i++) {
			data.push({
				'author': `Autor ${i+1}`,
				'title': `Título ${i+1}`,
				'created_at': new Date()
			});   
		}

		await db.collection('node_articles').insertMany(data);
	},

	async down(db) {
		db.collection('node_articles').drop();
	}
};
