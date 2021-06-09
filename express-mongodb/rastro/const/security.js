const propertiesReader = require("properties-reader");

const properties = propertiesReader("./app.properties");

module.exports = (app) => {
	const securityConst = {
		custoHash: properties.get("security.custo.hash"),
		chaveJWT: properties.get("security.key.jwt"),
		tempoExpiracaoToken: "1m",
	};
	return securityConst;
};
