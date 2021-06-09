module.exports = (app) => {
	const dbConst = {
		connectUrl: "mongodb://localhost:27017/rastro-dev",
		connectOptions: {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		},
	};
	return dbConst;
};
