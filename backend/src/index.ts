import express from 'express';
import { AddressInfo } from 'net';
import imvRouter from './routes/imovel';
import userRouter from './routes/user';
const cors = require('cors');


const app = express();


app.use(cors());

app.use(express.json());
app.use([userRouter, imvRouter]);
app.get('/', (req, res) => {
    res.send('Hello World!');
});


const server = app.listen(3330, () => {
    var { port, address } = server.address() as AddressInfo;
    console.log(`App listening at ${address} on port ${port}!`);
});