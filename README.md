# FriendFinder

## Description

Friend Finder is a full stack application used to simulate dating apps or apps for finding people with similar interests/hobbies. The idea is for users to fill out a form to give a summary of their personality and to match them with someone who may be compatable. The form is a rendered html page that is sent to the user using an Express server. The answers are sent to the server, parsed through and stored. The answers that the client gives are compared to previous answers from other clients and the server responds to the client's axios call by sending a JSON object with the information of the user who best matches them.

## Prerequisites

There are no prerequisites in order for a client to use the application. Simply go to the webpage, fill out the form and receive a response that will appear on the DOM. To get your own working version of the application, you will need a working Express server, the dependent node modules listed below and somewhere to deploy the site, such as Heroku.

## Under the Hood

The front end is fairly standard with nothing fancy happening. The webpages are HTML documents with a CSS stylesheet making them more appealing for users to interact with. There is a javascript file to handle the front end JavaScript. The front end JavaScript is required for input validation, collecting, sorting and sending data to the server, displaying error messages if the form could not be sent due to incomplete fields in the form and toggling the modal that the server's response appears in. 

The server is a Node Express server that is compartmentalized into several different folders and documents. All urls sent to the server will be defaulted back to the homepage with the exception of the /survey directory and the /api-friends-list directory. These will send a form to fill out and a list of all the members in the friends list that the server is storing to the client in the form of a JSON object. The most interesting part about the server side API is that when users POST information to the server and expect a response, they are expecting someone other than themselves. If users fill out the survey more than once there is a good chance that they will be selecting mostly the same answers for each of the questions, so the server filters through the previous clients and filters out the clients with the same name as the client requesting a friend match. This may filter out some people who just happen to have the same name, but it is worth it to not have users receive their previous submissions as a response.

While this is a full stack application, there is no true database being used. Instead, an array that contains all of the friends was created and is stored in a separate file that is being required by the server and the API Routes to use. This was done to simulate a database, but because the entries are fairly simple a database was not necessary for this application and would have been overkill.

## Built With 

* JavaScript
* HTML
* CSS
* Node.js
* Express NPM
* Axios NPM

### Authors
* Charles Danner - https://github.com/charlesdanner

### Link
