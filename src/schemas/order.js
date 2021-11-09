const mongoose =  require('mongoose');

const orderSchema = mongoose.Schema({
  orderItems:[{
        type:mongoose.Types.ObjectId,
        ref:'OrderItem',
        required:true
    }],
    shippingAddress:{
        type:String,
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    paymentMethod:{
        type:String,
        default:''
    },
    totalPrice:{
        type:Number
    },
    dataOrdered:{
        type:Date,
        default:Date.now
    }
})

exports.Order =  mongoose.model('Order', orderSchema);