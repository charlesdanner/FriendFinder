const friendsList = require('../data/friends.js');  //requiring friends list for use

module.exports = app => {                                //exporting the express route functions
    app.get('/api-friends-list', (req, res) => {        
        res.json(friendsList)                           //sends the friends list array as a json object to the browser when they press the link in the html
    })

    app.post('/survey', function (req, res) {               //function that runs when a post is made
        
        const filteredArr = []
        const matchValues = [];
        const filterFriends = (friend) =>{
            if(friend.name !== req.body.newFriend.name){        //filters the friendsList so that you can't be matched with a user with the same name as you. 
                filteredArr.push(friend)                        //That's either you or it would be creepy to be friends with them
            }
        }
        friendsList.filter(filterFriends)

        for(var i = 0; i < filteredArr.length; i++){            //for loops that loop through the different people in the array and then loop through the scores they submitted
            let sum = 0;
            for(var j = 0; j < 10; j++){
                 sum += (Math.abs(req.body.newFriend.scores[j] - filteredArr[i].scores[j]))     //gets the absolute value of the difference between the client's score and the potential match's scores at each index and sums them into one total
            }
            matchValues.push(sum)
        }
        let bestMatchValue = matchValues[0];        //gives best match an initial value
        
        for(var i = 1; i < matchValues.length; i++){
            if(matchValues[i] < bestMatchValue){
                bestMatchValue = matchValues[i];        //if a match has a lower rating (better match) than the current, then replace the bestMatchValue with the new value
                bestMatch = friendsList[i]
            } 
        }
        bestMatch = friendsList[matchValues.indexOf(bestMatchValue)]        //find the friend who produced the best value
        friendsList.push(req.body.newFriend);                   //push the req into the friends list
        res.json(bestMatch);                                    //send the best match back to the client as a response
})}