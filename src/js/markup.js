export function countryListMarkup({ flags, name }) {
    return `<li class="country-item">
  <img class="image" src="${flags.svg}" alt="${name.official}" width='25'/>
  <h2 class="country-name">${name.official}</h2>
  </li>`;
}

export function countryInfoMarkup({ flags, name, capital, population, languages }) {
  return `<img class="image" src="${flags.svg}" alt="${name.official}" width='25'/>
<h2 class="country-name">${name.official}</h2>
<p class="country-text"><span class="country-span">Capital:</span> ${capital}</p>
<p class="country-text"><span class="country-span">Population:</span> ${population}</p>
<p class="country-text"><span class="country-span">Languages:</span> ${Object.values(languages,)}</p>`;
}
