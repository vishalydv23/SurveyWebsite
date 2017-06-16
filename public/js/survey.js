$(document).ready(function(){

 $.ajax({
            type: 'POST',
            data: 'secretcode='+localStorage.getItem("Secretcode"),
            contentType: "application/json",
            dataType:'json',
            async:false,
            url: 'http://localhost:8080/imagedownload.json',                      
            success: function(response) {
                var obj = JSON.parse(JSON.stringify(response));    
                if(obj.data <= 71){
                  $('#number-sex-faces').text("71 Male Face Images.");
                  // hiding the unnecessary fields in table
                  for(var i=72;i<=81;i++){
                    $('#'+i).hide();
                  }
                  var image_number = obj.data + 1;
                  $('#survey-image').attr("src","../img/faces/" + image_number + ".jpg");
                }      
                // var obj = JSON.parse(JSON.stringify(response));
              },
            error: function(error) {
                console.log("some error in fetching the notifications");
             }
          });

});