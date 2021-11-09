const {Product} =  require('../schemas/product');
const {User} = require('../schemas/user');
require('dotenv').config();

const url = process.env.URL;

//CRIAR PRODUTOS
exports.createProduct = async (req, res) =>{
    
    const tenantId = req.headers.tenant_id;
    const  {name, price, description} = req.body;

    const files = req.files;
    let imagesPath = [];

    if(files){
        files.map((file)=>{
            imagesPath.push(`${url}/${file.filename}`)
        })
    }
    

    let product = new Product( {
        name,
        price,
        description,
        image:"",
        images:imagesPath,
        tenantId,  
    });

    product = await product.save();

    if(!product){
        res.status(400).json({error:'Erro ao salvar produto'})
    }

    res.status(200).json(product);

    
}

//ATUALIZAR PRODUTOS

exports.updateProduct = async (req, res) =>{
    const tenantId = req.headers.tenant_id;
    const  {name, price, description} = req.body;

    const verifyProduct = await Product.findById({id:req.params.id});
    if(!verifyProduct){
        res.status(400).json({error:'produto não encontrado'})
    }
    const files = req.files;
    let imagesPath = [];

    if(files){
        files.map((file)=>{
            imagesPath.push(`${url}/${file.filename}`)
        })
    }
    

    let product = await Product.findByIdAndUpdate(req.params.id,
        {
        name,
        price,
        description,
        image:"",
        images:imagesPath,
        tenantId,  
    });

    if(!product){
        res.status(400).json({error:'Erro ao atualizar produto'})
    }

    res.status(200).json(product);

}
//DELETAR PRODUTOS
exports.remove = async(req, res) =>{
    const id =  req.params.id;

    Product.findByIdAndRemove(id).then(product =>{
        if(product){
            return res.status(200).json({message:"produto apagado com sucesso"});
        }else{
            return res.status(404).json({error:"produto não foi apagado"});
        }
    }).catch(e => {
        return res.status(200).json(e);
    })
}

//CONTAR PRODUTOS

exports.countProducts = async(req, res) =>{
    const productCount = await Product.countDocuments((count)=>count);

    if(!productCount){
        res.status(500).json({message:'Não possui nenhum produto'});
    }

    res.status(200).json({count: productCount})
}

//lista produtos baseado no bussinessName

exports.readProducts = async (req, res) =>{

  const host = req.headers.referer;

  let bussinessName = host.toString().split('.').slice(-2);

  bussinessName = bussinessName[0].toString().split('//')[1];
   

    const user = await User.find().where({bussinessName:bussinessName});
    

   if(user.length == 0){  
    return res.status(400).json({message:'Não possui produtos cadastrados'})
   }else{
    const products = await Product.find().where({tenantId:user[0]._id})
    res.status(200).json(products)
   }
    
   
      
    

    
}

