import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import './styles.css';
import 'slim-select/dist/slimselect.css';

const refs = {
  selector: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  divCatInfo: document.querySelector('.cat-info'),
};

let arrBreeds = [];
//let arrBreeds = [{ placeholder: true, text: 'Choose a breed' }];
const { selector, loader, error, divCatInfo } = refs;

selector.classList.add('is-hidden');
error.classList.add('is-hidden');
divCatInfo.classList.add('is-hidden');

fetchBreeds()
  .then(resp => {
    const optionData = resp.data;
    createOptions(optionData);
    selector.classList.remove('is-hidden');
    loader.hidden = true;
  })
  .catch(Error => fetchError());

function createOptions(arr) {
  arr.forEach(element => {
    arrBreeds.push({ text: element.name, value: element.id });
  });
  new SlimSelect({
    select: selector,
    data: arrBreeds,
  });
}

selector.addEventListener('change', onBreedsSelect);

function onBreedsSelect(event) {
  loader.hidden = false;
  const breedId = event.currentTarget.value;
  divCatInfo.classList.add('is-hidden');
  // if (selector.selectedIndex === 0) {
  //   return;
  // }
  fetchCatByBreed(breedId)
    .then(data => {
      createDivCat(data[0]);
      divCatInfo.classList.remove('is-hidden');
      loader.hidden = true;
    })
    .catch(Error => fetchError());
}

function createDivCat(obj) {
  const { url, breeds } = obj;
  divCatInfo.innerHTML = `<div class="box-img" ><img src="${url}" alt="${breeds[0].name}" width="400" ></div><div class="box"><h1>${breeds[0].name}</h1><p>${breeds[0].description}</p><p><b>Temperament:
      </b>${breeds[0].temperament}</p></div>`;
}

function fetchError() {
  loader.hidden = true;
  Notiflix.Notify.failure(`${error.textContent}`, {
    timeout: 3000,
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
