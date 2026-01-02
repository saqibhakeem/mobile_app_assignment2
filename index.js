const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/get-users', async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM users`);
        res.json(result.rows);
    } catch (err) {
        
        res.status(500).json({ error: err.message });
    }});

app.post('/add-user', async (req, res) => { 
    try {

        const { id, name } = req.body;
        const result = await pool.query(
            `INSERT INTO users (id, name) VALUES ($1, $2) RETURNING *`,
            [id, name]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }});






const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is Running on port ${PORT}`);
});

