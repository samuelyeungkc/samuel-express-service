import { openGarageDoor, closeGarageDoor } from  './integrations/myq';
import { Request, Response, NextFunction } from 'express';

const fs = require('fs');
const express = require('express');

const expressConfigStr = fs.readFileSync('./configs/express.json', 'utf8');
const expressConfig: {port: number} = JSON.parse(expressConfigStr);

const app = express();
const port = expressConfig.port;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.get('/open-garage', (req: Request, res: Response) => {
    res.send('open garage Hello World!');
});

app.get('/close-garage', (req: Request, res: Response) => {
    res.send('close garage  Hello World!');
});


app.listen(port, (req: Request, res: Response) => {
    console.log(`Example app listening at http://localhost:${port}`)
});
