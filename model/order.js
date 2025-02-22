const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, required: true, min: 1 }
        }
    ],
    total_amount: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

// status: { 
//     type: String, 
//     enum: ['pending', 'shipped', 'delivered', 'cancelled'], 
//     default: 'pending' 
// }, 



const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
