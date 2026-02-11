const { db } = require('../config/db');

// find if email already exists on the db
async function findUserByEmail(email) {
    const [rows] = await db.query(
        `select contact_details.CONTACTID
            , contact_details.EMAIL
            , customers.CUSTOMERID
        from contact_details
        join customers on contact_details.CONTACTID = customers.CONTACTID
        where EMAIL = ?;`, [email]
    );
    return rows[0] || null;
}

// user registration
async function createUser({email, password, fname, surname, phone, vrn}) {
    // console.log({email, password, fname, surname, phone, vrn});
    const [result] = await db.query(
        `call sp_AddCustomer(?, ?, ?, ?, ?, ?)`, 
        [email, password, fname, surname, phone, vrn]
    );
    return result.insertId;
}

// get user details for account summary page
async function fetchCustomerDetails(id) {
    const results = [];
    const [rows_pd] = await db.query(
        `call sp_AccountSummary_1(?)`, [id]
    );

    const [rows_vd] = await db.query(
        `call sp_AccountSummary_2(?)`, [id]
    );

    const [rows_jd] = await db.query(
        `call sp_AccountSummary_3(?)`, [id]
    )
    results.push(rows_pd[0]);
    results.push(rows_vd[0]);
    results.push(rows_jd[0]);
    // console.log(results);
    return results || null;
}

async function resetPassword(password, id) {
    const [result] = await db.query(
        `call sp_ResetPassword(?, ?)`, [password, id]
    )
    
    return result || null;
}

module.exports = { createUser, findUserByEmail, fetchCustomerDetails, 
    resetPassword };