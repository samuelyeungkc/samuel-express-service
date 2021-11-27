import {Request, Response} from 'express';
import {GarageDoorCommand, MyQRequest} from './types/MyQTypes';
import {MyQ} from './integrations/myq';

const fs = require('fs');
const express = require('express');

// express web server setup
const expressConfigStr = fs.readFileSync('./configs/express.json', 'utf8');
const expressConfig: {port: number} = JSON.parse(expressConfigStr);
const app = express();
const port = expressConfig.port;

// myQ integration setup
const data = fs.readFileSync('./configs/myq.json', 'utf8');
const config: {email: string, password: string, apiKey: string} = JSON.parse(data);
const myQ = new MyQ(config.email, config.password);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.get('/open-garage', (req: MyQRequest, res: Response) => {
    if (config.apiKey === req.query.key) {
        myQ.setGarageDoor(GarageDoorCommand.OPEN).then(() => {
            res.send('Opening garage');
        })
    } else {
        res.send('Unauthorized');
    }
});

app.get('/close-garage', (req: MyQRequest, res: Response) => {
    if (config.apiKey === req.query.key) {
        myQ.setGarageDoor(GarageDoorCommand.CLOSE).then(() => {
            res.send('Closing garage');
        })
    } else {
        res.send('Unauthorized');
    }
});

app.listen(port, (req: Request, res: Response) => {
    console.log(`Example app listening at http://localhost:${port}`)
});
