const mongoose = require('mongoose')

const admin_schema = new mongoose.Schema({
    name: { type: String, required: true },
    uid: {type: String, required: true},
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] // References Product
});


const Admin = mongoose.model('Admin', admin_schema)

module.exports = Admin

