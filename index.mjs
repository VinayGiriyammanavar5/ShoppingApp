import express from "express";
const app = express();
import path from "path";
import bodyParser from "body-parser";
const port = 3001;
import ejs from "ejs";

app.engine("html", ejs.renderFile);
app.set("view engine", "ejs");
// app.set("views",path.join(__dirname,"Public","html"))
// app.use(express.static(path.join(__dirname,"Public")))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let products = [
    {
        category: 'Food',
        gst:"5",
        items: [
            { name: 'Rice', price: 140 },
            { name: 'Bread', price: 120 },
            { name: 'Milk', price: 60 },
        ],
    },
    {
        category: 'Electronics',
        gst:"12",
        items: [
            { name: 'Laptop', price: 40000.00 },
            { name: 'Smartphone', price: 25000.00 },
            { name: 'TV', price: 34899.99 },
        ],
    },
];
let categoryChoosen = ''
// console.log(JSON.stringify(products, null, 2));



app.get('/',(req,res)=>{
    res.render('index.html')
})
app.get('/puchaseProduct',(req,res)=>{
    res.render('gst.html')
})
app.post('/getProducts',(req,res)=>{
    // console.log("/getProducts")
    // console.log(products)
    res.json({products})
})
app.post('/addCategory',(req,res)=>{
    console.log("/addCategory",req.body);
    products.push({
        category: req.body.category,
        items: []
    });
    console.log(products)
    res.status(200).json({"message":"OK"});
})
app.get('/viewProductCategory',(req,res)=>{
    res.render(`Products.html`)
})
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


app.listen(port,()=>{
    console.log(`server running on http://localhost:${port}`)
})



