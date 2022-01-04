const form = $('.js-form');
const nextBtn = $('.js-next');
const prevBtn = $('.js-prev');
let resultStats = $('.js-result-stats');
const spinner = $('.js-spinner');
let totalResults;
let currentPage = 1;
let searchQuery;

$(document).ready(function () {
  const img = localStorage.getItem('flickr_selected_photo')
  const photographer = localStorage.getItem('flickr_photographer')
  const photographerPage = localStorage.getItem('flickr_photographerPage')
  const regularLink = localStorage.getItem('flickr_regularLink')
  // const photoId = localStorage.getItem('flickr_photoId')
  const license_name = localStorage.getItem('flickr_license_name')
  console.log('img: ', img)
  $('#selectedImg').attr('src', img);
  $('#photographerLink').text(photographer)
  $('#photographerLink').attr('href', photographerPage)
  // $('input[name="regularImg"]').attr("value", regularLink)
  // $('input[name="photoId"]').attr("value", photoId)
  // $('input[name="photographer"]').attr("value", photographer)
  // $('input[name="photographerPage"]').attr("value", photographerPage)
  // $('input[name="license_name"]').attr("value", license_name)
  // $('#bg-div').hide();
  if (img) {
    $('.selected-img').show()
  } else {
    $('.selected-img').hide()
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
  spinner.removeClass('hidden')
	try {
    const results = await searchImage(searchQuery)
    console.log('results', results)
    // console.log('results.total_pages: ', results.total_pages)
		pagination(results.total_pages)
		displayResults(results)
	} catch(err) {
		console.log(err);
		alert('Failed to search Flickr')
	}
	spinner.addClass('hidden')
} 

function handleSubmit(event) {
	event.preventDefault();
	currentPage = 1;
  const inputValue = $('.js-search-input').val();
	searchQuery = $.trim(inputValue);
	fetchResults(searchQuery);
}

function changeImageValue (photo) {
  console.log('Changing ...')
  const photographer = photo.getAttribute('data-photographer')
  const photographerPage = photo.getAttribute('data-photographerPage')
  const thumb = photo.getAttribute('data-thumb')
  let license_name = photo.getAttribute('data-licensename').toUpperCase()
  // console.log('photo.id', photo.id)
  const regularLink = photo.getAttribute('data-regularLink')
  const license_link = `https://creativecommons.org/licenses/${license_name}/2.0`
  license_name = `CC ${license_name} 2.0`
  // console.log('regularLink: ',regularLink)
  // console.log('photographer: ', photographer);
  // console.log('photographerPage: ', photographerPage);
  $('#photographer').val(photographer)
  $('#photographerPage').val(photographerPage)
  $('#photographerLink').text(photographer)
  $('#photographerLink').attr('href', photographerPage)
  $('#license_link').attr('href', license_link)
  $('#license_link').text(license_name)
  // $('input[name="regularImg"]').attr("value", regularLink)
  // $('input[name="photoId"]').attr("value", photo.id)
  // $('input[name="photographer"]').attr("value", photographer)
  // $('input[name="photographerPage"]').attr("value", photographerPage)
  $('input[name="license_name"]').attr("value", license_name)
  // console.log('inputs: ', inputs)
  // $('input[name="regularImg"]').val = regularLink
  // display .selected-img div
  $('.selected-img').show()
  // add the src attribute
  $('#selectedImg').attr('src', thumb)
  // hide the modal
  $('#flickrModal').modal('hide')
  // store in the localStorage
  localStorage.setItem('flickr_selected_photo', thumb)
  localStorage.setItem('flickr_photographer', photographer)
  localStorage.setItem('flickr_photographerPage', photographerPage)
  localStorage.setItem('flickr_regularLink', regularLink)
  // localStorage.setItem('flickr_photoId', photo.id)
  localStorage.setItem('flickr_license_name', license_name)
}

// function setStorageImg () {
//   // set image to show 
//   let img = localStorage.getItem('flickr_selected_photo');
//   if (img) {
//     $('.selected-img').show();
//     $('#selectedImg').attr('src', img);
//   }
// }

async function searchImage (searchQuery) {
  const endpoint = `/flickr_photos/${searchQuery}/${currentPage}`
  const response = await fetch(endpoint);
	if (!response.ok) {
		throw Error(response.statusText);
	}
	const json = await response.json();
	return json;
}

function removePhoto () {
  // console.log('removing ... ', )
  localStorage.removeItem('flickr_selected_photo');
  localStorage.removeItem('flickr_photographer')
  localStorage.removeItem('flickr_photographerPage')
  localStorage.removeItem('flickr_regularLink')
  // localStorage.removeItem('flickr_photoId')
  localStorage.removeItem('flickr_license_name')
  $('#flickrInput').attr('value','');
  $('.selected-img').hide()
  $('#flickrInput').val('')
  $('#photographer').val('')
  $('#photographerPage').val('')
  $('#photographerLink').text('')
  $('#photographerLink').attr('href', '')
  // $('input[name="regularImg"]').attr("value", '')
  // $('input[name="photoId"]').attr("value", '')
  // $('input[name="photographer"]').attr("value", '')
  // $('input[name="photographerPage"]').attr("value", '')
  $('input[name="license_name"]').attr("value", '')
  // show #bg-div
  // $('#bg-div').show()
}

function displayResults(results) {
	const searchResults = $('.search-results');
  searchResults.text('');
  results.forEach(result => {
    // console.log(result)
    const thumb = result.url_m;
    const medium_img = result.url_c
    // console.log('url: ', url)
    // https://live.staticflickr.com/4294/35185475274_6f53ae8725.jpg
    // photo id 5982607204
    const id = result.id;
    // owner 18090920@N07
    const owner = result.owner
    const photographer = result.ownername
    // flickr link https://www.flickr.com/photos/18090920@N07/5982607204
		// const photographer = result.user.name;
    // const photographerPage = result.user.links.html;
    const photographerPage = `https://www.flickr.com/photos/${owner}/${id}`
    const license_name = result.license_name
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
		);	
  });
	// totalResults = results.total;
  // resultStats.text(`About ${totalResults} results found`);
  $('.modal').scrollTop(0);
};