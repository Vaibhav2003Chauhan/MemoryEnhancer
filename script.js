const url = `https://random-word-api.herokuapp.com/word?number=25`;
var words = Array();
const vocabularyWords = [
    "Apple",
    "Book",
    "Car",
    "Dog",
    "Elephant",
    "Flower",
    "Garden",
    "House",
    "Ice",
    "Jacket",
    "Key",
    "Lamp",
    "Mountain",
    "Notebook",
    "Ocean",
    "Pencil",
    "Queen",
    "River",
    "Sun",
    "Tree",
    "Umbrella",
    "Village",
    "Window",
    "Xylophone",
    "Zoo",
    "Pen"
];
var shuffledWords = Array(); // used to store the shuffled array of words
var choiceArray = Array();
var selectedWords = Array();
var modifiedSelectedWords = Array();
var resultantArray = Array();


function fetchAllWord() {
    // try {
    //     // let response = await fetch(url);
    //     if (!response.ok) {
    //         throw new error(`Error: ${response.status}`)
    //     }    
    //     else {
    //         // let data = await response.json();
    //         // words = data;
    //         words = vocabularyWords;
    //         console.log(words);

    //     }
    // }
    // catch (error) {
    //     console.log(error);

    // }
    words = vocabularyWords;
    console.log(words);

    let wordsSection = document.getElementsByClassName('SecondContainer')[0];
    wordsSection.innerHTML = ``;
    for (let i = 1; i < words.length; i++) {
        wordsSection.innerHTML += `<div class="outerStructure">
            <div id="word-${i}" class="wordstructure">
                ${i}. ${words[i]}
            </div>
            <button id="cross-${i}" class="hidden cut">X</button>
            </div>`
    }

    // testing the new added feature to fetch the words 
}

// Fisher-Yates Shuffle Algorithm
function shuffleArray(array) {
    let sarray = [...array];
    for (let i = sarray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
        [sarray[i], sarray[j]] = [sarray[j], sarray[i]]; // Swap elements
    }
    console.log(sarray + "shuffled array")
    return sarray;
}

