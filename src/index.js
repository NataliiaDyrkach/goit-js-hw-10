import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';
import { countryListMarkup, countryInfoMarkup } from './js/markup';

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function cleanInput() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}

function onInput() {
  const countryName = searchBox.value.trim();

  if (countryName === '') {
    cleanInput();
    return;
  }

  fetchCountries(countryName)
    .then(countries => {
      if (countries.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name'
        );
        cleanInput();
        return;
      }

      if (countries.length >= 2 && countries.length <= 10) {
        const markupList = countries
          .map(country => countryListMarkup(country))
          .join('');
        countryList.innerHTML = markupList;
        countryInfo.innerHTML = '';
      }

      if (countries.length === 1) {
        const markupInfo = countries
          .map(country => countryInfoMarkup(country))
          .join('');
        countryInfo.innerHTML = markupInfo;
        countryList.innerHTML = '';
      }
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
      cleanInput();
      return error;
    });
}
