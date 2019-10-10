const path = require('path');


module.exports = app => {

    app.use(function (req, res) {
        res.sendFile(path.join(__dirname, "/app/public/home.html"));   //if the user types anytihing other than survey, it redirects to the root
    });
    
    app.get("/survey", function (req, res) {
        res.sendFile(path.join(__dirname, "/app/public/survey.html"));
    });
}

