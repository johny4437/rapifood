const {Order} = require('../schemas/order');
const {OrderItem} =  require('../schemas/orderItem');


exports.create = async (req, res) =>{
    const orderItemsIds =Promise.all (req.body.orderItems.map(async item =>{
        let newOrderItems = new OrderItem({
            quantity:item.quantity,
            product:item.product
        });

        newOrderItems = await newOrderItems.save();
        return newOrderItems._id;
    }))

const orderResolve =  await orderItemsIds;

  let order= new Order({
        orderItems:orderResolve,
        shippingAddress:req.body.shippingAddress,
        phone:req.body.phone,
        email:req.body.email,
        name:req.body.name,
        paymentMethod:req.body.paymentMethod,
        city:req.body.city,
        totalPrice:req.body.totalPrice
    })

    order = await order.save();

    res.status(200).json(order);
}


exports.listOrders = async(req, res) =>{
    const orders = await Order.find().populate({path:'orderItems', populate:'product'}).sort({'dataOrdered':-1});

    if(!orders){
        return res.status(404).json({message:"Não existe Ordens"})
    }

    res.status(200).json(orders)
}

exports.listOneOrder = async (req, res) =>{
    const order = await Order.findById(req.params.id).populate({path:'orderItems', populate:'product'}).sort({'dataOrdered':-1})

    if(!order){
        return res.status(400).json({message:"Ordem não encontrada"});
    }

    res.status(200).json(order)
}


exports.removeOrder = (req, res) =>{
    Order.findByIdAndRemove(req.params.id).then(async order =>{
        if(order){
           await order.orderItems.map(async orderItem =>{
               await OrderItem.findByIdAndRemove(orderItem)
           })
           return res.status(200).json({message: 'ordem  apagada'})
        }else{
            return res.status(400).json({error: 'ordem não apagada'})
        }
    }).catch(e => res.status(400).json(e))
}
/**
  Order example
 {
       "orderItems" :[
            {
               "quantity":3,
               "product":"6187baca96e8ca509d54fcbd"
            },
           {
               "quantity":2,
               "product":"6187baca96e8ca509d54fcbd"
            }
        ],
       "shippingAddress":"Rua Barão do Aymores, 45",
        "phone":"+5527998909001",
        "paymentMethod":"PicPay",
        "totalPrice":59.98
  }
  
 */