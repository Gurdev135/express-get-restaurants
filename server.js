const express = require("express");
const app = express();
const port = 3000;
const {sequelize} = require("./db");
const router = require("./express_router/router");

app.use('/', router);



app.listen(port, async () => {
    await sequelize.sync();
    console.log("Your server is listening on port " + port);
})