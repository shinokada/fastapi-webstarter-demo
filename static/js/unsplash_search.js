const form = $('.js-form');
form.on('submit', handleSubmit);
const nextBtn = $('.js-next');
const prevBtn = $('.js-prev');
let resultStats = $('.js-result-stats');
const spinner = $('.js-spinner');
let totalResults;
let currentPage = 1;
let searchQuery;

$(document).ready(function () {
  let img = localStorage.getItem('selected_photo');
  let photographer = localStorage.getItem('photographer');
  let photographerPage = localStorage.getItem('photographerPage');
  
  $('#unsplashInput').attr('value', img);
  $('#photographer').attr('value', photographer);
  $('#photographerPage').attr('value', photographerPage);
  $('#bg-div').hide();
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
  console.log('query in fetchresults: ', searchQuery)
	try {
    const results = await searchUnsplash(searchQuery);
    console.log('results: ', results)
		pagination(results.total_pages);
		// console.log(results);
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
  console.log('inputvalue', inputValue);
	searchQuery = $.trim(inputValue);
	console.log(searchQuery);
	fetchResults(searchQuery);
}

function changeUnsplashValue (photo) {
  console.log('id: ', photo.id)
  // console.log('data: ', photo)
  photographer = photo.getAttribute('data-photographer');
  photographerPage = photo.getAttribute('data-photographerPage');
  console.log('photographer: ', photographer);
  console.log('photographerPage: ', photographerPage);
  $('#unsplashInput').val(photo.id);
  $('#photographer').val(photographer);
  $('#photographerPage').val(photographerPage);
  // display #unsplash-img div
  $('#unsplash-img').show()
  // hide bg-div background color
  $('#bg-div').hide();
  // add the src attribute
  $('#unsplash-img').attr('src', 'https://source.unsplash.com/' + photo.id);
  // hide the modal
  $('#unsplashModal').modal('hide');
  // store in the localStorage
  window.localStorage.setItem('selected_photo', photo.id);
  window.localStorage.setItem('photographer', photographer);
  window.localStorage.setItem('photographerPage', photographerPage);
}

function setStorageImg () {
  // set image to show 
  let img = localStorage.getItem('selected_photo');
  console.log('img: ', img)
  if (img) {
    $('#unsplash-img').show();
    $('#unsplash-img').attr('src', 'https://source.unsplash.com/' + img);
  }
}

async function searchUnsplash (searchQuery) {
  console.log('query in searchUnsplash: ', searchQuery)
  const endpoint = `/medium-unsplash-image/photos/${searchQuery}/${currentPage}`
  const response = await fetch(endpoint);
  // console.log('response: ', response)
	if (!response.ok) {
		throw Error(response.statusText);
	}
	const json = await response.json();
  
	return json;
}

function removePhoto () {
  console.log('removing ... ', )
  localStorage.removeItem('selected_photo');
  $('#unsplashInput').attr('value','');
  $('#unsplash-img').hide()
  $('#bg-div').show()
}

function displayResults(json) {
	const searchResults = $('.search-results');
  searchResults.text('');
	json.forEach(result => {
    const url = result.urls.thumb;
    // id 
    const id = result.id;
    console.log('image id: ', id);
    // console.log('result: ', result);
    const unsplashLink = result.links.html;
    // unsplashLink https://unsplash.com/photos/esvWH-owWug
    // console.log('unsplashlink: ', unsplashLink);
		const photographer = result.user.name;
    const photographerPage = result.user.links.html;
    // photographerPage  https://unsplash.com/@campful
    // console.log('photographer: ', photographerPage)
		searchResults[0].insertAdjacentHTML(
			'beforeend',
			`<div class="unsplash_thumb" id="${id}" data-photographer="${photographer}" data-photographerPage="${photographerPage}" onClick="changeUnsplashValue(this)">
        <div class="p-2">
        <img class="result-item"  src="${url}";/>
        <p class="photographer-name">
        <a href="${photographerPage}" target="_blank" style="color: black; text-decoration: none;">Photo by ${photographer}</a>
        </p>
        </div>
			</div>`
		);	
	});
	totalResults = json.total;
	resultStats.text(`About ${totalResults} results found`);
};

setStorageImg();