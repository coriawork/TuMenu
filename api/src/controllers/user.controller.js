import {User } from '../models/User.js';

async function get(req,res){
    try{
        const users =await User.findAll();
        res.status(200).json(users);
    }catch{
        console.error('Error fetching users:', error);
    }
}

async function create(req,res){
    try{
        const {name} = req.body;
        const newUser = await User.create({name})
        console.log(newUser);
        res.status(201).json(newUser);
    }catch(error){
        console.error('Error creating user:', error);
        res.status(500).send('Error creating user');
    }
}

export { get, create };