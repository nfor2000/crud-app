const asyncHandler = require('express-async-handler');
const User = require("../model/userModel");


const getUsers = asyncHandler (async (req, res) => {
     try{
          const users = await User.find();

          if(!users){
               res.status(404).json({
                    msg: 'No users found'
               });
               return;
          }

          res.status(302).json(users);

     } catch(error){
          res.status(500).json({
               err: error
          });
          return;
     }
})

const getUserById = asyncHandler (async (req, res) => {
     try{
          const user = await User.findOne({_id: req.params.id});
          
          if(!user){
               res.status(404).json({
                    msg: 'User not found'
               });
               return;
          }

          res.status(200).json(user);

     } catch(error){
          res.status(500).json({
               msg: error
          });
          return;
     }
})

const createUser = asyncHandler (async (req, res) => {
     const {name, email, location, password} = req.body;

     if(!name || !email || !location || !password)
     {
          res.status(400).json({msg: 'missing fields'});
          return;
     }

     try {

          const userExist = await User.findOne({email: email});

          if(userExist)
          {
               res.status(400).json({msg:'user already exist'})
               return;
          }

          const user = await User.create({
               name: name,
               email: email,
               location: location,
               password: password
          })

          if(!user)
          {
               res.status(400).json({msg: "Failed to create user"});
               return;
          }

          res.status(201).json({
               msg: "User created successfully",user:user
          });  

     }catch(error) {
          res.status(500)
          res.json({err:error})
     }
})

const updateUser = asyncHandler (async (req, res) => {
     const {id, name, email, location, new_password, old_password} = req.body;

     if(!id)
     {
          res.status(400).json({msg: 'missing fields'});
          return;
     }

     try {

          const user = await User.findOne({_id:id});
          if(!user)
          {
               res.status(404).json({msg: "User doesn't exist"});
               return;
          }

          if(name) user.name = name;
          if(email) user.email = email;
          if(location) user.location = location;

          if(!(user.password === old_password))
          {
               res.status(400).json({msg: "Incorrect password"});
               return;
          }

          user.password = new_password;
          
          await user.save();

          res.status(200).json({
               msg: "User updated successfully",
               user:user
          });  

     }catch(error) {
          res.status(500)
          res.json({err:error})
     }
})

const deleteUser = asyncHandler (async (req, res) => {
     const {id}  = req.params;

     if(!id)
     {
          res.status(400)
          throw new Error('Ivalid user id');
     }

     try{
          const user = await User.findByIdAndDelete(id);

          if(!user)
          {
               res.status(400).json({msg: "User not found"});
               return;
          }

          res.status(200).json({
               msg: "User deleted successfully",
               user:user
          });  

     }catch(err)
     {
          res.json({
               msg: 'internal error',
               error: err
          })
     }
})


module.exports = {getUsers,getUserById, createUser, updateUser, deleteUser}