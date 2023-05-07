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

async function saveWord(event) {
  event.preventDefault();

  const word = wordText.textContent;
  // const definitions = Array.from(document.querySelectorAll('.word-info p')).map(
  //   (p) => p.textContent.slice(3)
  // );

  const response = await fetch('/saved', {
    method: 'POST',
    body: JSON.stringify({ word, email }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    alert('Word successfully saved');
  } else {
    alert('Failed to save word');
  }

    // Append saved word to the page
    // const savedWordDiv = document.createElement('div');
    // const savedWordHeader = document.createElement('h3');
    // const savedWordList = document.createElement('ul');

    // savedWordHeader.textContent = savedWord.word;

    // savedWordList.innerHTML = savedWord.definitions
    //   .map((definition) => `<li>${definition}</li>`)
    //   .join('');

    // savedWordDiv.appendChild(savedWordHeader);
    // savedWordDiv.appendChild(savedWordList);

    // document.querySelector('.saved-words').appendChild(savedWordDiv);
  };

document.querySelector('.save-button').addEventListener('click', saveWord);


document.querySelector(".word-search").addEventListener("submit", getAPI);

// Function to clear word-info container
function clearWordInfo() {
  while (wordInfoContainer.firstChild) {
    wordInfoContainer.removeChild(wordInfoContainer.firstChild);
  }
}
// Add event listener to delete button
const deleteButton = document.querySelector(".delete-btn");
deleteButton.addEventListener("click", clearWordInfo);