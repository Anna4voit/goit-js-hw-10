import { fetchBreeds, fetchCatByBreed } from './cat-api';
import './styles.css';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

refs = {
  selector: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  divCatInfo: document.querySelector('.cat-info'),
};
const { selector, loader, error, divCatInfo } = refs;

selector.classList.add('is-hidden');
error.classList.add('is-hidden');
divCatInfo.classList.add('is-hidden');

let arrBreeds = [];
fetchBreeds()
  .then(resp => {
    const optionData = resp.data;
    optionData.forEach(element => {
      arrBreeds.push({ text: element.name, value: element.id });
    });
    createOptions(arrBreeds);
    selector.classList.remove('is-hidden');
  })
  .catch(Error => fetchError());

function createOptions(arr) {
  new SlimSelect({
    select: selector,
    data: arr,
  });
}

selector.addEventListener('change', onBreedsSearch);

function onBreedsSearch(event) {
  loader.hidden = true;
  divCatInfo.classList.add('is-hidden');
  const breedId = event.currentTarget.value;
  fetchCatByBreed(breedId)
    .then(data => {
      const { url, breeds } = data[0];
      divCatInfo.innerHTML = `<div class="box-img" ><img src="${url}" alt="${breeds[0].name}" width="400" ></div><div class="box"><h1>${breeds[0].name}</h1><p>${breeds[0].description}</p><p><b>Temperament:
      </b>${breeds[0].temperament}</p></div>`;

      divCatInfo.classList.remove('is-hidden');
    })
    .catch(Error => fetchError());
}

function fetchError() {
  loader.hidden = true;
  Notiflix.Notify.failure(`${error.textContent}`, {
    timeout: 5000,
    position: 'center-center',
    width: '400px',
    fontSize: '24px',
  });
}

// if done without axios
// fetchBreeds()
//   .then(data => {
//     data.forEach(element => {
//       arrBreeds.push({ text: element.name, value: element.id });
//     });
//     createOptions(arrBreeds);
//   })
//   .catch(Error => fetchError());
