const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    id:String,
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        default:''
    }, 
    images:[{
        type:String
    }],
    price:{
        type:Number,
        default:0
    },
    tenantId:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    dateCreated:{
        type:Date,
        default:Date.now
    }
})

exports.Product = mongoose.model('Product', productSchema);