const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log("DB Connected"))
.catch(err => console.log(err));

const Product = mongoose.model("Product", {
  name: String,
  price: String,
  image: String
});

app.get("/", (req,res)=>{
  res.send("Server Running 🚀");
});

app.post("/add-product", async (req,res)=>{
  await new Product(req.body).save();
  res.send("Product Added");
});

app.get("/products", async (req,res)=>{
  res.json(await Product.find());
});

app.listen(3000, ()=> console.log("Running"));
