const propertiesReader = require("properties-reader");

const properties = propertiesReader("./app.properties");

module.exports = (app) => {
	const securityConst = {
		custoHash: properties.get("security.custo.hash"),
	};
	return securityConst;
};
