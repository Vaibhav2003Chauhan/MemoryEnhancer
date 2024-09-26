// const url = `https://random-word-api.herokuapp.com/word?number=25`;
const url = `https://random-word-api.herokuapp.com/all`
var words = Array();
var shuffledWords = Array(); // used to store the shuffled array of words
var choiceArray = Array();
var selectedWords = Array();


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
    selectedWords = []; // making the selectetion as zero each time game start
    choiceArray = []; // making the array which contain random 3 choices to be made empty
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
    let i = 0;
    while (i < 3) {
        document.getElementById(`selectedWord-${i + 1}`).innerHTML = choiceArray[i];
        i++;
    }

    // MAKING USER TO SELECT THE CHOICE 
    if (selectedWords.length <= 3) {
        for (let i = 0; i < shuffledWords.length; i++) {
            document.getElementById(`word-${i}`).addEventListener("click", () => {
                console.log(`The selected word from the user is as:  ${shuffledWords[i]}`)
                handleClickEvent(shuffledWords[i]);
                console.log("handle click function invoked with : " + shuffledWords[i]);

                // Enabling the X sign to show up in the word also 
                if (selectedWords.length <= 3) {
                    let cancel = document.getElementById(`cross-${i}`);
                    cancel.classList.remove('hidden');
                }
            })
        }
    }
    else{
        return;
    }

    for (let i = 0; i < shuffledWords.length; i++) {
        document.getElementById(`cross-${i}`).addEventListener("click", () => {
            console.log("Enable the X sign in that name of the word to be delete " + shuffledWords[i]);
            deleteSelection(shuffledWords[i]);
        })
    }
}

function handleClickEvent(userchoice) {
    if (selectedWords.length >= 3) {
        alert("You have made all your choices and not allowed to make more of it ");
        return;

    }

    else {
        if (!selectedWords.includes(userchoice)) {
            console.log("User choice is :" + userchoice)
            selectedWords.push(userchoice);
            displaySelectedWord();
        }
        else {
            // alert("The Word is already selected make a different selection please");
        }
    }
}



function displaySelectedWord() {
    console.log("Selection array is as ");
    console.log(selectedWords);
    for (let i = 0; i < selectedWords.length; i++) {
        document.getElementById(`selectedWord-${i + 1}`).innerHTML = selectedWords[i];
    }
}

// function deleteSelection(wordToBeDeleted)
// {
//     console.log("deletion word ")
//     console.log(wordToBeDeleted);
//     let indexToBeDeleted=selectedWords.indexOf(wordToBeDeleted);
//     console.log("deleted index is :"+indexToBeDeleted);
//     selectedWords.splice(indexToBeDeleted,1);
//     displaySelectedWord();

// }

function deleteSelection(wordToBeDeleted) {
    console.log("Attempting to delete word: ", wordToBeDeleted);

    // Find the index of the word to be deleted in the array
    let indexToBeDeleted = selectedWords.indexOf(wordToBeDeleted);

    // Check if the word exists in the array
    if (indexToBeDeleted !== -1) {
        console.log("Deleted index is: " + indexToBeDeleted);
        selectedWords.splice(indexToBeDeleted, 1); // Remove the word from the array
        displaySelectedWord(); // Update the display after deletion
    } else {
        console.log("Word not found in the selectedWords array.");
    }
}

// todo for tommmorow : as soon as we click on the X button the word got selected again and once again add in the array of the selection and also I can abe to make more than 3 X selection at once

//Quick fixes canbe used as new array and re rendering if the words again

