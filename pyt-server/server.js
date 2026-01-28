import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const db = await mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    connectionLimit: 10,
});

// user registration
app.post('/api/register', async (req, res) => {
    const { email, password, fname, surname, phone, vrn } = req.body;
    const hashed = await bcrypt.hash(password, 10);

    await db.query(
        ` insert into contact_details (EMAIL
            , PHONE
            , PASSWORD
        ) values (?
            , ?
            , ?
        )`, [email, phone, hashed], (err, result) => {
            if (err) {
                console.log(err, 1);
            } else {
                const cid = result.insertId;
                db.query (
                    `insert into customers (FIRSTNAME
                        , SURNAME
                        , CONTACTID
                    ) values (?
                        , ?
                        , ?
                    )`, [fname, surname, cid], (err, result) =>  {
                        if (err) {
                            console.log(err, 2)
                        } else {
                            const custid = result.insertId;
                            db.query(
                                `select national_vehicle_file.NVFID
                                    , national_vehicle_file.VEHICLEMAKE
                                    , national_vehicle_file.VEHICLEMODEL
                                    , national_vehicle_file.VEHICLECOLOUR
                                    , national_vehicle_file.VEHICLECLASS
                                    , national_owner_file.OWNERSEQUENCENO
                                    , national_owner_file.OWNERSTARTDATE
                                    , national_owner_file.OWNERENDDATE
                                from national_vehicle_file
                                inner join national_owner_file
                                    on national_vehicle_file.NVFID = national_owner_file.NVFID
                                where national_vehicle_file.VEHICLEREGNO = ?
                                and national_owner_file.OWNERENDDATE = '9999-12-31'`,
                                [vrn], (err, result) => {
                                    if (err) {
                                         console.log(err, 3)                                           
                                    } else {
                                        db.query(
                                            `insert into vehicles (VEHICLEREGNO
                                                , VEHICLEMAKE
                                                , VEHICLEMODEL
                                                , VEHICLECOLOUR
                                                , VEHICLECLASS
                                                , OWNERSEQUENCENUMBER
                                                , VEHICLESTARTDATE
                                                , VEHICLEENDDATE
                                                , ACCOUNTID
                                                , NVFID
                                            ) values (?
                                                , ?
                                                , ?
                                                , ?
                                                , ?
                                                , ?
                                                , ?
                                                , ?
                                                , ?
                                                , ?
                                            )`, [vrn, 
                                                result[0].national_vehicle_file.VEHICLEMAKE,
                                                result[0].national_vehicle_file.VEHICLEMODEL,
                                                result[0].national_vehicle_file.VEHICLECOLOUR,
                                                result[0].national_vehicle_file.VEHICLECLASS,
                                                result[0].national_owner_file.OWNERSEQUENCENO,
                                                result[0].national_owner_file.OWNERSTARTDATE,
                                                result[0].national_owner_file.OWNERENDDATE,
                                                custid,
                                                result[0].national_vehicle_file.NVFID,
                                            ], (err, result) => {
                                                if (err) {
                                                    console.log(err, 4)
                                                } else {
                                                    console.log('Success!')
                                                }
                                            }
                                        );
                                    }
                                }
                            );
                        }
                    }
                );
            }
        }
    );
});

// user login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const [users] = db.query('')
    
    if (users.length === 0 || !await bcrypt.compare(password, users[0].password)) {
        return res.status(401).send('Invalid credentials');
    }

    const token = jwt.sign({}, process.env.JWT_SECRET, { expiresIn: '1d'});
    res.json({ token });
});

// JWT middleware
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.sendStatus(403);
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch {
        res.sendStatus(403);
    }
};

//search for vehicle details
app.post('/api/vehicle_search', (req, res) => {
    const vrn = req.body.vrn;
    console.log(vrn);
    db.query(
        `select VEHICLEMAKE
            , VEHICLEMODEL
            , VEHICLECOLOUR
            , VEHICLECLASS
        from national_vehicle_file
        where VEHICLEREGNO = ?`,
        [vrn], (err, result) => {
            if (err) {
                console.log(err);
                res.send(['Error!', err.name]);
            } else if (result.length === 0) {
                console.log(`There is no vehicle matching the VRN: ${vrn}`);
                res.send(['Uh oh!', 'There is no vehicle matching the VRN provided!']);
            } else {
                console.log(`Vehicle ${vrn} found!`);
                res.send({
                    vrn: vrn,
                    vmk: result[0].VEHICLEMAKE,
                    vmd: result[0].VEHICLEMODEL,
                    vcr: result[0].VEHICLECOLOUR,
                    vcs: result[0].VEHICLECLASS,
                })
            }
        }
    )
});

app.listen(8080, () => {
    console.log('Server listening on Port 8080!');
});