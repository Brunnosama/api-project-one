const express = require("express");
const app = express();
const routes = require("./routes");

app.use(express.json())

routes(app)



app.listen('3003', () => console.log('API is Running'))

