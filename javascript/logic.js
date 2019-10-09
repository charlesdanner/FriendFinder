document.addEventListener("DOMContentLoaded", function (event) {


    document.getElementById('submit').onclick = function (e) {
        e.preventDefault();
        const formAnswers = [];
        const clientName = document.getElementById('clientName').value.trim();
        const routeName = clientName.replace(/\s+/g, "").toLowerCase();

        if(clientName.length < 3){
            //make an error message show up
        } else {
            const getCheckedValue = radioName => {
                const radios = document.getElementsByName(radioName);
                for (var j = 0; j < radios.length; j++) {
                    if (radios[j].checked) {
                        return radios[j].value;
                    }
                }
            }
            for (var i = 1; i = 10; i++) {
                formAnswers.push(getCheckedValue('question' + i))
            }
            console.log(formAnswers)
            if(formAnswers.length < 10){
                //make an error message show up
            } else {
                //make ajax call to server
            }
        }


    
    console.log(clientName);    
}

  
})
