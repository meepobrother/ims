import express from 'express'

const app = express();

app.get('/', (req, res, next) => {
    res.end('3131')
});

app.listen(3131)