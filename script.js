const animalList = document.getElementById("animalList");
const animalDetails = document.getElementById("animalDetails");

// Function to fetch animal data
async function fetchAnimals() {
  try {
    const response = await fetch("http://localhost:3000/characters");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching animals:", error);
  }
}

// Function to render animal list
function renderAnimalList(animals) {
  animalList.innerHTML = "";

  animals.forEach((animal) => {
    const li = document.createElement("li");
    li.textContent = animal.name;
    li.addEventListener("click", () => {
      displayAnimalDetails(animal);
    });
    animalList.appendChild(li);
  });
}

// Function to display animal details
function displayAnimalDetails(animal) {
  animalDetails.innerHTML = "";

  const animalImage = document.createElement("img");
  animalImage.src = animal.image;

  const votesCount = document.createElement("p");
  votesCount.textContent = `Votes: ${animal.votes}`;

  const voteButton = document.createElement("button");
  voteButton.textContent = "Vote";
  voteButton.addEventListener("click", () => {
    animal.votes += 1;
    votesCount.textContent = `Votes: ${animal.votes}`;
  });

  animalDetails.appendChild(animalImage);
  animalDetails.appendChild(votesCount);
  animalDetails.appendChild(voteButton);
}

// initialization
async function initialize() {
  const animals = await fetchAnimals();
  renderAnimalList(animals);
}

initialize();
