const Decimal = require('decimal.js');
const express = require('express');
const app = express()

app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.json()); // for parsing application/json

app.post('/api/add', (req, res) => {
    const num1 = new Decimal(req.body.num1 || 0);
    const num2 = new Decimal(req.body.num2 || 0);
    res.json({ result: num1.plus(num2).toNumber() }) // this endpoint returns a JSON object with a property result
})

app.post('/api/subtract', (req, res) => {
    const num1 = new Decimal(req.body.num1 || 0);
    const num2 = new Decimal(req.body.num2 || 0);
    res.json({ result: num1.minus(num2).toNumber() }) 
})

const server = app.listen(3000, () => { console.log('Server started on port 3000') })

module.exports = server; // to export server instance for test file