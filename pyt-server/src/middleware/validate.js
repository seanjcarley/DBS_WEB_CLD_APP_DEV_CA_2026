function validate(schema) {
    return (req, res, next) => {
        // console.log('validate: ', req.body)
        const result = schema.safeParse(req.body);
        // console.log('validate: ', result)

        if (!result.success) {
            const err = new Error('Validation Failed...');
            err.statusCode = 400;
            err.details = result.error.flatten();
            return next(err);
        }
        req.body = result.data;
        next();
    };
}

module.exports = { validate };