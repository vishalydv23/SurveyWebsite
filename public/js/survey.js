$(document).ready(function(){

  $.ajax({
              type: 'POST',
              data: 'picNumber=1&gender=female',
              contentType: "application/json",
              dataType:'json',
              async:false,
              url: 'http://localhost:8080/imagedownload.json',                      
              success: function(response) {   
                  alert("Hi how are you");                
              },
              error: function(error) {
                  console.log("some error in fetching the notifications");
               }
          });

});