const form = $('.js-form');
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
  // console.log('img: ', img)
  $('#unsplashInput').attr('value', img);
  $('#photographer').attr('value', photographer);
  $('#photographerPage').attr('value', photographerPage);
  // $('#bg-div').hide();
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
    // console.log('results.total_pages: ', results.total_pages)
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
  photographer = photo.getAttribute('data-photographer');
  photographerPage = photo.getAttribute('data-photographerPage');
  // console.log('photographer: ', photographer);
  // console.log('photographerPage: ', photographerPage);
  let selected_photo = `https://source.unsplash.com/${photo.id}`
  $('#unsplashInput').val(selected_photo);
  $('#photographer').val(photographer);
  $('#photographerPage').val(photographerPage);
  // display #unsplash-img div
  $('#unsplash-img').show()
  // add the src attribute
  $('#selectedImg').attr('src', selected_photo);
  // hide the modal
  $('#unsplashModal').modal('hide');
  // store in the localStorage
  localStorage.setItem('selected_photo', selected_photo);
  localStorage.setItem('photographer', photographer);
  localStorage.setItem('photographerPage', photographerPage);
}

function setStorageImg () {
  // set image to show 
  let img = localStorage.getItem('selected_photo');
  console.log('img: ',img)
  if (img) {
    $('#unsplash-img').show();
    $('#selectedImg').attr('src', img);
  }
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
  // console.log('removing ... ', )
  localStorage.removeItem('selected_photo');
  $('#unsplashInput').attr('value','');
  $('#unsplash-img').hide()
  // show #bg-div
  // $('#bg-div').show()
}

function displayResults(json) {
	const searchResults = $('.search-results');
  searchResults.text('');
  json['results'].forEach(result => {
    // console.log(result)
    const url = result.urls.thumb;
    // id 
    const id = result.id;
    const unsplashLink = result.links.html;
    // unsplashLink https://unsplash.com/photos/esvWH-owWug
		const photographer = result.user.name;
    const photographerPage = result.user.links.html;
    // photographerPage  https://unsplash.com/@campful
		searchResults[0].insertAdjacentHTML(
			'beforeend',
			`<div class="unsplash_thumb" id="${id}" data-photographer="${photographer}" data-photographerPage="${photographerPage}" onClick="changeUnsplashValue(this)">
        <div class="p-2">
        <img class="result-item"  src="${url}";/>
        <p class="photographer-name">
        <a href="${photographerPage}" target="_blank" style="color: black; text-decoration: none;">Photo by ${photographer} on <a href="https://unsplash.com/" target="_blank">Unsplash</a>
        </p>
        </div>
			</div>`
		);	
  });
	totalResults = json.total;
  resultStats.text(`About ${totalResults} results found`);
  $('.modal').scrollTop(0);
};
