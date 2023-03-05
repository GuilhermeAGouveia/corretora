import app from "./app"
import { AddressInfo } from "net";


const server = app.listen(process.env.PORT || 3333, () => {
    var { port, address } = server.address() as AddressInfo;
    console.log(`App listening at ${address} on port ${port}!`);
  });
  