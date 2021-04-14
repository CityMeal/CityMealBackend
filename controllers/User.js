// const db = require('../db');
//create,sign, and verify tokens
const jwt = require('jsonwebtoken');
//hash password
const bcrypt = require('bcryptjs');
const config = require('../config');
//env vars
require('dotenv').config()

const knex = require('knex')({
    client: 'pg',
    connection: {
        database: 'citymeal',
        user: process.env.PGUSERNAME,
        password: process.env.PGPASSWORD
    }
});

const VerifyToken = require('../auth/VerifyToken');

//TODO: clean up logs in code that are not needed
class User {
    constructor() {

    };

    async register(req, res) {
        const user = req.body;

        //check if email already exists
        const getUser = await knex('users').where({email: user.email})
        console.log("getUser", getUser)

        if(getUser.length !== 0) {
            return res.status(406).json("user already exists");
        };

        //check if user has password
        if(!req.body.password) {
            return res.status(400).json ("no password created")
        }

        //check required fields are filled
        if((!req.body.email) || !(req.body.password) || (!req.body.username) || (!req.body.zipcode)) {
            return res.status(400).json ("required fields are not filled")
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
            }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });

            res.status(200).json({user: createdUser, token:token});
        }catch (err) {
            return res.status(500).json("error", {error: err} )
        }
    };

    /**
     * 
     * 
     */
    async login(req, res) {
        const user = req.body;

        //check user has password
        if(!req.body.password) {
            return res.status(500).json ("no password created")
        }

        try {
            //find user with email in db
            let getUser = await knex('users').where({email: user.email})[0]

            console.log('getuser', getUser)

            if(getUser.length === 0) {
                return res.status(404).json("user not found");
            };

            console.log("hashed pw", getUser[0].password);
            console.log("request password", user.password);

            //verify password
            const passwordIsValid = await bcrypt.compare(user.password, getUser[0].password);
            console.log("passwordIsValid", passwordIsValid);
            
            //TODO: make sure correct statuses for http codes based on error
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
            console.log('getuser2', getUser[0])

            res.status(200).json({user: getUser[0], token:token});
        }catch (err) {
            return res.status(500).json("error", {error: err} );
        };
    };

    async logout(req, res) {
        res.status(200).send({ auth: false, token: null });
    };

    // async delete(req,res) {
    //     console.log(req.userid)

    //     try {
    //         //delete user
    //     }catch {

    //     }
        
    // }

    async testVerifyToken( req, res) {
        console.log(req.userid)
        res.send(req.userid)
    }

}

module.exports = User;
