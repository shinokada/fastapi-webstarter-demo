const form = $('.js-form');
const nextBtn = $('.js-next');
const prevBtn = $('.js-prev');
let resultStats = $('.js-result-stats');
const spinner = $('.js-spinner');
let totalResults;
let currentPage = 1;
let searchQuery;
let img, photographer, photographerPage, regularLink

$(document).ready(function () {
  img = localStorage.getItem('ideasUnsplashselected_photo')
  console.log('img: ', img)
  photographer = localStorage.getItem('ideasUnsplashphotographer')
  photographerPage = localStorage.getItem('ideasUnsplashphotographerPage')
  regularLink = localStorage.getItem('ideasUnsplashregularLink')
  $('#selectedImg').attr('src', 'https://source.unsplash.com/' + img);
  $('#photographerLink').text(photographer)
  $('#photographerLink').attr('href', photographerPage)
  if (img) {
    $('#unsplash-img').show()
  } else {
    $('#unsplash-img').hide()
  }

  $('.search-btn').on('click', () => {
    setTimeout(function (){
      $('.search-input').focus();
    }, 1000);
  })
});

nextBtn.on('click', () => {
  currentPage += 1;
  fetchResults(searchQuery);
});

prevBtn.on('click', () => {
  currentPage -= 1;
  fetchResults(searchQuery);
});

function pagination(totalPages) {
  nextBtn.removeClass('hidden');
  if (currentPage >= totalPages) {
    nextBtn.addClass('hidden');
  }

  prevBtn.addClass('hidden');
  if (currentPage !== 1) {
    prevBtn.removeClass('hidden');
  }
}

async function fetchResults(searchQuery) {
  spinner.removeClass('hidden');
  try {
    const results = await searchUnsplash(searchQuery);
    pagination(results.total_pages);
    displayResults(results);
  } catch(err) {
    console.log(err);
    alert('Failed to search Unsplash');
  }
  spinner.addClass('hidden');
} 

function handleSubmit(event) {
  event.preventDefault();
  currentPage = 1;
  const inputValue = $('.js-search-input').val();
  searchQuery = $.trim(inputValue);
  fetchResults(searchQuery);
}

function changeUnsplashValue (photo) {
  console.log('Changing ...')
  photographer = photo.getAttribute('data-photographer')
  photographerPage = photo.getAttribute('data-photographerPage')
  regularLink = photo.getAttribute('data-regularLink')
  $('#photographerLink').text(photographer)
  $('#photographerLink').attr('href', photographerPage)
  $('#unsplash-img').show()
  $('#selectedImg').attr('src', 'https://source.unsplash.com/' + photo.id);
  $('#unsplashModal').modal('hide');
  localStorage.setItem('ideasUnsplashselected_photo', photo.id);
  localStorage.setItem('ideasUnsplashphotographer', photographer);
  localStorage.setItem('ideasUnsplashphotographerPage', photographerPage);
  localStorage.setItem('ideasUnsplashregularLink', regularLink)
}

async function searchUnsplash (searchQuery) {
  const endpoint = `/unsplash-search/photos/${searchQuery}/${currentPage}`
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw Error(response.statusText);
  }
  const json = await response.json();
  return json;
}

function removePhoto () {
  localStorage.removeItem('ideasUnsplashselected_photo');
  localStorage.removeItem('ideasUnsplashphotographer')
  localStorage.removeItem('ideasUnsplashphotographerPage')
  localStorage.removeItem('ideasUnsplashregularLink')
  $('#unsplash-img').hide()
  $('#photographerLink').text('')
  $('#photographerLink').attr('href', '')
}

function displayResults(json) {
  const searchResults = $('.search-results');
  searchResults.text('');
  json['results'].forEach(result => {
    const url = result.urls.thumb;
    const id = result.id;
    const unsplashLink = result.links.html;
    // unsplashLink is like https://unsplash.com/photos/esvWH-owWug
    photographer = result.user.name;
    photographerPage = result.user.links.html;
    const regularImgLink = result.urls.regular
    // photographerPage is like https://unsplash.com/@campful
    searchResults[0].insertAdjacentHTML(
      'beforeend',
      `<div class="unsplash_thumb" id="${id}" data-photographer="${photographer}" data-photographerPage="${photographerPage}"  onClick="changeUnsplashValue(this)">
        <div class="p-2">
        <img class="result-item"  src="${url}";/>
        <p class="photographer-name">Photo by 
        <a href="${photographerPage}" target="_blank" style="color: black; ">${photographer}</a> on <a href="https://unsplash.com/" target="_blank">Unsplash</a>
        </p>
        </div>
      </div>`
    );	
  });
  totalResults = json.total;
  resultStats.text(`About ${totalResults} results found`);
  $('.modal').scrollTop(0);
};
