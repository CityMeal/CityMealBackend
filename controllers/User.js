//create,sign, and verify tokens
const jwt = require('jsonwebtoken');
//hash password
const bcrypt = require('bcryptjs');
// const config = require('../config');
//env vars
require('dotenv').config()
const knexFile = require('../knexfile')
const knex = require('knex')(knexFile[process.env.NODE_ENV]);

class User {
    constructor() {

    };

    /**
     * Registers and creates new User. verifies if user does not already exist, and that password has been created
     * @returns user data and token
     */
    async register(req, res) {
        const user = req.body;

        //check if email already exists
        const getUser = await knex('users').where({email: user.email})

        if(getUser.length !== 0) {
            return res.status(406).json("user already exists");
        };

        //check if user has password
        if(!req.body.password) {
            return res.status(400).json ("no password created")
        }

        //check required fields are filled
        if((!req.body.email) || !(req.body.password) || (!req.body.username) || (!req.body.zipcode)) {
            res.status(400).json ("required fields are not filled")
        }

        try{
            //hash password
            await bcrypt.hash(req.body.password, 10).then(function(hash) {
                user['password'] = hash;
            });

            //create user in db
            //TODO: created edge cases for issue but why does this not allow data to be put in db if required field is not given? ex: no zipcode passed
            const createdUser = await knex('users').insert(user).returning(['id', 'email', 'username', 'zipcode']);

            //create a token
            const token = jwt.sign({
                id: createdUser.id
            }, process.env.secret, {
                expiresIn: 86400 // expires in 24 hours
            });

            res.status(200).json({user: createdUser, token:token});
        }catch (err) {
            return res.status(500).json("error", {error: err} )
        }
    };

    /**
     * Expects an email and password. Checks if email exists and password is correct.
     * @returns user data and token
     */
    async login(req, res) {
        const user = req.body;
        //check user has password
        if(!req.body.password) {
            return res.status(500).json ("no password created")
        }
        try {
            //find user with email in db
            let getUser = await knex('users').where({email: user.email})
            if(getUser.length === 0) {
                return res.status(404).json("user not found");
            };
            //verify password
            const passwordIsValid = await bcrypt.compare(user.password, getUser[0].password);            
            if(!passwordIsValid) {
                return res.status(500).json("incorrect password");
            }
            // create a token
            const token = jwt.sign(
                {
                    id: getUser[0].id,
                },
                config.secret,
                {
                    expiresIn: 86400 // expires in 24 hours
                }
            );
            // //remove password from obj to not send password to 
            delete getUser[0].password;
            res.status(200).json({user: getUser[0], token:token});
        }catch (err) {
            return res.status(500).json("error", {error: err} );
        };
    };

    /**
     * @returns a json with a null token, and auth - might delete becasue logout insn't really needed
     */
    async logout(req, res) {
        res.status(200).send({ token: null });
    };

     /**
      * @returns user data, excluding password, based on id saved in token
      */
    async getUser(req,res) {
        try {
            //get user data from table
            let user = await knex('users').where({id:req.user.id})
            user = user[0]
            //removes password from user obj
            delete user.password;
            //returns user data
            res.status(200).json({user: user})
        }catch (err){
            return res.status(500).json("error", {error: err});
        };
    }

    /**
     * Takes in key:value pairs to update user data
     * @returns updated user object excluding password
     */
    async updateUser(req,res) {
        try {
            //updates user
            let updatedUser = await knex('users').where({id:req.user.id}).update(req.body)
            //get user data from table
            updatedUser = await knex('users').where({id:req.user.id})
            updatedUser = updatedUser[0]
            //removes password from user obj
            delete updatedUser.password;
            //returns user data
            res.status(200).json({user: updatedUser})
        }catch (err){
            return res.status(500).json("error", {error: err});
        };
    };

    /**
     * Gets user ID from Token and deletes user from table
     * @returns deleted user id
     */
    async deleteUser(req,res) {
        try {
            //delete user
            const deletedUser = await knex('users').where({id:req.user.id}).del();
            //return user id
            res.status(200).json({message: "user has been deleted", user_id: req.user.id});
        }catch (err){
            return res.status(500).json("error", {error: err});
        };
    };

}

module.exports = User;
