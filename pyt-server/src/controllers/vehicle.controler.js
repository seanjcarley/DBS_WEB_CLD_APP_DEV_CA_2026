const { env } = require('../config/env');
const { asyncHandler } = require('../utils/asyncHandler');
const { fetchAccountVehicles } = require('../models/vehicle.model')

const vehicles = asyncHandler(async (req, res) => {
    const id = Number(req.body.id);

    const results = await fetchAccountVehicles(id);

    res.status(200).json({ ok: true, results });
})

module.exports = { vehicles };