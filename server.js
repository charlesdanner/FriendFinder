const express = require("express");         //require express
const app = express();
const PORT = process.env.PORT || 3000;      //set the port to the environment its being run from or default to port 3000 for development

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./app/public'));

                                        //APIROUTES MUST BE REQUIRED BEFORE HTML
require('./app/routing/apiRoutes')(app);    //requiring the apiRoutes functions to send and receive data
require('./app/routing/htmlRoutes')(app)    //requiring the htmlRoutes functions to send html docs depending on which url the client is on

app.listen(PORT, function () {                  //express is listening at the port its running on for data requests
    console.log("App listening on PORT " + PORT);
});