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

  async createFolderPhotos(idRoom) {
    // const params = {
    //   Bucket: this.bucket,
    // }

    fs.readFile("./prueba.txt", (err, data) => {
      if(err) throw err;

      const params = {
        Bucket: this.bucket,
        Key: 'informacion.txt',
        Body: data
      }

      this.connection.putObject(params, (err, data) => {
        if(err) throw err;
        console.log(data);
      })
    })

    // this.connection.listObjectsV2(params, (err, data) => {
    //   if(err) throw err;
    //   console.log(data)
    // });
  }

  async getPhotoUser(urlFile) {
    const params = {
      Bucket: this.bucket,
      Key: `${urlFile}`
    }

    return (await this.connection.getObject(params).promise()).Body;
  }

  async getPhotosRoom(idRoom) {
    const params = {
      Bucket: this.bucket,
      Key: `rooms/30.-DLX-800x533.jpg`
    }

    this.connection.getObject(params, (err, data) => {
      if(err) throw err;
      console.log(data);
      return data.Body;
    })
  }

}

module.exports = ConnectionS3;