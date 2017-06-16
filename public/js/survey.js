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

                          else if(obj.data >71 && obj.data <= 150){
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








