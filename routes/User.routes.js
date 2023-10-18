import express from "express";
import { createNewUser, authUser, confirmTokenUser, checkTokenUser, userProfile, otherProfile } from "../controllers/User.controllers.js";
import checkAuth  from '../middleware/checkAuth.js';
import userSchema from "../models/User.model.js";


const router = express.Router()

//Create new user
router.post('/users', (req, res) => {
    const user = userSchema(req.body);
    user
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}) );
});

//login

router.post('/login', authUser

// (req, res) =>{
//     userSchema
//     .find()
//     .then((data) => res.json(data))
//     .catch((error) => res.json({message: error}) ); 
// }

);
//get all users information
router.get('/users', (req, res) => {
    userSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}) );   
});

//get information for 1 user
router.get('/users/:id', (req, res) => {
    const{ id } = req.params;
    userSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}) );   
});

//Edit 1 user for balance actualization
router.put('/users/:id', (req, res) => {
    const{ id } = req.params;
    const{ Name, Email, AccountBalance, AccountNumber, Password } = req.body;
    userSchema
        .updateOne({_id: id}, {$set: { Name, Email, AccountBalance, AccountNumber, Password}})
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}) );   
});

//Delete 1 user by id
router.delete('/users/:id', (req, res) => {
    const{ id } = req.params;
    userSchema
        .findOneAndRemove({_id: id})
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}) );   
});

// //Area Pública en react
// router.post("/", createNewUser)
// router.post("/login", authUser)
// router.get('/confirm-account/:token', confirmTokenUser)
// router.post('/reset-password', resetPassword)
// router.route( '/reset-password/:token' ).get(checkTokenUser).post(newPassword)

// //Rutas privadas
// router.get('/profile', checkAuth, userProfile)
// router.get('/user-profile', checkAuth, otherProfile)
export default router;