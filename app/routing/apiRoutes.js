const friendsList = require('../data/friends.js');

module.exports = app => {
    app.post('/survey', function (req, res) {
        
        const matchValues = [];
        for(var i = 0; i < friendsList.length; i++){
            let sum = 0;
            for(var j = 0; j < 10; j++){
                 sum += (Math.abs(req.body.newFriend.scores[j] - friendsList[i].scores[j]))
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
        friendsList.push(req.body.newFriend);
        res.json(bestMatch);
})}