const port = 4329;
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const path = require('path');
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));



// אתחול חיבור מסד נתונים
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'homework_weaam'
});

// חיבור למסד הנתונים
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
        return;
    }
    console.log('Connected to the MySQL server.');
});
// נקודות שמירה התחלתית
let points = [
    { id: 1, pointName: "חדר מצלמות", location: "צפון" },
    { id: 2, pointName: "מחסן ראשי", location: "מערב" },
    { id: 3, pointName: "חדר שמירה", location: "דרום" },
    { id: 4, pointName: "בניין משרדים", location: "מזרח" },
    { id: 5, pointName: "שער ראשי", location: "מזרח" },
    { id: 6, pointName: "חניון אורחים", location: "מערב" }
];
app.get('/points', (req, res) => {
    res.status(200).json(points);
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