function generate3RandomChoice() {
    let randomChoices = new Set(); //ensuring the uniqueness
    while (randomChoices.size < 3) {
        let randomNumber = Math.floor(Math.random() * 25) + 1; // Generate random number between 1 and 26
        randomChoices.add(randomNumber); // Add to Set (Set automatically ensures uniqueness)
        resultantArray.push(words[randomNumber]); // Populate resultantArray with chosen words 
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
    resultantArray = []; // making sure the resultant array is also to be empty as to remove the contegency
    // console.log("shuffled arrary to be displayed");
    // console.log(shuffledWords);
    choiceArray = generate3RandomChoice();
    console.log("choices are as " + choiceArray);
    let wordsSection = document.getElementsByClassName('SecondContainer')[0];
    wordsSection.innerHTML = ``;
    for (let i = 0; i < words.length; i++) {
        wordsSection.innerHTML += `<div class="outerStructure">
            <div id="word-${i}" class="wordstructure">
                ${shuffledWords[i]}
            </div>
            <button id="cross-${i}" class="hidden cut">X</button>
            </div>`
    }
    // showing the generated choice
    let i = 0;
    while (i < 3) {
        document.getElementById(`selectedWord-${i}`).innerHTML = `${choiceArray[i]} - word`;
        i++;
    }

    // disabling the start Button and enabling only Calculate Results
    let startingGame = document.getElementById('start');
    startingGame.classList.add('hidden');

    // Showing the Calculate Button
    let checkResults = document.getElementById('results');
    checkResults.classList.remove('hidden');

    // MAKING USER TO SELECT THE CHOICE 
    for (let i = 0; i < shuffledWords.length; i++) {
        document.getElementById(`word-${i}`).addEventListener("click", () => {
            console.log(`The selected word from the user is as:  ${shuffledWords[i]}`)
            handleClickEvent(shuffledWords[i], i);
            console.log("enter the handle click function ");
            console.log("handle click function invoked with : " + shuffledWords[i]);
            console.log("the length of the selected word array is as: " + selectedWords.length);
        })
    }

    for (let i = 0; i < shuffledWords.length; i++) {
        document.getElementById(`cross-${i}`).addEventListener("click", () => {
            console.log("Enable the X sign in that name of the word to be delete " + shuffledWords[i]);
            deleteSelection(shuffledWords[i]);
        })
    }
}

function handleClickEvent(userchoice, index) {
    if (selectedWords.length >= 3) {
        document.getElementById(`cross-${index}`).classList.add('hidden');
        alert("You have made all your choices and not allowed to make more of it ");
    }

    else {
        if (!selectedWords.includes(userchoice)) {
            console.log("User choice is :" + userchoice)
            selectedWords.push(userchoice);
            modifiedSelectedWords.push(userchoice);
            let cancel = document.getElementById(`cross-${index}`);
            cancel.classList.remove('hidden');
            console.log(`cross-${index}` + "the x sign to be removed is as ")
            displaySelectedWord();
        }
        else {
            alert("The Word is already selected make a different selection please");
        }
    }
}

function displaySelectedWord() {
    console.log("Selection array is as ");
    console.log(selectedWords);
    for (let i = 0; i < selectedWords.length; i++) {
        document.getElementById(`selectedWord-${i}`).innerHTML = selectedWords[i];
    }
}

function deleteSelection(wordToBeDeleted) {
    console.log("Attempting to delete word: ", wordToBeDeleted);

    // Find the index of the word to be deleted in the array
    let indexToBeDeleted = selectedWords.indexOf(wordToBeDeleted);

    // Check if the word exists in the array
    if (indexToBeDeleted !== -1) {
        console.log("Deleted index is: " + indexToBeDeleted);
        selectedWords.splice(indexToBeDeleted, 1); // Remove the word from the array
        modifiedSelectedWords.splice(indexToBeDeleted, 1);
        for (let i = 0; i < shuffledWords.length; i++) {
            if (shuffledWords[i] === wordToBeDeleted) {
                console.log("ENTERING TO HIDE THE x BUTTON FROM THE WORDS ")
                document.getElementById(`cross-${i}`).classList.add('hidden'); // Hide the X button for the word
                break; // Exit the loop once the word is found
            }
        }
        displayAfterDeletion(); // Update the display after deletion
    } else {
        console.log("Word not found in the selectedWords array.");
    }
}

function displayAfterDeletion() {
    console.log("modified Selected array is as ");
    console.log(modifiedSelectedWords);

    // Clear the current display for selected words
    for (let i = 0; i < 3; i++) {
        document.getElementById(`selectedWord-${i}`).innerHTML = "";  // Clear the content
    }

    // Update the display with the remaining words
    for (let i = 0; i < modifiedSelectedWords.length; i++) {
        document.getElementById(`selectedWord-${i}`).innerHTML = modifiedSelectedWords[i];
    }

    // to do the pop of word and showing that respective cjoice to be made again 
    if (modifiedSelectedWords.length < 3) {
        console.log("Entering back the choices again");

        // Calculate how many more choices need to be displayed
        const remainingChoices = 3 - modifiedSelectedWords.length;

        for (let i = 0; i < remainingChoices; i++) {
            if (i + modifiedSelectedWords.length < choiceArray.length) {
                document.getElementById(`selectedWord-${i + modifiedSelectedWords.length}`).innerHTML = choiceArray[i + modifiedSelectedWords.length];
            }
        }
    }

}


function calculateResult() {
    let score = 0;
    for (let i = 0; i < selectedWords.length; i++) {
        // Compare each selected word with the corresponding word in resultantArray
        if (selectedWords[i] === resultantArray[i]) {
            score += 5;
        }
        else {
            console.log("the unmatched word is :" + selectedWords[i]);
        }
    }
    console.log("the user selection are as:" + selectedWords);
    console.log("the resultant selection are as:" + resultantArray);
    console.log("RESULTS ARE AS OF A PLAYER:" + score);
    let resultContainer = document.getElementsByClassName('resultsContainer')[0];
    resultContainer.classList.remove('hidden');
    resultContainer.innerHTML = `Your Result is as : ${score}`;

    // Disabling the Result Word Now
    let resultButton = document.getElementById('results');
    resultButton.classList.add('hidden');

    // Enabling the Play Aaian Button 
    let playAgain = document.getElementById('refresh');
    playAgain.classList.remove('hidden')
}

function refreshGame()
{
    location.reload();
}

// TODO : AFTER THE SELECTION ARE CLEARED FROM THE SLEECTION WE HAVE TO AGAIN MAKE SURE THAT CHOICES ARE BEING DISPLAYED IN THE SELECTION PANEL AGAIN : ALSO WE NEED TO  MAKE SURE THE CALCULATE FUNCTION TO WRITE AND ALSO NEED TO HANDLE THAT AFTER EACH RELOAD THE ARRAY ARE CLEARED .   AFTER ALL SELECTIONS ARE BEEN MADE AND CLICKING A WORD x IS ENABLED FOR THAT WORD ALSO 