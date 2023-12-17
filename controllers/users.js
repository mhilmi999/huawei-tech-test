const Joi = require('joi');
const tempData = require('../domain/users');

function getUsers(req, res) {
    //return all data with the json
    // res.json(tempData)
    res.status(200).json({
        success: true,
        code: 200,
        message: "Success retrieve all data",
        data: tempData
    });
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
        res.status(422).json({
            success: false,
            code: 422,
            message: 'Invalid Payload',
            data: req.body
        });
    } else{
        // save register user to tempArray
        tempData.push(value);

        // return the all data
        res.status(201).json({
            success: true,
            code: 201,
            message: "User registration was successful",
            data: value,
        });
    }
}

module.exports = {
    getUsers, saveUsers
};