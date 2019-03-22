let randomCountryElement = document.querySelector('#random-country')
let userAnswerElement = document.querySelector("#user-answer")
let submitButton = document.querySelector("#submit-answer")
let resultTextElement = document.querySelector('#result')
let playagainelement = document.querySelector("#play-again")


// TODO when the page loads, select an element at random from the countriesAndCodes array
let rand = countriesAndCodes[Math.floor(Math.random() * countriesAndCodes.length)]
// This array is defined in the countries.js file. Your browser treats all
// JavaScript files as one big file, organized in the order of the script tags
// so countriesAndCodes is available to this file
console.log(countriesAndCodes)  // You don't need to log countriesAndCodes - just proving it is available
// TODO display the country's name in the randomCountryElement
randomCountryElement.innerHTML=rand.name

// TODO add a click event handler to the submitButton.  When the user clicks the button,
playagainelement.addEventListener('click', function () {
    randomCountryElement.innerHTML='';
    let rand2 = countriesAndCodes[Math.floor(Math.random() * countriesAndCodes.length)]
    randomCountryElement.innerHTML=rand2.name
})
submitButton.addEventListener('click',function () {
    let answer=userAnswerElement.value

    let url = 'http://api.worldbank.org/v2/country/'+rand['alpha-2']+'?format=json'

    fetch(url)
        .then( res => res.json())
        .then( issData => {
            console.log(issData)

            let cap = issData[1][0].capitalCity
            console.log(cap)
            if (answer === cap){
                resultTextElement.innerHTML=`You are correct! The capital of  ${rand.name} is ${cap}.`
            }
            else{
                resultTextElement.innerHTML=`Wrong - the capital of ${rand.name} is not ${answer}, it is ${cap}`
            }
        })
        .catch( err => {
            console.log(err)
        })

})

//  * read the text from the userAnswerElement
//  * Use fetch() to make a call to the World Bank API with the country code (from countriesAndCodes)
//  * Extract the capital city from the World Bank API response
//  * Compare it to the user's answer.
//      You can decide how correct you require the user to be. A basic solution requires
//      the user's answer to be exactly the same as the World Bank answer. If you want
//      to be more flexible, include and use a string similarity library such as https://github.com/hiddentao/fast-levenshtein
//  * Display an appropriate result in the resultTextElement.
//      For example "Correct! The capital of Germany is Berlin" or "Wrong - the capital of Germany is not G, it is Berlin"