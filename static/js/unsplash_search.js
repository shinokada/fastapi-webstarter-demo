const form = $('.js-form');
const nextBtn = $('.js-next');
const prevBtn = $('.js-prev');
let resultStats = $('.js-result-stats');
const spinner = $('.js-spinner');
let totalResults;
let currentPage = 1;
let searchQuery;

$(document).ready(function () {
  const img = localStorage.getItem('ideasUnsplashselected_photo')
  console.log('img: ', img)
  const photographer = localStorage.getItem('ideasUnsplashphotographer')
  const photographerPage = localStorage.getItem('ideasUnsplashphotographerPage')
  const regularLink = localStorage.getItem('ideasUnsplashregularLink')

  console.log('regularLink: ', regularLink)
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
  const photographer = photo.getAttribute('data-photographer')
  const photographerPage = photo.getAttribute('data-photographerPage')
  const regularLink = photo.getAttribute('data-regularLink')
  $('#photographerLink').text(photographer)
  $('#photographerLink').attr('href', photographerPage)
  // display #unsplash-img div
  $('#unsplash-img').show()
  // add the src attribute
  $('#selectedImg').attr('src', 'https://source.unsplash.com/' + photo.id);
  // hide the modal
  $('#unsplashModal').modal('hide');
  // store in the localStorage
  localStorage.setItem('ideasUnsplashselected_photo', photo.id);
  localStorage.setItem('ideasUnsplashphotographer', photographer);
  localStorage.setItem('ideasUnsplashphotographerPage', photographerPage);
  localStorage.setItem('ideasUnsplashregularLink', regularLink)
}

function setStorageImg () {
  // set image to show 
  let img = localStorage.getItem('ideasUnsplashselected_photo');
  if (img) {
    $('#unsplash-img').show();
    $('#selectedImg').attr('src', 'https://source.unsplash.com/' + img);
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
    // console.log(result)
    const url = result.urls.thumb;
    // id 
    const id = result.id;
    const unsplashLink = result.links.html;
    // unsplashLink https://unsplash.com/photos/esvWH-owWug
		const photographer = result.user.name;
    const photographerPage = result.user.links.html;
    const regularImgLink = result.urls.regular
    // photographerPage  https://unsplash.com/@campful
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

setStorageImg();