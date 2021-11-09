const {User} = require('../schemas/user');
const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');
require('dotenv').config()
const {hashPassword, comparePassword} =  require('../utils/passwordHash');


const url = process.env.URL;



exports.createUser = async (req, res) =>{
    const {name, email, password,phone, logo} = req.body;

    const emailVerify = await User.findOne({email:email})
    if(emailVerify){
        return res.status(200).json({message:"usuário já cadastrado"})
    }else{
        
        let user = new User({
            name:name,
            email:email,
            password:hashPassword(password).hash,
            bussinessName:'',
            phone:phone,
            logo:logo
        });


        user = await user.save();
        res.status(200).json({message:"usuário criado com sucesso"})

        
    }
}


exports.setLogoPicture = async (req, res) =>{

    const logo =  `${url}/${req.file.filename}`;
    let user = await User.findByIdAndUpdate(req.params.id,{
        logo:logo
    });


    res.status(200).json(user);

    

}
exports.singin = async (req, res) =>{
    const {email, password} = req.body;

    const user = await User.findOne({email:email});

    if(!user){
        res.status(400).json({message:"usuário não cadastrado"});
    }
    if(!comparePassword(password, user.password)){
        res.status(400).json({error:"senha incorreta"});
    }else{
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:'1d'})

        const data = {
            id:user._id,
            name:user.name,
            email:user.email,
            phone:user.phone
        }

        res.status(200).json({data, token});
    }
}

//cria o nome do negócio(estabelecimento)
exports.createBussinessName = async(req, res) =>{
    const bussiness_name = req.body.bussinessName;
    
    
    const newBussinessName = bussiness_name.replace(/\s/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();

    let verifyBussinessName = await User.find().where({bussinessName:newBussinessName});

    

   let indexName = 0;
    if(verifyBussinessName.length > 0){
        do{
            indexName++;
            verifyBussinessName = await User.find().where({bussinessName:verifyBussinessName+indexName});
        }while(verifyBussinessName.length!==0)
    }

    const realBussinessName = (indexName>0)? newBussinessName+indexName : newBussinessName;
    let user = await User.findByIdAndUpdate(req.params.id,{
        bussinessName:realBussinessName
    });


    res.status(200).json(user);
    
}
//middleware que verifica se o admin está logado

exports.requireSingin = expressJWT({
        secret:process.env.JWT_SECRET,
        algorithms: ['HS256'] ,
        userProperty:'auth'
    })
