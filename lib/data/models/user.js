const mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema;


const schema = new Schema({
    name: {type: String, unique: true, require: true},
    password: { type: String, required: true, bcrypt: true },
});

schema.pre('save', next => {
  if(this.isModified('password')){
    this.password = bcrypt.hashSync(this.password);
  }
  next();
});

schema.methods.verifyPassword = (password, cb) => {
  cb(bcrypt.compareSync(password, this.password));
};


module.exports = mongoose.model('user', schema);
