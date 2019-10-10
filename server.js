const express = require("express");
const path = require("path");
const friendsList = require('./app/data/friends.js')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./app/public'));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/app/public/home.html"));
});

app.get("/survey", function (req, res) {
    res.sendFile(path.join(__dirname, "/app/public/survey.html"));
});

app.post('/survey', function (req, res) {
    
    const matchValues = [];
    for(var i = 0; i < friendsList.length; i++){
        let sum = 0;
        for(var j = 0; j < friendsList[i].scores.length; j++){
             sum += (Math.abs(req.body.scores[j] - friendsList[i].scores[j]))
        }
        matchValues.push(sum)
    }
    let bestMatchValue = matchValues[0];
    
    for(var i = 1; i < matchValues.length; i++){
        if(matchValues[i] < bestMatchValue){
            bestMatchValue = matchValues[i];
            bestMatch = friendsList[i]
        } 
    }
    bestMatch = friendsList[matchValues.indexOf(bestMatchValue)]
    res.json(bestMatch);

    

    const friend = {
        name: req.body.name,
        image: req.body.image,
        scores: req.body.scores
    }
})


app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});