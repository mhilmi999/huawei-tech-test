const Joi = require('joi');
const tempData = require('../domain/users');
const helper = require('../helpers/helper')

function getUsers(req, res) {
    //return all data with the json
    helper(res, 200, 1, "Success retrieve all data", tempData);

}

function saveUsers(req, res) {
    // json schema validation 
    const schema = Joi.object().keys({
        nama: Joi.string().alphanum().min(1).required(),
        email: Joi.string().email().required(),
        mobile_number: Joi.string().regex(/^(\+62|62)?[\s-]?0?8[1-9]{1}\d{1}[\s-]?\d{4}[\s-]?\d{2,5}$/).required(),
    });

    const result = schema.validate(req.body);
    const { value, error } = result;

    const valid = error == null;
    if(!valid){
        // return json error msg 
        helper(res, 422, 0, "Invalid Payload", value);
    } else{
        // save register user to tempArray
        tempData.push(value);

        // return the all data
        helper(res, 201, 0, "User registration was successful", value);
    }
}

module.exports = {
    getUsers, saveUsers
};