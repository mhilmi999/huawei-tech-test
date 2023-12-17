function responseAPI(res, code, status, msg, data){
    if (status == 1) {
        res.status(code).json({
            success: true,
            code: code,
            message: msg,
            data: data
        });
    } else if (status == 0) {
        res.status(code).json({
            success: false,
            code: code,
            message: msg,
            data: data
        });
    }
}

module.exports = responseAPI;