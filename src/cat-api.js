import axios from "axios";

const errorText = document.querySelector(".error");
const loader = document.querySelector(".loader");

export const fetchBreeds = () => {
    axios.defaults.headers.common["x-api-key"] = "live_ZOQpZ7dNBs5KqBP2Babcjpn5zjGR7DszcnMDtkrVEtyxRTV8uFqa1OLhOoDdowvF";
    
    return axios.get(`https://api.thecatapi.com/v1/breeds`)
        .then(res => res.data)
        .catch(() => {
            errorText.classList.remove('hidden');
            loader.classList.add('hidden');
        })
}

export const fetchCatByBreed = breedId => {
    return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
        .then(res => res.data)
        .catch(() => {
            errorText.classList.remove('hidden');
            loader.classList.add('hidden');
         })
} 