const form = $('.js-form')
form.on('submit', handleSubmit)
const nextBtn = $('.js-next')
const prevBtn = $('.js-prev')
let resultStats = $('.js-result-stats')
const spinner = $('.js-spinner')
let totalResults
let currentPage = 1
let searchQuery

$(document).ready(function () {
  let img = localStorage.getItem('selected_photo')
  let photographer = localStorage.getItem('photographer')
  let photographerPage = localStorage.getItem('photographerPage')
   
  $('#photographer').html(`Photographer: <a href="${photographerPage}" >${photographer}</a>`)
})

nextBtn.on('click', () => {
	currentPage += 1
	fetchResults(searchQuery)
})

prevBtn.on('click', () => {
	currentPage -= 1
	fetchResults(searchQuery)
})

function pagination(totalPages) {
	nextBtn.removeClass('hidden')
	if (currentPage >= totalPages) {
		nextBtn.addClass('hidden')
	}

	prevBtn.addClass('hidden')
	if (currentPage !== 1) {
		prevBtn.removeClass('hidden')
	}
}

async function fetchResults(searchQuery) {
  spinner.removeClass('hidden')
	try {
    const results = await searchUnsplash(searchQuery)
		pagination(results.total_pages)
		displayResults(results)
	} catch(err) {
		console.log(err)
		alert('Failed to search Unsplash')
	}
	spinner.addClass('hidden')
} 

function handleSubmit(event) {
	event.preventDefault()
	currentPage = 1
  const inputValue = $('.js-search-input').val()
  console.log('inputvalue', inputValue)
	searchQuery = $.trim(inputValue)
	console.log(searchQuery)
	fetchResults(searchQuery)
}

function changeUnsplashValue (photo) {
  photographer = photo.getAttribute('data-photographer')
  photographerPage = photo.getAttribute('data-photographerPage')
  $('#unsplash-img').show()
  $('#photographer').show()
  // add the src attribute
  $('#unsplash-img').attr('src', 'https://source.unsplash.com/' + photo.id)
  // hide the modal
  $('#unsplashModal').modal('hide')
  localStorage.setItem('selected_photo', photo.id)
  localStorage.setItem('photographer', photographer)
  localStorage.setItem('photographerPage', photographerPage)
}

function setStorageImg () {
  let img = localStorage.getItem('selected_photo')
  console.log('img: ', img)
  if (img) {
    $('#unsplash-img').show()
    $('#unsplash-img').attr('src', 'https://source.unsplash.com/' + img)
  }
}

async function searchUnsplash (searchQuery) {
  console.log('query in searchUnsplash: ', searchQuery)
  const endpoint = `/medium-unsplash-image/photos/${searchQuery}/${currentPage}`
  const response = await fetch(endpoint)
	if (!response.ok) {
		throw Error(response.statusText)
	}
	const json = await response.json()

	return json
}

function removePhoto () {
  console.log('removing ... ', )
  localStorage.removeItem('selected_photo')
  localStorage.removeItem('photographer')
  localStorage.removeItem('photographerPage')
  $('#unsplash-img').hide()
  $('#photographer').hide()
}

function displayResults(json) {
	const searchResults = $('.search-results')
  searchResults.text('')
	json['results'].forEach(result => {
    const url = result.urls.thumb
    const id = result.id
    const unsplashLink = result.links.html
		const photographer = result.user.name
    const photographerPage = result.user.links.html
		searchResults[0].insertAdjacentHTML(
			'beforeend',
			`<div class="unsplash_thumb" id="${id}" data-photographer="${photographer}" data-photographerPage="${photographerPage}" onClick="changeUnsplashValue(this)">
        <div class="p-2">
        <img class="result-item"  src="${url}"/>
        <p class="photographer-name">
        <a href="${photographerPage}" target="_blank" style="color: black text-decoration: none">Photo by ${photographer}</a>
        </p>
        </div>
			</div>`
		)	
	})
	totalResults = json.total
	resultStats.text(`About ${totalResults} results found`)
}

setStorageImg()