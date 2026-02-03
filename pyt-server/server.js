import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

// use .env file for environment variables
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// create connection pool
const db = await mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    connectionLimit: 10,
});


// JWT middleware
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    // console.log(token)
    if (!token) return res.status(403).send('Token Missing!');
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch {
        console.error('Invalid Token: ', err);
        res.sendStatus(403).send('Invalid Token!');
    }
};


// user registration
app.post('/api/register', async (req, res) => {
    const { email, password, fname, surname, phone, vrn, } = req.body;
    const hashed = await bcrypt.hash(password, 10);

    const cust = await db.query(
        `call sp_AddCustomer(?, ?, ?, ?, ?, ?, @custID);`, 
        [email, hashed, fname, surname, phone, vrn]
    );
    res.sendStatus(201);
});


//search for vehicle details
app.post('/api/vehicle_search', async (req, res) => {
    const vrn = req.body.vrn;
    const veh = await db.query(
        `select VEHICLEMAKE
            , VEHICLEMODEL
            , VEHICLECOLOUR
            , VEHICLECLASS
        from national_vehicle_file
        where VEHICLEREGNO = ?`,
        [vrn]
    )
    // console.log(veh[0][0]);
    res.send(veh[0][0]);
});


// user login
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const [users] = await db.query(`call sp_Login(?)`, [email]);
        //console.log(users[0][0]);

        // chack that email is on the system
        if (users.length === 0) {
            return res.status(401).send('Invalid Credentials!');
        }

        // check if the correct password has been provided
        const match = await bcrypt.compare(password, users[0][0].PASSWORD);
        if (!match) return res.status(401).send('Invalid Credentials!');

        // 
        const token = jwt.sign({ id: users[0][0].CUSTOMERID}, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        //
        const custID = users[0][0].CUSTOMERID;

        res.json({ token, custID });
    } catch (err) {
        console.error('Login error: ', err);
        res.status(500).send('Internal Server Error!');
    }
});


// account summary
app.post('/api/account_summary_1/:id', authenticate, async (req, res) => {
    const num = parseInt(req.params.id.split(':')[1]);
    const [results] = await db.query(`call sp_AccountSummary_1(?)`, [num]);
    console.log(results);

    res.json(results[0]);
});

app.post('/api/account_summary_2/:id', authenticate, async (req, res) => {
    const num = parseInt(req.params.id.split(':')[1]);
    const [results] = await db.query(`call sp_AccountSummary_2(?)`, [num]);
    console.log(results);

    res.json(results[0]);
});


// start server on port
app.listen(5000, () => {
    console.log('Server listening on Port 5000!');
});