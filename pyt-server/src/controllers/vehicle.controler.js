const { env } = require('../config/env');
const { asyncHandler } = require('../utils/asyncHandler');
const { fetchAccountVehicles, addVehicle, searchVehicle, 
    searchOneAuto, deleteVehicle } = require('../models/vehicle.model')

const vehicles = asyncHandler(async (req, res) => {
    const id = Number(req.body.id);

    const results = await fetchAccountVehicles(id);

    res.status(200).json({ ok: true, results });
})

const add_vehicle = asyncHandler(async (req, res) => {
    const {id, vrn} = req.body;
    console.log('Controller: ', id, vrn);

    const vehicleId = await addVehicle(id, vrn);

    res.status(201).json({ ok: true, vehicleId })
})

const delete_vehicle = asyncHandler(async (req, res) => {
    const {id, vrn} = req.body;
    console.log('Controller: ', id, vrn);

    const vehicleId = await deleteVehicle(id, vrn);

    res.status(201).json({ ok: true, vehicleId })
})

const search_vehicle = asyncHandler( async (req, res) => {
    const vrn = req.body.vrn;
    const results = await searchVehicle(vrn);

    res.status(200).json({ ok: true, results });
})

const search_one_auto = asyncHandler( async (req, res) => {
    results = await searchOneAuto(req.params.vrn);
    console.log('Vehicle Controller: ', results);
    res.status(201).json({ok: true, results});
})

module.exports = { vehicles, add_vehicle, search_vehicle, 
    delete_vehicle, search_one_auto };
