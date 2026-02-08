const { db } = require('../config/db');

// find if email already exists on the db
async function findUserByEmail(email) {
    const [rows] = await db.query(
        `select CONTACTID
            , EMAIL
        from contact_details
        where EMAIL = ?;`, [email]
    );
    return rows[0] || null;
}

// user registration
async function createUser({email, password, fname, surname, phone, vrn}) {
    const [result] = await db.query(
        `call sp_AddCustomer(?, ?, ?, ?, ?, ?);`, 
        [email, password, fname, surname, phone, vrn]
    );
    return result.insertId;
}

module.exports = { createUser, findUserByEmail };