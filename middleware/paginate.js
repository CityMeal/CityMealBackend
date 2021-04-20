require('dotenv').config()
const knexFile = require('../knexfile')
const knex = require('knex')(knexFile[process.env.NODE_ENV]);


/**
 * client can use query to paginate 
 * ex: localhost:3000/locations?page=1&limit=25
 * @returns object with previous page, next page, and list of items from table
 */
 const paginate = async (req, res, next) => {
    const page = req.query.page;
    const limit = req.query.limit;
    let url = req.originalUrl;
    url = url.split('/')[1]
    const tableName = url.split('?')[0]

    if(page !== undefined && limit !== undefined) {
        const startIndex = (page -1) * limit;
        const endIndex = page * limit;
        const result = {}

        let items;

        try{
            items = await knex(tableName)
        }catch(err) {
            return res.sendStatus(500).json({error: err});
        }

        if(items.length === 0) {
            return res.sendStatus(200).json({message: tableName + " table is empty"});
        }
        
        //once it gets to the end of locations it will no longer show next page
        if(endIndex < items.length) {
            result.next = {
                page: Number.parseInt(page) + 1,
                limit: limit
            };
        }

        //if at the beginning of list, it will not show previous
        if(startIndex > 0) {
            result.previous = {
                page: Number.parseInt(page) - 1,
                limit: limit
            };
        }

        try{
            items = await knex(tableName).limit(limit).offset(startIndex);
        }catch(err) {
            return res.sendStatus(500).json({error: err});
        }

        result[tableName] = items;
        
        req.paginate = {
            isPaginated: true,
            result: result
        }
        next();
    }else {
        req.paginate = {
            isPaginated: false
        }
        next();
    }
};

module.exports = paginate;