const mongoose = require('../lib/mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const schema = new Schema({
  name: {
    first: String,
    last: String,
  },
  email: String,
  password: String,
  phone: String,
  agency: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  is_admin: {
    type: Boolean,
    default: false,
  },
  services: [Schema.Types.ObjectId],
});

schema.methods.generateHash = function generateHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

schema.methods.validPassword = function validPassword(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', schema);

