class ConnectionUserDB {

  async loginUser(email) {
    // console.log('Ingreso a loginUser')
    const client = new MongoClient(this.URL);
    console.log(client)
    console.log(email)

    try {
      // console.log(email)
      if(email !== undefined && email !== null) {
        console.log('Ingreso a este if loginUser')
        await client.connect();
        const user = await client.db('searching_roomie').collection('users').findOne({email: email});
        // console.log(user);
        return user;
      }
    } catch (err) {
      return err;
    } finally {
      client.close();
    }
  }

  async createUser(request) {
    const client = new MongoClient(this.URL);
    request.password = await bcrypt.hash(request.password, 12);

    try {
      await client.connect();
      const res = await client.db('searching_roomie').collection('users').insertOne(request);
      return res;
    } catch(err) {
      return err;
    } finally {
      client.close();
    }
  }
}

module.exports = ConnectionUserDB;