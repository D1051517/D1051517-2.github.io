var express = require('express');
var router = express.Router();

const sqlite = require('sqlite3').verbose();
hw4 = new sqlite.Database("./hw4.sqlite", sqlite.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});

router.get('/', function(req, res, next) {
    sql= "SELECT * FROM quote";
    hw4.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.send(rows);
    });
});
router.post('/', (req, res) => {
    const {date, name, price}=req.body;
    sql = "INSERT INTO quote (date, name, price) VALUES (?, ?, ?)";
    hw4.run(sql, [date, name, price], (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send(err.message);
        }
        console.log('inserted');
    });
    res.redirect('/index.html');
    // return res.status(200).send('inserted');
})

module.exports = router;