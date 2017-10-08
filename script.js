/* Modal Function */
$(function() {
    $("#myBtn").click(function() {
        $("#myModal").modal();
    });
});

/* Drag&Drop Function */
$ (function () {
  var files = $("#files");

  $("#fileupload").fileupload ({
    url:'index.py',
    dropzone:'#fileupload',
    dataType:'json',
    autoUpload: false
  }).on('dragover', function() {
    $(this).addClass('fileupload-over');
    return false;
  }).on('dragleave', function() {
    $(this).removeClass('fileupload-over');
    return false;
  }).on('drop', function(e) {
    e.preventDefault();
    $(this).removeClass('fileupload-over'); 
  }).on('fileuploadadd', function (e, data) {
    var fileTypeAllowed = /.\.(gif|jpg|png|jpeg|pdf)$/i;
    var fileName = data.originalFiles[0]['name'];
    var fileSize = data.originalFiles[0]['size'];
    /*console.log(data);*/
    if (!fileTypeAllowed.test(fileName))
      $("#error").html('Only images & pdf!');
    else if (fileSize > 500000)
      $("#error").html('File is too big! Max allowed 500KB');
    else {
      $("#error").html("");
      data.submit();
    }
  }).on('fileuploaddone', function(e, data) {
    var status = data.jqXHR.responceJSON.status;
    var msg = data.jqXHR.responceJSON.msg;

    if (status == 1) {
      var path = data.jqXHR.responceJSON.path;
      $("#files").fadeIn().append('someFunction'); 
    } else 
    $("#error").html(msg); 
  });
}); 

$('#file').bind('change', function (e) {
    $('#fileupload').fileupload('add', {
        files: e.target.files || [{name: this.value}],
        fileInput: $(this)
    });
});