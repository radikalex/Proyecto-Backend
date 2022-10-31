const { response } = require("express");
const { validationResult } = require("express-validator");

const validateBodyParams = (req, res, next ) => {

    console.log(req.body);

    const errors = validationResult( req );
    if( !errors.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    next();

}

module.exports = validateBodyParams