const mongoose = require('mongoose');

const image_schema = new mongoose.Schema({
    url: String,
    filename: String
})

const product_schema = new mongoose.Schema({
    name: {
        type: String,
    },
    price: {
        type: Number,
    },
    wheretouse: {
        type: String,
    },
    category: {
        type: String,
        enum: ['granite', 'marble']
    },
    description: {
        type: String,
    },
    image:image_schema,
    stock: {
        type: Number,
        default: 0
    }
})

const Product = mongoose.model('Product', product_schema)

module.exports = Product

/// marble_category =  [granite, marble]
/// product: name, price, wheretouse, description, images, category, stock
/// user:  name, phone, email, address
/// admin: name, phone, email, products
/// order: products: [{product, quantity}], total_amount  