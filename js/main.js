const body = document.querySelector("body");
const button = document.querySelector("button");
const word = document.createElement("h1");
body.appendChild(word);
const definition = document.createElement("p");
body.appendChild(definition);

const randomWord = () => {
  fetch(`https://random-word-api.herokuapp.com/word?number=1`)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      word.textContent = response;
      body.appendChild(word);
      randomDefinition(word);
    })
    .catch((err) => {
      console.log(err);
    });
};

const randomDefinition = (word) => {
  fetch(
    `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word.textContent}?key=bd742f30-3d82-459b-82d6-88dba6ad0d74`
  )
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      if (response[0].shortdef !== undefined) {
        definition.textContent = "Definition:" + response[0].shortdef[0];
      } else {
        definition.textContent = "No Definition Available";
      }

      body.appendChild(definition);
    })

    .catch((err) => {
      console.log(err);
    });
};

button.addEventListener("click", function () {
  randomWord();
});
