const path = require('path');  //require path so it makes using relative pathing easier when we deploy to heroku

module.exports = app => {       //export the functions for getting the HTML

    app.get("/survey",(req, res) => {
        res.sendFile(path.join(__dirname, "/../public/survey.html"));       //send the survey html when users are directed to this url
    });

    //the redirect needs to be under the rest of the routes or it will redirect regardless of what they type.
    app.use((req, res) => {
        res.sendFile(path.join(__dirname, "/../public/home.html"));   //if the user types anytihing other than survey, it redirects to the root
    });
}

