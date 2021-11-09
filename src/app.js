const express = require('express');
const app = express();
require('dotenv').config()
const cors = require('cors');
const mongoose = require('mongoose');
const userRoute =  require('./routes/users');
const productRoute = require('./routes/products');
const orderRoute = require('./routes/order');

app.use(cors({origin:'*'}))

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(userRoute);
app.use(productRoute);
app.use(orderRoute);
mongoose.connect(process.env.DB_URL
    
    ,{
    
    useNewUrlParser:true,
    useUnifiedTopology:true,
    }

).then(()=> console.log("DB connected"))


app.listen(4000, ()=>{
    console.log("SERVER IS RUNNING ON http://127.0.0.1:4000")
})