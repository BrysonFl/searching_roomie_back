const AWS = require('aws-sdk');
const fs = require('fs');

class ConnectionS3 {

  constructor() {
    this.connection = new AWS.S3({
      accessKeyId: 'AKIA5S7EDROK2L7YU7D3',
      secretAccessKey: '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',
      region: 'us-east-2'
    });
    this.bucket = 'searchingroomie';
  }

  async createPhotoUser(bytesArray) {
    const params = {
      Bucket: 'searchingroomie',
      Body: bytesArray,
      Key: 'folder/img.jpg',
      ContentType: 'application/jpeg'
    };

    const response = await this.connection.upload(params);
    console.log((await response.promise()).Location);
    return (await response.promise()).Location;
  }

  async getPhotoUser(urlFile) {
    const params = {
      Bucket: this.bucket,
      Key: `${urlFile}`
    }

    return (await this.connection.getObject(params).promise()).ContentLength;
  }

  async getPhotosRoom(idRoom) {
    const params = {
      Bucket: this.bucket,
      Key: `rooms/30.-DLX-800x533.jpg`
    }

    this.connection.getObject(params, (err, data) => {
      if(err) throw err;
      console.log(data);
      return data.location;
    })
  }

}

module.exports = ConnectionS3;