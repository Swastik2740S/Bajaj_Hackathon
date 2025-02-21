const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

async function connectDB() {
	try {
		if (process.env.NODE_ENV === 'test') {
			const { MongoMemoryServer } = require('mongodb-memory-server');
			const mongoServer = await MongoMemoryServer.create();
			await mongoose.connect(mongoServer.getUri());
			console.log('In-memory MongoDB Connected for testing...');
		} else {
			await mongoose.connect(db);
			console.log('MongoDB Connected...');
		}
	} catch (err) {
		console.error('MongoDB Connection Error:', err.message);
		process.exit(1);
	}
}

async function close() {
	await mongoose.disconnect();
	console.log('MongoDB Disconnected...');
}

module.exports = { connectDB, close };
