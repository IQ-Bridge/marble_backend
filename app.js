const express = require('express')
const mongoose = require('mongoose');
const Product = require('./model/product');
const User = require('./model/user');
const Admin = require('./model/admin');
const Order = require('./model/order');

const app = express();

app.use(express.json());

const dbUrl = 'mongodb://127.0.0.1:27017/marble_db';

mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'CONNECTION FAILED!'));
db.once('open', () => {
    console.log('DATABASE CONNECTED');
});

app.get('/products', async (req, res) => {
    try {
        const products = await Product.find({});
        if (!products) {
            return res.status(400).json({ message: 'Products Not Found' })
        }

        res.json({ products: products })
    } catch (e) {
        console.error(e)
        res.status(400).json({ message: 'Internal Server Error' })
    }
})

app.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.find({ id: id })
        if (!product) {
            return res.status(400).json({ message: 'Product Not Found' })
        }
        res.json({ product: product })
    } catch (e) {
        console.error(e)
        res.status(400).json({ message: 'Internal Server Error' })
    }
})

app.get('/user/:uid', async (req, res) => {
    try {
        const { uid } = req.params;
        const user = await User.findOne({ uid: uid })

        if (!user) {
            return res.status(400).json({ message: 'User Not Found' })
        }
        res.json({ user: user })
    } catch (e) {
        console.error(e)
        res.status(400).json({ message: 'Internal Server Error' })
    }
})

app.get('/admin/:uid', async (req, res) => {
    try {

        const { uid } = req.params;
        const admin = await Admin.findOne({ uid: uid })

        if (!admin) {
            return res.status(400).json({ message: 'Admin Not Found for this UID' })
        }
    } catch (e) {
        console.error(e)
        res.status(400).json({ message: 'Internal Server Error' })
    }
})

app.post('/admin/register', async (req, res) => {
    try {
        const { name, phone, email, uid } = req.body;

        const admin = new Admin({ name: name, uid: uid, phone: phone, email: email })

        res.json({ message: 'Admin Added Successfully', admin: admin })
    } catch (e) {
        console.error(e)
        res.status(400).json({ message: 'Internal Server Error' })
    }
})

app.post('/user/register', async (req, res) => {
    try {
        const { name, uid, phone_number, email, address } = req.body;
        const user = new User({ name: name, uid: uid, phone_number: phone_number, email: email, address: address })

        res.json({ message: 'User Added Successfully', user: user })
    } catch (e) {
        console.error(e)
        res.status(400).json({ message: 'Internal Server Error' })
    }
});


router.post('/orders', async (req, res) => {
    try {
        const { userId, products } = req.body;

        if (!userId || !products.length) {
            return res.status(400).json({ error: 'User ID and products are required' });
        }

        let totalAmount = 0;
        for (const item of products) {
            const product = await Product.findById(item.product);
            if (!product) return res.status(404).json({ error: 'Product not found' });
            totalAmount += product.price * item.quantity;
        }

        const newOrder = new Order({
            user: userId,
            products,
            totalAmount
        });

        await newOrder.save();
        res.status(201).json({ message: 'Order placed successfully', order: newOrder });
    } catch (err) {
        res.status(500).json({ error: 'Error placing order' });
    }
});

app.get('/orders/:uid', async (req, res) => {
    try {
        const { uid } = req.params;
        const admin = await Admin.findOne({uid: uid})
        const orders = await Order.find({})

        if(!admin){
           return res.status(400).json({message: 'Admin uid is required for authentication purpose.'})
        }

        res.status(201).json({orders: orders})
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
})



app.get('/hello-world', async (req, res) => {
    res.send('Hello world!')
});



app.listen(3000, () => {
    console.log('Listening to the port 3000')
})