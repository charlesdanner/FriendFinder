const friendsList = require('../data/friends.js');  //requiring friends list for use

module.exports = app => {                                //exporting the express route functions
    app.get('/api-friends-list', (req, res) => {
        res.json(friendsList)                           //sends the friends list array as a json object to the browser when they press the link in the html
    })

    app.post('/survey', (req, res) => {                         
        const matchValues = []          //variable to hold the math comparing the client and DB results to one another
        const clientScores = req.body.newFriend.scores
        
        const friendsToBeCompared = friendsList.filter((friend) =>          //friends filtered so user can't get themselves 
            friend.name !== req.body.newFriend.name)

        const friendScoreArray = friendsToBeCompared.map(friends =>         //of the friends that aren't the user, make an array of their survey results
            friends.scores)

        friendScoreArray.forEach(arr => 
            matchValues.push(arr.map((value, idx) =>    //compare the client and DB scores to one another and find the difference between the two
                Math.abs(value - clientScores[idx])     //push an array for each friend containing the score differences between them and the client into the matchValues array
            ))
        )

        const matchValueSums = matchValues.map(arr =>       //take the arrays of results and sum them together to find which is the lowest value
            arr.reduce((val, total) => total += val, 0))

        const matchValueSumsCopy = matchValueSums.map(value => value)       //make a copy of the summed values for reference

        matchValueSums.sort((a, b) => a < b ? -1 : 1)       //sort the values from lowest to highest
        
        const bestMatch = friendsToBeCompared[matchValueSumsCopy.indexOf(matchValueSums[0])]        //compare the lowest score to its original index placement and refer back to the original array containing the DB results for the correct match
        res.json(bestMatch);              //send the best match back to the client as a response
        
    })
}