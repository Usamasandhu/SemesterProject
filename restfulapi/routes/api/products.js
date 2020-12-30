const express = require("express");
let router = express.Router();
const validateProduct = require("../../middlewares/validateProduct");
var  {Product} = require("../../models/product");
//get products
router.get("/",async(req,res)=>{
    let page = req.query.page ? req.query.page:1;
    let perPage = req.query.perPage ? req.query.perPage:10;
    let skipRecords = perPage*(page-1);
    let products = await Product.find().skip(skipRecords).limit(perPage);
    return res.send(product);
}
);
//get single product
router.get("/:id", async (req,res)=>{
   try {
        let product = await Product.findById(req.params.id);
        if(!product) return res.status(400).send("Product with given id is not present");
        return res.send(product);
   } catch (err) {
       return res.status(400).send("Invalid ID");
   }
});
//update a record
router.put("/:id",validateProduct,async(req,res)=>{
    let product = await Product.findById(req.params.id);
    product.name = req.body.name;
    product.price = req.body.price;

    await product.save();
    return res.send(product);
});
//delete a record
router.delete("/:id",async(req,res)=>{
    let product = await Product.findByIdAndDelete(req.params.id);
    return res.send(product);
}
);
//insert a new record
router.post("/",validateProduct, async(req,res)=>{
    let product = new Product();
    product.name = req.body.name;
    product.price = req.body.price;
    await product.save();    
    return res.send(product);
}
);
module.exports = router;