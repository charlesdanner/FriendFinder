document.addEventListener("DOMContentLoaded", event => {


    document.getElementById('submit').onclick = e => {
        e.preventDefault();
        const formAnswers = [];
        const error = document.querySelector('.error');
        const clientName = document.getElementById('clientName').value.trim();
        const clientImage = document.getElementById('clientImage').value.trim()

        const is_url = clientImage => {
            regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
            if (regexp.test(clientImage)) return true;
            else return false;
        }

        if (clientName.length < 3 || !is_url(clientImage)) {
            error.style.display = 'block';
            error.style.color = 'red';
        } else {
            let getCheckedValue = radioName => {
                let radios = document.getElementsByName(radioName);
                for (var j = 0; j < radios.length; j++) {
                    if (radios[j].checked) {
                        return radios[j].value;
                    }
                }
            }
            for (var i = 1; i < 11; i++) {
                formAnswers.push(getCheckedValue('question' + i))
            }
            console.log(formAnswers)
            if (formAnswers.length < 10 || formAnswers.includes(undefined)) {
                error.style.display = 'block';
                error.style.color = 'red';
            } else {
                let newFriend = {
                    name: clientName,
                    image: clientImage,
                    scores: formAnswers
                }
                console.log(newFriend)
                function performPostRequest(e) {
                    console.log('this is working')
                    axios.post('/survey', {
                        newFriend
                    })
                        .then(response => {
                    //         <img id='friendImage'>
                    // <ul>
                    //     <li id='friendName'></li>
                    //     <li id="friendEmail"></li>
                            console.log(response.data)
                            let friendImage = document.getElementById('friendImage');
                            let friendName = document.getElementById('friendName');
                            friendImage.src = response.data.image
                            friendName.innerHTML = response.data.name
                            
                        }).catch(error => {
                            if(error) console.log(error)
                            
                        })

                }
                performPostRequest()
            }
        }
    }
})
