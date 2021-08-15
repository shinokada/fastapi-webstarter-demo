import { detect, dragdrop } from './imagehelper.js'

$(function () {
  dragdrop();

  function preparedata (file) {
    console.log("Preparing ...")
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    detect(img.src, function (result) {
      let winWidth = $(window).width();
      let imgWidth = result.imgWidth;
      let imgHeight = result.imgHeight;
      let data = { 'winWidth': winWidth, 'imgWidth': imgWidth, 'imgHeight': imgHeight };
      let jdata = JSON.stringify(data);
      let fd = new FormData();
      fd.append('imgdata', jdata);
      fd.append('file', file);
      console.log("fd: ", fd);
      uploadData(fd);
    });
  }

  // Drop
  $('.upload-area').on('drop', function (e) {
    e.stopPropagation();
    e.preventDefault();
    $("#howto").text("We are uploading your file.");
    let file = e.originalEvent.dataTransfer.files;
    console.log("File uploaded: ", file);
    let imageType = /image.*/;
    let winWidth = $("#window_width").val();
    let dropped = file[0];
    if (dropped.type.match(imageType)) {
      preparedata(dropped);
    } else {
      console.log("not image");
      $("#howto").text("Please use an image file. Try one more time.");
    }
    console.log("done drop.")
  });

  // Open file selector on div click
  $("#uploadfile").click(function () {
    $("#file").click();
  });

  // file selected
  $("#file").change(function () {
    let imageType = /image.*/;
    let file = $('#file')[0].files[0];
    console.log("file.size: ", file.size);
    $("#howto").text("Uploading your file.");
    if (file.type.match(imageType)) {
      console.log("file: ", file);
      preparedata(file);
    } else {
      console.log("not image");
      $("#howto").text("Please use an image file. Try one more time.");
    }
  });
});



// Sending AJAX request and upload file
function uploadData (formdata) {

  $.ajax({
    url: '/upload/new/',
    type: 'post',
    data: formdata,
    contentType: false,
    processData: false,
    success: function (data) {
      updatetags(data);
    }
  });
}

function updatetags (data) {
  let original = `<img src="/${data.thumb_path}" class="responsive" alt="">`;
  $("#original").html(original);

  $("#howto").html("Drag and Drop file here<br />Or<br />Click to Upload")
}

