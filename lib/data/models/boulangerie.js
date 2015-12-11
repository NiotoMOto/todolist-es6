const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {type: String, unique: true, require: true}
});

module.exports = mongoose.model('boulangerie', schema);
