const express = require('express');
const router = express.Router();
const pg = require('pg');
const path = require('path');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/plasticc';

/* GET home page. */
//router.get('/', function (req, res, next) {
//    res.render('index', { title: 'Express' });
//});

router.get('/', (req, res, next) => {
    res.sendFile('index.html');
});



router.post('/api/v1/plasticc', (req, res, next) => {
    const results = [];
    // Grab data from http request
    const data = { text: req.body.text, complete: false };
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err });
        }
        // SQL Query > Insert Data
        client.query('INSERT INTO user_classified(object_id, user_target) values($1, $2)',
            [data.text, data.text]);
        // SQL Query > Select Data
        const query = client.query('SELECT * FROM user_classified ORDER BY id ASC');
        // Stream results back one row at a time
        query.on('row', (row) => {
            results.push(row);
        });
        // After all data is returned, close connection and return results
        query.on('end', () => {
            done();
            return res.json(results);
        });
    });
});


router.get('/api/v1/plasticc', (req, res, next) => {
    const results = [];
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err });
        }
        // SQL Query > Select Data
        const query = client.query('SELECT * FROM user_classified ORDER BY id ASC;');
        // Stream results back one row at a time
        query.on('row', (row) => {
            results.push(row);
        });
        // After all data is returned, close connection and return results
        query.on('end', () => {
            done();
            return res.json(results);
        });
    });
});

router.put('/api/v1/plasticc/:id', (req, res, next) => {
    const results = [];
    // Grab data from the URL parameters
    const id = req.params.id;
    // Grab data from http request
    const data = { text: req.body.text, complete: req.body.complete };
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err });
        }
        // SQL Query > Update Data
        client.query('UPDATE user_classified SET text=($1), complete=($2) WHERE id=($3)',
            [data.text, data.complete, id]);
        // SQL Query > Select Data
        const query = client.query("SELECT * FROM user_classified ORDER BY id ASC");
        // Stream results back one row at a time
        query.on('row', (row) => {
            results.push(row);
        });
        // After all data is returned, close connection and return results
        query.on('end', function () {
            done();
            return res.json(results);
        });
    });
});

router.delete('/api/v1/plasticc/:id', (req, res, next) => {
    const results = [];
    // Grab data from the URL parameters
    const id = req.params.id;
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err });
        }
        // SQL Query > Delete Data
        client.query('DELETE FROM user_classified WHERE id=($1)', [id]);
        // SQL Query > Select Data
        var query = client.query('SELECT * FROM user_classified ORDER BY id ASC');
        // Stream results back one row at a time
        query.on('row', (row) => {
            results.push(row);
        });
        // After all data is returned, close connection and return results
        query.on('end', () => {
            done();
            return res.json(results);
        });
    });
});



module.exports = router;
