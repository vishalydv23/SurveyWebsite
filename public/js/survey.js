$(document).ready(function(){

  localStorage.setItem("Gender", "Male");

 $('#score-submit-button').click(function(){;
       var selValue = $('input[name=score]:checked').val();
       var imageNo = $('#survey-image').attr('src').filename();
       $.ajax({
              type: 'POST',
              data: 'score='+selValue+'&imagenumber='+imageNo+'&secretcode='+localStorage.getItem("Secretcode"), 
              contentType: "application/json",
              dataType:'json',
              async:false,
              url: 'http://localhost:8080/submitscore.json',                      
              success: function(response) {
                var obj = JSON.parse(JSON.stringify(response));
                if(obj.data == 2){
                  if((obj.type == "m1" && imageNo == 71) || (obj.type == "m2" && imageNo == 150) ||(obj.type == "f1" && imageNo == 219)){
                    alert("You sitting session has ended, next session will start after 4 hours");
                  }else if (obj.type == "f2" && imageNo == 300){
                    alert("Thanks you for survey. You can now leave the site.");
                  }else{
                    imageNo += 1;
                    $('#survey-image').attr("src","../img/faces/" + imageNo + ".jpg");
                  }
                }
              }
         });     
  });


String.prototype.filename = function(extension){
    var s= this.replace(/\\/g, '/');
    s= s.substring(s.lastIndexOf('/')+ 1);
    return extension? s.replace(/[?#].+$/, ''): s.split('.')[0];
}


 $.ajax({
            type: 'POST',
            data: 'secretcode='+localStorage.getItem("Secretcode"),
            contentType: "application/json",
            dataType:'json',
            async:false,
            url: 'http://localhost:8080/imagedownload.json',                      
            success: function(response) {
                var obj = JSON.parse(JSON.stringify(response));  
                if(localStorage.getItem("Gender") == Male){
                                if(obj.data <= 69){ 
                                $('#sitting-warning').text("Sitting 1: ");
                                $('#number-sex-faces').text("69 Female Face Images.");
                                // hiding the unnecessary fields in table
                                for(var i=70;i<=81;i++){
                                  $('#'+i).hide();
                                }
                                var image_number = obj.data + 1 + 150;
                                $('#survey-image').attr("src","../img/faces/" + image_number + ".jpg");
                          }else if(obj.data >69 && obj.data <= 150){
                                $('#sitting-warning').text("Sitting 2: ");
                                $('#number-sex-faces').text("81 Female Face Images.");

                                // for(var i=70;i<=81;i++){
                                //   $('#'+i).hide();
                                // }

                                var image_number = obj.data + 1 + 219;
                                $('#survey-image').attr("src","../img/faces/" + image_number + ".jpg");
                          }else if(obj.data >150 && obj.data <= 219){
                                $('#sitting-warning').text("Sitting 3: ");
                                $('#number-sex-faces').text("71 Male Face Images.");
                                // hiding the unnecessary fields in table
                                for(var i=72;i<=81;i++){
                                  $('#'+i).hide();
                                }
                                var image_number = obj.data - 151;
                                $('#survey-image').attr("src","../img/faces/" + image_number + ".jpg");
                          }else if(obj.data >219){
                                $('#sitting-warning').text("Sitting 4: ");
                                $('#number-sex-faces').text("79 Male Face Images.");
                                // hiding the unnecessary fields in table
                                for(var i=80;i<=81;i++){
                                  $('#'+i).hide();
                                }
                                var image_number = obj.data - 220;
                                $('#survey-image').attr("src","../img/faces/" + image_number + ".jpg");
                          }
                      }else{
                                if(obj.data <= 71){
                                $('#sitting-warning').text("Sitting 1: ");
                                $('#number-sex-faces').text("71 Male Face Images.");
                                // hiding the unnecessary fields in table
                                for(var i=70;i<=81;i++){
                                  $('#'+i).hide();
                                }
                                var image_number = obj.data + 1 ;
                                $('#survey-image').attr("src","../img/faces/" + image_number + ".jpg");

                          }else if(obj.data >71 && obj.data <= 150){
                                $('#sitting-warning').text("Sitting 2: ");
                                $('#number-sex-faces').text("79 Male Face Images.");
                                // hiding the unnecessary fields in table
                                for(var i=80;i<=81;i++){
                                  $('#'+i).hide();
                                }
                                var image_number = obj.data + 1;
                                $('#survey-image').attr("src","../img/faces/" + image_number + ".jpg");
                          }else if(obj.data >150 && obj.data <= 219){
                                $('#sitting-warning').text("Sitting 3: ");
                                $('#number-sex-faces').text("69 Female Face Images.");
                                // hiding the unnecessary fields in table
                                for(var i=70;i<=81;i++){
                                  $('#'+i).hide();
                                }
                                var image_number = obj.data + 1;
                                $('#survey-image').attr("src","../img/faces/" + image_number + ".jpg");
                          }else if(obj.data >219){
                                $('#sitting-warning').text("Sitting 4: ");
                                $('#number-sex-faces').text("69 Male Face Images.");
                                // hiding the unnecessary fields in table
                                // for(var i=70;i<=81;i++){
                                //   $('#'+i).hide();
                                // }
                                var image_number = obj.data + 1;
                                $('#survey-image').attr("src","../img/faces/" + image_number + ".jpg");
                          }
                      }  
              },
            error: function(error) {
                console.log("some error in fetching the notifications");
             }
          });



});








