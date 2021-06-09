const propertiesReader = require("properties-reader");
const properties = propertiesReader("./app.properties");

module.exports = (app) => {
	const appConst = {
		porta: properties.get("app.porta"),
	};
	return appConst;
};
