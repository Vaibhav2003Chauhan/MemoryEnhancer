// const url = `https://random-word-api.herokuapp.com/word?number=25`;
const url = `https://random-word-api.herokuapp.com/all`
var words = Array();
var shuffledWords = Array(); // used to store the shuffled array of words
var choiceArray = Array();
var selectedWords=Array();


async function fetchAllWord() {
    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw new error(`Error: ${response.status}`)
        }
        else {
            let data = await response.json();
            console.log(data);
            words = data;
            words = words.splice(0,25); // storing only first 25 elements 
            console.log("the reduced array is");
            console.log(words)
        }
    }
    catch (error) {
        console.log(error);

    }

    let wordsSection = document.getElementsByClassName('SecondContainer')[0];
    wordsSection.innerHTML = ``;
    for (let i = 0; i < words.length; i++) {
        wordsSection.innerHTML += `<div id="word-${i}" class="wordstructure">
                ${words[i]}
                <button id="cross-${i}" class="hidden">X</button>
            </div>`
    }

    // testing the new added feature to fetch the words 
}

// Fisher-Yates Shuffle Algorithm
function shuffleArray(array) {
    let sarray = Array();
    sarray = words;
    for (let i = sarray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
        [sarray[i], sarray[j]] = [sarray[j], sarray[i]]; // Swap elements
    }
    return sarray;
}

function generate3RandomChoice() {
    let randomChoices = new Set(); //ensuring the uniqueness
    while (randomChoices.size < 3) {
        let randomNumber = Math.floor(Math.random() * 26) + 1; // Generate random number between 1 and 26
        randomChoices.add(randomNumber); // Add to Set (Set automatically ensures uniqueness)
    }

    return Array.from(randomChoices);
}

  
// Making the array shuffle and starting the Game : in this array has to be shuffled and generation of the random words for score Checking and also 

function startGame() {
    //using shuffled array as original here 
    console.log(" Starting the Game ");
    shuffledWords = shuffleArray(words);
    console.log(shuffledWords);
    choiceArray = generate3RandomChoice();
    console.log("choices are as " + choiceArray);
    let wordsSection = document.getElementsByClassName('SecondContainer')[0];
    wordsSection.innerHTML = ``;
    for (let i = 0; i < words.length; i++) {
        wordsSection.innerHTML += `<div id="word-${i}" class="wordstructure">
                ${shuffledWords[i]}
                <button id="cross-${i}" class="hidden">X</button>
            </div>`
    }
    
    // showing the generated choice
    let i=0;
    while(i<3)
    {
        document.getElementById(`selectedWord-${i+1}`).innerHTML=choiceArray[i];
        i++;
    }

    // MAKING USER TO SELECT THE CHOICE 
    if(selectedWords.length==3)
    {
        alert("You have fullfiled your choices already")
    }
    else{
        document.getElementById(`word-${i}`).addEventListener("click", () => {
            console.log(`hello Button clicked successfully ${shuffledWords[i]}`)
            selectedWords.push(shuffledWords[i]);

        })
    }
    // for (let i = 0; i < words.length; i++) {
    //     document.getElementById(`word-${i}`).addEventListener("click", () => {
    //         console.log(`hello Button clicked successfully ${words[i]}`)

    //     })
    // } 

}
// handling of the selected word has to be called out again as it was not working well : implement onclick with function or fetch element from Dom lets think of it :