function errorHandler(err, req, res, next) {
    console.error(err);

    const status = err.statusCode || 500;
    const message = err.message || 'INternal Server Error';

    res.status(status).json({
        ok: false, 
        error: {
            message, 
            status,
        }
    });
}

module.exports = { errorHandler };