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
// הוספת נקודות שמירה התחלתית לבסיס הנתונים
const sql = 'INSERT INTO points (id, pointName, location) VALUES ?';
const values = points.map(point => [point.id, point.pointName, point.location]);
connection.query(sql, [values], (error, results) => {
    if (error) {
        console.error("Error occurred while inserting points!");
    } else {
        console.log('Insert successful:', results);
    }
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
