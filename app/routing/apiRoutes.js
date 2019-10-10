const path = require('path');

module.exports = app => {
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
})}