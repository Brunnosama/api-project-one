const express = require("express");
const app = express();
const routes = require("./routes");
const PORT = process.env.PORT || 3003;

app.use(express.json());

routes(app);

app.listen('3003', () => console.log(`The server is running on ${PORT} port`));

