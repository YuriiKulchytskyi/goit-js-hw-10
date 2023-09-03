import axios from "axios";

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');


catInfo.style.marginTop = '20px';

const apiKey = 'live_bXo3xtRi4wolOPPymwYVPAXOpAdLPv859ahKYDLTqfKBoVBV0imXFFU52XR8nQfl';
const apiUrl = 'https://api.thecatapi.com/v1';


axios.defaults.headers.common['x-api-key'] = apiKey;

loader.style.display = 'none';
catInfo.style.display = 'none';
error.style.display = 'none';

function fetchBreeds() {
  axios.get(`${apiUrl}/breeds`)
    .then(response => {
      const breeds = response.data;
      const options = breeds.map(breed => `<option value="${breed.id}">${breed.name}</option>`).join('');
      breedSelect.innerHTML = options;
    })
    .catch(error => {
      showError();
    });
}

function fetchCatByBreed(breedId) {
  axios.get(`${apiUrl}/images/search?breed_ids=${breedId}`)
    .then(response => {
      const catData = response.data[0];
      displayCatInfo(catData);
    })
    .catch(error => {
      showError();
    });
}

function displayCatInfo(catData) {
  const catImage = document.createElement('img')
  catImage.src = catData.url;
  catImage.alt = 'Cat';
  catImage.style.display = "interhit"
  catImage.style.maxWidth = '40%';
  catImage.style.height = 'auto';
 
  const catInfoDiv = document.createElement('div');
  catInfoDiv.innerHTML = `
  <p style="font-size: xx-large; margin-top: 0; margin-bottom: 10px"><strong>${catData.breeds[0].name}</strong></p>
  <p>${catData.breeds[0].description}</p>
  <p><strong>Temperament:</strong> ${catData.breeds[0].temperament}</p>
  `;
  
  catInfo.innerHTML = '';
  catInfo.appendChild(catImage);
  catInfo.appendChild(catInfoDiv);
  
  loader.style.display = 'none';
  catInfo.style.display = 'block';
  catInfoDiv.style.float = 'right';
  catInfoDiv.style.width = '59%';
  error.style.display = 'none';
}

function showError() {
  loader.style.display = 'none';
  catInfo.style.display = 'none';
  error.style.display = 'block'
  error.style.color = 'red';
}

breedSelect.addEventListener('change', () => {
  catInfo.style.flexDirection = 'row';
  const selectedBreedId = breedSelect.value;
  if (selectedBreedId) {
    loader.style.display = 'block';
    catInfo.style.display = 'none';
    error.style.display = 'none';
    fetchCatByBreed(selectedBreedId);
  }
});

fetchBreeds();