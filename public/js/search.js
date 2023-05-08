// Prints the searched word to console log
// const searchWord = async (event) => {
//   event.preventDefault();
//   const searchedWord = document.querySelector('.word-input').value.trim();
// console.log(searchedWord);
// }

const urlSearchParams = new URLSearchParams(window.location.search);
const email = urlSearchParams.get("email");
console.log(email);

wordText = document.createElement("h3");
definitionText = document.createElement("p");
const wordInfoContainer = document.querySelector(".word-info");

//Function that returns search word
async function getAPI(event) {
  event.preventDefault();

  // Resets the word and definition everytime a word is searched. Remove all child elements of the word-info container
  while (wordInfoContainer.firstChild) {
    wordInfoContainer.removeChild(wordInfoContainer.firstChild);
  }

  const searchedWord = document.querySelector(".word-input").value.trim();

  const response = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${searchedWord}`
  );
  const jsonData = await response.json();

  // Gets the searched word
  const word = jsonData[0].word;
  console.log(word);

  wordText.textContent = word;
  document.querySelector(".word-info").appendChild(wordText);

  //Gets the # of definitions per word
  const numDefinitions = jsonData[0].meanings[0].definitions.length;

  const definitionsArray = [];

  for (i = 0; i < numDefinitions; i++) {
    const definitions = jsonData[0].meanings[0].definitions[i].definition;
    definitionsArray.push(definitions);

    definitionText = document.createElement("p");
    definitionText.textContent = i + 1 + ". " + `${definitions}`;
    document.querySelector(".word-info").appendChild(definitionText);
  }

  console.log(definitionsArray);

  const searchResults = {
    word: word,
    definitionsArray: definitionsArray,
  };
}

//Function to saved a word when Add to Vault button is clicked
async function saveWord(event) {
  event.preventDefault();

  const word = wordText.textContent;

  const response = await fetch('/saved', {
    method: 'POST',
    body: JSON.stringify({ word, email }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    alert('Word successfully saved');
    location.reload();
  } else {
    alert('Failed to save word');
  }
  };


//Initiates saveWord function when "Add to Vault" button is clicked 
document.querySelector('.save-button').addEventListener('click', saveWord);

//Initiates getting word definition getAPI function when "Search" button is clicked 
document.querySelector(".word-search").addEventListener("submit", getAPI);

// Function to clear word-info container
function clearWordInfo() {
  while (wordInfoContainer.firstChild) {
    wordInfoContainer.removeChild(wordInfoContainer.firstChild);
  }
};

// Add event listener to Clear button
const deleteButton = document.querySelector(".delete-btn");
deleteButton.addEventListener("click", clearWordInfo);


//DELETE word from vault
const deleteButtons = document.querySelectorAll('.delete-button');
deleteButtons.forEach(button => {
  button.addEventListener('click', async function() {
    // Find the parent div of the delete button
    const parentDiv = this.closest('.word-card');
    // Find the saved word element within the parent div
    const savedWord = parentDiv.querySelector('.saved-word');
    // Get the text content of the saved word
    const savedWordText = savedWord.textContent;
    // Do something with the saved word, such as delete it from a database or remove it from the DOM
    console.log('Deleting saved word:', savedWordText);

    const response = await fetch('/delete', {
      method: 'DELETE',
      body: JSON.stringify({ savedWordText }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      alert('Word successfully deleted');
      location.reload();
    } else {
      alert('Failed to delete word');
    }
    
  });
});