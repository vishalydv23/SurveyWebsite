$(document).ready(function(){

  $.ajax({
              type: 'POST',
              data: 'picNumber=1&gender=female',
              contentType: "application/json",
              dataType:'json',
              async:false,
              url: 'http://localhost:8080/imagedownload.json',                      
              success: function(response) {
                  // var obj = JSON.parse(JSON.stringify(response));
                  // if(obj.data == 0){
                  //     alert("blog submitted");
                  //     $('#topic').val("");
                  //     $('#blog-text').val("");
                  //     $('#pic').val("");
                  //  }       
                  alert("Hi how are you");                
              },
              error: function(error) {
                  console.log("some error in fetching the notifications");
               }
          });

});