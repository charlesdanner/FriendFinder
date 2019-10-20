document.addEventListener("DOMContentLoaded", event => {  //javascript only starts running after the DOM is loaded

    document.getElementById('submit').onclick = e => {      //event listener listening for client to click the submit button on the survey form
        e.preventDefault();
        const formAnswers = [];         //empty array that stores the client's multiple choice answers
        const error = document.getElementById('error');     //error message text that could potentially be shown if not all data is filled out
        const clientName = document.getElementById('clientName').value.trim();      //client name value stored to a variable
        const clientImage = document.getElementById('clientImage').value.trim();     //client image value stored to a variable

        const is_url = clientImage => {         //regexp function that figures out if the client's input is a valid URL or not
            regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
            if (regexp.test(clientImage)) return true;
            else false;
        }

        if (clientName.length < 3 || !isNaN(clientName) || !is_url(clientImage)) {    //client's name must be longer than 2 characters in length and image must be a valid url link
            error.style.display = 'block';
            error.style.color = 'red';
        } else {
            const getCheckedValue = radioName => {
                const radios = document.getElementsByName(radioName);         //loops through the radios and returns the value of the selected radio
                for (var j = 0; j < radios.length; j++) {
                    if (radios[j].checked) {
                        return parseInt(radios[j].value);
                    }
                }
            }
            for (var i = 1; i < 11; i++) {
                formAnswers.push(getCheckedValue('question' + i))           //calls the function looping the radios and gives the argument of an incrementing question number
            }
            console.log(formAnswers)
            if (formAnswers.length < 10 || formAnswers.includes(undefined)) {   //if a multiple choice question isn't answered the error pops up
                error.style.display = 'block';
                error.style.color = 'red';
            } else {
                const newFriend = {       //if no errors occur, new friend object is created with user's inputs
                    name: clientName,
                    image: clientImage,
                    scores: formAnswers
                }

                axios.post('/api-survey', { //an axios post call is made             
                    newFriend                           //sends the newFriend object to the server and waits for a response
                })
                    .then(response => {             //after the server responds and figures out which friend in the DB is the best match
                        console.log(response.data)
                        const modal = document.getElementById('myModal');

                        const clientNameInput = document.getElementById('clientName')
                        const clientImageInput = document.getElementById('clientImage')
                        const friendImage = document.getElementById('friendImage');   //set html modal elements to variables
                        const friendName = document.getElementById('friendName');
                        const span = document.getElementById('span')

                        const resetCheckedValue = radioName => {
                            const radios = document.getElementsByName(radioName);         //loops through the radios and makes them all unchecked
                            for (var i = 0; i < radios.length; i++) {
                                radios[i].checked = false
                            }
                        }
                        clientNameInput.value = null;
                        clientImageInput.value = null;      //resets the values of the input boxes and the sets the error message back to default display setting
                        error.style.display = 'none'
                        modal.style.display = "block";      //when the data comes back, the modal opens

                        for (var i = 1; i < 11; i++) {
                            resetCheckedValue('question' + i)           //calls the function looping the radios and gives the argument of an incrementing question number
                        }

                        friendImage.src = response.data.image                   //set the match to the friendImage <img> element in the modal
                        friendName.innerHTML = response.data.name               //set the title of the modal to the name of the friend

                        span.onclick = () => {
                            modal.style.display = "none";        //when the client presses the "x" button, the modal closes
                        }

                        window.onclick = event => {     //if the client clicks outside of the modal, the modal closes
                            if (event.target == modal) modal.style.display = "none";                     
                        }

                    }).catch(error => {
                        if (error) console.log(error)        //if an error occurs, console log it.
                    })
            }
        }
    }
})
