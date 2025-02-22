const mongoose = require('mongoose')

const user_schema = new mongoose.Schema({
    name: {
        type: String,
    },
    uid: {
        type: String,
    },
    phone_number: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
    }
})

const User = mongoose.model('User', user_schema);

module.exports = User;

