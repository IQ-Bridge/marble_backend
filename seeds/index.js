const mongoose = require('mongoose')
const Product = require('../model/product')
mongoose.connect('mongodb://127.0.0.1:27017/marble_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'CONNECTION FAILED!'));
db.once('open', () => {
    console.log('DATABASE CONNECTED');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const categories = ['granite', 'marble'];
const whereToUseOptions = [
    "Flooring", "Step Riser", "Kitchen Top", "Front Elevation",
    "Countertop", "Lift Entrance", "Temple & Pooja Rooms", "Landing"
];

const generateRandomProducts = (num) => {
    const products = [];
    for (let i = 0; i < num; i++) {
        products.push({
            name: `Product ${i + 1}`,
            price: Math.floor(Math.random() * 200) + 50,
            wheretouse: sample(whereToUseOptions),
            category: sample(categories),
            description: `This is a randomly generated product description for Product ${i + 1}.`,
            images: [ {
                url: 'https://res.cloudinary.com/dskpugzno/image/upload/v1740824235/products/jnpjb0ejtyl351p7qtmh.png',
                filename: 'products/jnpjb0ejtyl351p7qtmh',
              },
              {
                url: 'https://res.cloudinary.com/dskpugzno/image/upload/v1740824236/products/auo7jdxq99rzyfkgmxlo.png',
                filename: 'products/auo7jdxq99rzyfkgmxlo',
              }],
            stock: Math.floor(Math.random() * 50) + 1
        });
    }
    return products;
};

const seedDb = async () => {
    await Product.deleteMany({});
    const products = generateRandomProducts(25);
    await Product.insertMany(products);
    console.log('Database Seeded with 25 Random Products');
};

seedDb().then(() => {
    mongoose.connection.close();
});
