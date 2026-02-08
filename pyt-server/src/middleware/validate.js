function validate(schema) {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);

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