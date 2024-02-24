
import { fetchCatByBreed, fetchBreeds } from "./cat-api";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const breedSelect = document.querySelector(".breed-select");
const catInfo = document.querySelector(".cat-info");
const loader = document.querySelector(".loader");



try {
    loader.classList.remove('hidden');
    fetchBreeds().then(data => renderSelect(data));
}
catch (error) {
    Notify.failure("Error, try again");
}
    
function renderSelect(breeds) {
    const markup = breeds
        .map(({ id, name }) => {
            return `<option value="${id}">${name}</option>`;
        })
        .join("");
    breedSelect.insertAdjacentHTML("beforeend", markup);
    loader.classList.add('hidden');
    breedSelect.classList.remove('hidden');
}

breedSelect.addEventListener('change', e => {
    loader.classList.remove('hidden');
    fetchCatByBreed(e.target.value).then(data => renderCat(data));

})
function renderCat(catData) {
    console.log(catData);
    const { url } = catData[0];
    const { description, name, temperament } = catData[0].breeds[0];
    catInfo.innerHTML = 
        `<div>
            <h2>${name}</h2>
            <img src="${url}" alt="${name}" />
            <p>${description}</p>
            <p><strong>Temperament:</strong> ${temperament}</p>
        </div>`;
    loader.classList.add('hidden');
    catInfo.classList.remove('hidden');
}