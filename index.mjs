// Import the Express.js framework
import express from "express";

// Create an instance of the Express application
const app = express();

// Import the 'path' module for working with file paths (not used in this code)
import path from "path";

// Import the 'body-parser' middleware for handling HTTP request data
import bodyParser from "body-parser";

// Define the port number for the server
const port = 3001;

// Import the 'ejs' template engine for rendering HTML templates
import ejs from "ejs";

// Configure the Express app to use 'ejs' as the view engine for rendering HTML
app.engine("html", ejs.renderFile);
app.set("view engine", "ejs");

// Configure the Express app to parse URL-encoded and JSON data from HTTP requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define an array 'products' to store product information

let products = [
    {
        category: 'Food',
        gst: "5",
        items: [
            { name: 'Rice', price: 140 },
            { name: 'Bread', price: 120 },
            { name: 'Milk', price: 60 },
        ],
    },
    {
        category: 'Electronics',
        gst: "12",
        items: [
            { name: 'Laptop', price: 40000.00 },
            { name: 'Smartphone', price: 25000.00 },
            { name: 'TV', price: 34899.99 },
        ],
    },
    {
        category: 'Footwear',
        gst: "8",
        items: [
            { name: 'Shoes', price: 200 },
            { name: 'Socks', price: 80 },
            { name: 'Sandals', price: 150 },
        ]
    }
];

let categoryChoosen = ''

// Define the route for the homepage
app.get('/', (req, res) => {
    res.render('index.html')
})

// Define the route for purchasing a product
app.get('/puchaseProduct', (req, res) => {
    res.render('gst.html')
})

// Route to get the list of products
app.post('/getProducts', (req, res) => {
    res.json({ products })
})

// Route to add a new product category
app.post('/addCategory', (req, res) => {
    const { category, defaultGST } = req.body;

    // Check if the category already exists
    const existingCategory = products.find((product) => product.category === category);

    if (existingCategory) {
        return res.status(400).json({ message: 'Category already exists' });
    }

    // Add the new category to the products array with the default GST rate
    products.push({
        category,
        gst: defaultGST,
        items: [],
    });

    res.status(200).json({ message: 'Category added successfully' });
});


// Route to view product categories
app.get('/viewProductCategory', (req, res) => {
    res.render(`Products.html`)
})

// Route to add a new product to a category
app.post('/addProduct', (req, res) => {
    const { productName, productPrice, category } = req.body;

    // Find the category in the products array
    const categoryIndex = products.findIndex((cat) => cat.category === category);

    if (categoryIndex !== -1) {
        // Add the new item to the items array of the category
        products[categoryIndex].items.push({ name: productName, price: productPrice });
        res.status(200).json({ message: 'Product added successfully' });
    } else {
        res.status(400).json({ message: 'Category not found' });
    }
});


// Route to get a list of categories
app.get('/getCategories', (req, res) => {
    const categories = products.map((product) => product.category);
    res.json({ categories });
});

// Start the server
app.listen(port, () => {
    console.log(`server running on http://localhost:${port}`)
})
