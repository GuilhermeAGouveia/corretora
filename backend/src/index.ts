import express from 'express';
import { AddressInfo } from 'net';
import imvRouter from './routes/imovel';
import userRouter from './routes/user';
const cors = require('cors');


const app = express();


app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
}));

app.use(express.json());
app.use([userRouter, imvRouter]);


const server = app.listen(3330, () => {
    var { port, address } = server.address() as AddressInfo;
    console.log(`App listening at ${address} on port ${port}!`);
});