const form = $('.js-form')
const nextBtn = $('.js-next')
const prevBtn = $('.js-prev')
const spinner = $('.js-spinner')
let totalResults
let currentPage = 1
let searchQuery, img, photographer, photographerPage, regularLink, license_name, license_link

$(document).ready(function () {
  img = localStorage.getItem('flickr_selected_photo')
  photographer = localStorage.getItem('flickr_photographer')
  photographerPage = localStorage.getItem('flickr_photographerPage')
  regularLink = localStorage.getItem('flickr_regularLink')
  license_name = localStorage.getItem('flickr_license_name')
  $('#selectedImg').attr('src', img)
  $('#photographerLink').text(photographer)
  $('#photographerLink').attr('href', photographerPage)
  
  if (img) {
    $('.selected-img').show()
  } else {
    $('.selected-img').hide()
  }

  $('.search-btn').on('click', () => {
    setTimeout(function (){
      $('.search-input').focus()
    }, 1000)
  })
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
    const results = await searchImage(searchQuery)
    pagination(results.total_pages)
    displayResults(results)
  } catch(err) {
    console.log(err)
    alert('Failed to search Flickr')
  }
  spinner.addClass('hidden')
} 

function handleSubmit(event) {
  event.preventDefault()
  currentPage = 1
  const inputValue = $('.js-search-input').val()
  searchQuery = $.trim(inputValue)
  fetchResults(searchQuery)
}

function changeImageValue (photo) {
  photographer = photo.getAttribute('data-photographer')
  photographerPage = photo.getAttribute('data-photographerPage')
  const thumb = photo.getAttribute('data-thumb')
  license_name = photo.getAttribute('data-licensename').toUpperCase()
  regularLink = photo.getAttribute('data-regularLink')
  license_link = `https://creativecommons.org/licenses/${license_name}/2.0`
  license_name = `CC ${license_name} 2.0`
  $('#photographer').val(photographer)
  $('#photographerPage').val(photographerPage)
  $('#photographerLink').text(photographer)
  $('#photographerLink').attr('href', photographerPage)
  $('#license_link').attr('href', license_link)
  $('#license_link').text(license_name)
  $('input[name="license_name"]').attr("value", license_name)
  $('.selected-img').show()
  $('#selectedImg').attr('src', thumb)
  $('#flickrModal').modal('hide')
  localStorage.setItem('flickr_selected_photo', thumb)
  localStorage.setItem('flickr_photographer', photographer)
  localStorage.setItem('flickr_photographerPage', photographerPage)
  localStorage.setItem('flickr_regularLink', regularLink)
  localStorage.setItem('flickr_license_name', license_name)
}

async function searchImage (searchQuery) {
  const endpoint = `/flickr_photos/${searchQuery}/${currentPage}`
  const response = await fetch(endpoint)
  if (!response.ok) {
    throw Error(response.statusText)
  }
  const json = await response.json()
  return json
}

function removePhoto () {
  localStorage.removeItem('flickr_selected_photo')
  localStorage.removeItem('flickr_photographer')
  localStorage.removeItem('flickr_photographerPage')
  localStorage.removeItem('flickr_regularLink')
  localStorage.removeItem('flickr_license_name')
  $('#flickrInput').attr('value','')
  $('.selected-img').hide()
  $('#flickrInput').val('')
  $('#photographer').val('')
  $('#photographerPage').val('')
  $('#photographerLink').text('')
  $('#photographerLink').attr('href', '')
  $('input[name="license_name"]').attr("value", '')
}

function displayResults(results) {
  const searchResults = $('.search-results')
  searchResults.text('')
  results.forEach(result => {
    const thumb = result.url_m
    const medium_img = result.url_c
    // https://live.staticflickr.com/4294/35185475274_6f53ae8725.jpg
    // photo id 5982607204
    const id = result.id
    // owner 18090920@N07
    const owner = result.owner
    photographer = result.ownername
    // flickr link https://www.flickr.com/photos/18090920@N07/5982607204
    photographerPage = `https://www.flickr.com/photos/${owner}/${id}`
    license_name = result.license_name
    // url_c 800px
    const regularImgLink = result.url_c
    searchResults[0].insertAdjacentHTML(
      'beforeend',
      `<div class="selected_thumb" id="${id}" data-licenseName="${license_name}" data-thumb="${thumb}" data-photographer="${photographer}" data-photographerPage="${photographerPage}" onClick="changeImageValue(this)">
        <div class="p-2">
        <img class="result-item"  src="${thumb}";/>
        <p class="photographer-name">Photo by 
        <a href="${photographerPage}" target="_blank" style="color: black; ">${photographer}</a> on <a href="https://flickr.com/" target="_blank">Flickr</a>
        </p>
        </div>
      </div>`
    )	
  })
  
  $('.modal').scrollTop(0)
}