const { db } = require('../config/db');

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

    console.log(results);

    return results || null;
}

async function addVehicle(id, vrn) {
    const vehicleId = await db.query(
        `call sp_AddVehicle(?, ?)`, [id, vrn]
    );

    console.log('Add vehicle: ', vehicleId)

    return vehicleId || null;    
}

async function searchVehicle(vrn) {
    const [results] = await db.query(
        `call sp_SearchVehicleDetails(?)`, [vrn]
    );

    console.log('Vehicle.Model: ',results);
    return results || null;
}



module.exports = { fetchAccountVehicles, addVehicle, searchVehicle };