const path = require('path');


module.exports = app => {

    
    
    app.get("/survey", function (req, res) {
        res.sendFile(path.join(__dirname, "/../public/survey.html"));
    });

    //the redirect needs to be under the rest of the routes or it will redirect regardless of what they type.
    app.use(function (req, res) {
        res.sendFile(path.join(__dirname, "/../public/home.html"));   //if the user types anytihing other than survey, it redirects to the root
    });
}

