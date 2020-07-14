const ConnectionUserDB = require('../connection_db/ConnectionUserDB');
const bcrypt = require('bcrypt');

class Validations {

  validateEmail(email) {
    const regularExpressionEmail = /\S+@\S+\.\S+/;

    if(regularExpressionEmail.test(email)) {
      return true;
    } else {
      return false;
    }
  }

  async validateUser(request) {
    if(this.validateEmail(request.email)) {
      const connection = new ConnectionUserDB();
      const user = await connection.loginUser(request.email);

      if(user) {
        const match = await this.validatePassword(request.password, user.password);
        if(match) {
          return true;
        } else {
          return `La contraseña no coincide`;
        }
      } else {
        return `El usuario con el correo ${request.email} no existe`
      }
    } else {
      return `The email ${request.email} is not valid`;
    }
  }

  async validatePassword(password, passwordDB) {
    return bcrypt.compare(password, passwordDB);
  }

}

module.exports = Validations;