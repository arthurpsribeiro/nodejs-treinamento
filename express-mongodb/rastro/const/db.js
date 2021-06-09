const propertiesReader = require("properties-reader");

const properties = propertiesReader("./app.properties");

module.exports = (app) => {
	const dbConst = {
		connectUrl: `mongodb://${properties.get("db.servidor")}:${properties.get(
			"db.porta"
		)}/${properties.get("db.database")}`,
		connectOptions: {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		},
	};
	return dbConst;
};
