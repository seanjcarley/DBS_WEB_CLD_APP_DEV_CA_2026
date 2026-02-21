const axios = require('axios');
const { db } = require('../config/db');
const { env } = require('../config/env');

// find all active vehicles for account
async function fetchAccountVehicles(id) {
    const results = [];
    const [rows_act] = await db.query(
        `call sp_FetchAccountActiveVehicles(?)`, [Number(id)]
    );
    const [rows_ina] = await db.query(
        `call sp_FetchAccountInactiveVehicles(?)`, [Number(id)]
    );

    // console.log(rows_act[0]);
    // console.log(rows_ina[0]);
    results.push(rows_act[0]);
    if (rows_ina) {
        results.push(rows_ina[0]);
    } else {
        results.push([]);
    }

    // console.log(results);

    return results || null;
}

async function addVehicle(id, vrn) {
    console.log('Model: ', Number(id), vrn);
    const vehicleId = await db.query(
        `call sp_AddVehicle(?, ?)`, [Number(id), vrn]
    );

    // console.log('Add vehicle: ', vehicleId)
    return vehicleId || null;    
}

async function deleteVehicle(id, vrn) {
    console.log('Model: ', Number(id), vrn);
    const result = await db.query(
        `call sp_DeleteVehicle(?, ?)`, [Number(id), vrn]
    );

    return result || null;
    
}

async function searchVehicle(vrn) {
    const [results] = await db.query(
        `call sp_SearchVehicleDetails(?)`, [vrn]
    );

    // console.log('Vehicle.Model: ',results);
    return results || null;
}

async function searchOneAuto(vrn) {
    // console.log('Search One Auto: ', vrn)
    const results = await axios({
        'method': 'GET',
        'url': `${env.ONEAUTO_BASE_URL}/cartell/vehicleidentity/?vehicle_registration_mark=${vrn}`,
        'headers': {
            'x-api-key': env.ONEAUTO_SECRET,
        }
    });

    // console.log('Vehicle Model: ', results.data.result);
    return results.data.result || null;
}

module.exports = { fetchAccountVehicles, addVehicle, 
    searchVehicle, searchOneAuto, deleteVehicle };