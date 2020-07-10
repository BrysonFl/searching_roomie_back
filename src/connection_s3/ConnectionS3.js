const AWS = require('aws-sdk');

class ConnectionS3 {

  constructor() {
    this.connection = new AWS.S3();
  }

}

module.exports = ConnectionS3;