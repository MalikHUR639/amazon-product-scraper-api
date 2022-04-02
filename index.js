const express = require('express');
const request = require('request');
const app=express();
const PORT=process.env.PORT || 5000;


const generateApiKey=(apiKey)=> `https://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json());
app.get('/',(req,res)=> {
    res.send("welcome to scraper");
})

//routes for getting info about products
app.get('/products/:productId', async (req,res)=>{
    const {productId}=req.params;
    const {api_key} = req.query;

    try {
        const response= await request(`${generateApiKey(api_key)}&url=https://www.amazon.com/dp/${productId}`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
})

//routes for getting info about product reviews
app.get('/products/:productId/reviews', async (req,res)=>{
    const {productId}=req.params;
    const {api_key} = req.query;
    try {
        const response= await request(`${generateApiKey(api_key)}&url=https://www.amazon.com/product-reviews/${productId}`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
})

//routes for getting info about product offers
app.get('/products/:productId/offers', async (req,res)=>{
    const {productId}=req.params;
    const {api_key} = req.query;
    try {
        const response= await request(`${generateApiKey(api_key)}&url=https://www.amazon.com/gp/offer-listing/${productId}`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
})

//routes for getting searched products
app.get('/search/:searchQuery', async (req,res)=>{
    const {searchQuery}=req.params;
    const {api_key} = req.query;
    try {
        const response= await request(`${generateApiKey(api_key)}&url=https://www.amazon.com/s?k=${searchQuery}`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
})

app.listen(PORT, ()=> console.log(`server running on ${PORT}`))