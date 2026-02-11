const router = require('express').Router();
const { z } = require('zod');
const { validate } = require('../middleware/validate');
const { vehicles } = require('../controllers/vehicle.controler');


const fetchVehiclesSchema = z.object({
    id: z.string(),
})

router.post('/vehicles', validate(fetchVehiclesSchema), vehicles);

module.exports = router;