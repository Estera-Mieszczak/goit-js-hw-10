
import { fetchCatByBreed, fetchBreeds } from "./cat-api";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const breedSelect = document.querySelector(".breed-select");
const catInfo = document.querySelector(".cat-info");
const loader = document.querySelector(".loader");
const errorText = document.querySelector(".error");


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
    if (catData.length === 0) {
        loader.classList.add('hidden');
        errorText.classList.remove('hidden');
        catInfo.classList.add('hidden');
        return Notify.failure("Error, try again");
    }
    errorText.classList.add('hidden');
    catInfo.classList.remove('hidden');
    console.log(catData);
    const { url } = catData[0];
    const { description, name, temperament } = catData[0].breeds[0];
    catInfo.innerHTML = 
        `<div class="cat-info-box">
            <div class="cat-image-box"><img class="cat-image" src="${url}" alt="${name}" width="500px"/></div>
            <div class="cat-description"><h2 class="cat-name">${name}</h2>
            <p>${description}</p>
            <p><strong>Temperament:</strong> ${temperament}</p></div>
        </div>`;
    loader.classList.add('hidden');
    catInfo.classList.remove('hidden');
}