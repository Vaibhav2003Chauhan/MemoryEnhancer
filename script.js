// const url = `https://random-word-api.herokuapp.com/word?number=25`;
const url = `https://random-word-api.herokuapp.com/all`
var words = Array();
var shuffledWords = Array(); // used to store the shuffled array of words


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
            words = words.splice(0, 25); // storing only first 25 elements 
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
    for (let i = 0; i < words.length; i++) {
        document.getElementById(`word-${i}`).addEventListener("click", () => {
            console.log(`hello Button clicked successfully ${words[i]}`)
        })
    }
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



// Making the array shuffle and starting the Game : in this array has to be shuffled and generation of the random words for score Checking and also 

function startGame() {
    console.log(" Starting the Game ");
    shuffledWords = shuffleArray(words);
    console.log(shuffledWords);
    let wordsSection = document.getElementsByClassName('SecondContainer')[0];
    wordsSection.innerHTML = ``;
    for (let i = 0; i < words.length; i++) {
        wordsSection.innerHTML += `<div id="word-${i}" class="wordstructure">
                ${shuffledWords[i]}
                <button id="cross-${i}" class="hidden">X</button>
            </div>`
    }

}