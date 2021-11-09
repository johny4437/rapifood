const {
    createUser,
    singin,
    createBussinessName,
    requireSingin} = require('../controllers/user');

const route =  require('express').Router();

route.post('/users', createUser);
route.post('/users/singin', singin);
route.put('/users/:id', requireSingin, createBussinessName);


module.exports =  route;