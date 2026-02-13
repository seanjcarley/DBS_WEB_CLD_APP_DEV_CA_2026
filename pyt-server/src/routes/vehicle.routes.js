const router = require('express').Router();
const { z } = require('zod');
const { validate } = require('../middleware/validate');
const { vehicles, add_vehicle, search_vehicle } = require('../controllers/vehicle.controler');


const fetchVehiclesSchema = z.object({
    id: z.string(),
})

const addVehicleSchema = z.object({
    id: z.string(),
    vrn: z.string().min(4),
})

const searchVehicleSchema = z.object({
    vrn: z.string().min(4),
})

router.post('/vehicles', validate(fetchVehiclesSchema), vehicles);
router.post('/add_vehicle', validate(addVehicleSchema), add_vehicle);
router.post('/search_vehicle', validate(searchVehicleSchema), search_vehicle);

module.exports = router;