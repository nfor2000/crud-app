const express = require('express');
const { getUsers, getUserById, createUser, updateUser, deleteUser } = require('../controller/userController');

const route = express.Router();

route.get('/get_users', getUsers);
route.get('/get_user/:id', getUserById);
route.post('/create_user', createUser);
route.post('/update_user', updateUser);

route.delete('/delete_user/:id', deleteUser);

module.exports = route;