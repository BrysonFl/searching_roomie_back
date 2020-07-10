const config = require('../propertiesDB.json');

class ReadProperties {

  getPropertiesDB() {
    return config;
  }

}

module.exports = ReadProperties;