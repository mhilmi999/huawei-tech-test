const tempData = require('../domain/users');

function getUsers(req, res){
    //return all data with the json
    res.json(tempData)
}

function saveUsers(req, res){
    // define the data that will store in array
    const data = {
        nama: req.body.nama,
        email: req.body.email,
        mobile_number: req.body.mobile_number
    };

    // check the payload is not empty
    if(Object.keys(data).length === 0) {
        res.json("Mohon maaf payload perlu diisi");
    }
    // push to array
    tempData.push(data);

    res.json(tempData);
}

module.exports = {
    getUsers, saveUsers
}