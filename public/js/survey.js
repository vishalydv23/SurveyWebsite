$(document).ready(function(){

  function showCurrentPicNumber(picNumber, type){
    $("table td").css("color", "rgb(197,0,10)");
    $("table td").css("background-color", "rgb(255,255,255)");
    if(type == "m1"){
      $("#c" + picNumber).css("color", "rgb(0,0,0)");
      $("#c" + picNumber).css("background-color", "rgb(0,255,0)");
    }else if(type == "m2"){
      $("#c" + (picNumber - 71) + "").css("color", "rgb(0,0,0)");
      $("#c" + (picNumber - 71) + "").css("background-color", "rgb(0,255,0)");
    }else if(type == "f1"){
      // $(td).css("color", "rgb(255, 255,10)");
      // $(td).css("background-color", "rgb(255,255,255)");
      $("#c" + (picNumber - 150) + "").css("color", "rgb(0,0,0)");
      $("#c" + (picNumber - 150) + "").css("background-color", "rgb(0,255,0)");
    }else if(type == "m2"){
      $("#c" + (picNumber - 219) + "").css("color", "rgb(0,0,0)");
      $("#c" + (picNumber - 219) + "").css("background-color", "rgb(0,255,0)");
    }
  }

 $('#next-nav-button').click(function(){
    var imageNo = $('#survey-image').attr('src').filename();
    var numericalImageNo = parseInt(imageNo);
    numericalImageNo = numericalImageNo + 1;

    $('#next-nav-button').show();
    $('#previous-nav-button').show();
    var imagetype  = localStorage.getItem("ImageType");
    if((imagetype == "m1" && numericalImageNo == 71) || (imagetype == "m2" && numericalImageNo == 150) ||(imagetype == "f1" && numericalImageNo == 219) || numericalImageNo == 300){
      $('#next-nav-button').hide();
    }else{
        $('#survey-image').attr("src","../img/faces/" + numericalImageNo + ".jpg");   
        showCurrentPicNumber(numericalImageNo, imagetype);
        imagenumbercheck();

    }
  });

  $('#previous-nav-button').click(function(){
    var imageNo = $('#survey-image').attr('src').filename();
    var numericalImageNo = parseInt(imageNo);
    numericalImageNo = numericalImageNo - 1;

    // alert(numericalImageNo);
    $('#next-nav-button').show();
    $('#previous-nav-button').show();
    var imagetype  = localStorage.getItem("ImageType");

    if((numericalImageNo == 0) || (imagetype == "m2" && numericalImageNo == 71) ||(imagetype == "f1" && numericalImageNo == 150) || (imagetype == "f2" && numericalImageNo == 219)){
      $('#previous-nav-button').hide();
    }else{
      $('#survey-image').attr("src","../img/faces/" + numericalImageNo + ".jpg");   
      showCurrentPicNumber(numericalImageNo, imagetype);
      imagenumbercheck();
    }
  });

 $('#score-submit-button').click(function(){
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

                  localStorage.setItem("ImageType", obj.type);

                  if((obj.type == "m1" && imageNo == 71) || (obj.type == "m2" && imageNo == 150) ||(obj.type == "f1" && imageNo == 219)){
                    alert("You sitting session has ended, next session will start after 4 hours");
                    var d = new Date();
                    localStorage.setItem("CurrentTime", formatDate(d));

                    window.location.href = "http://localhost:8080/index.html"
                  }else if (obj.type == "f2" && imageNo == 300){
                    alert("Thanks you for survey. You can now leave the site.");
                  }else{
                    // alert(imageNo);
                    var numericalImageNo = parseInt(imageNo);
                    numericalImageNo = numericalImageNo + 1;
                    // alert(numericalImageNo);
                    $('#survey-image').attr("src","../img/faces/" + numericalImageNo + ".jpg");
                    showCurrentPicNumber(numericalImageNo, obj.type);
                    imagenumbercheck();
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
                // var imageNo = $('#survey-image').attr('src').filename();
                // var numericalImageNo = parseInt(imageNo);
                
                var obj = JSON.parse(JSON.stringify(response));  
                if(localStorage.getItem("Gender") == "male"){
                                if(obj.data <= 69){

                                $('#sitting-warning').text("Sitting 1: ");
                                $('#number-sex-faces').text("69 Female Face Images.");
                                localStorage.setItem("ImageType", "f1");
                                // hiding the unnecessary fields in table
                                for(var i=70;i<=81;i++){
                                  $('#c'+i).hide();
                                }
                                var image_number = obj.data + 1 + 150;
                                $('#survey-image').attr("src","../img/faces/" + image_number + ".jpg");
                                showCurrentPicNumber(image_number, "f1");
                                // imagenumbercheck();

                                if(image_number == 151){
                                  $('#previous-nav-button').hide();
                                }else if(image_number == 219){
                                  $('#next-nav-button').hide();
                                }
                          }else if(obj.data >69 && obj.data <= 150){
                                $('#sitting-warning').text("Sitting 2: ");
                                $('#number-sex-faces').text("81 Female Face Images.");
                                localStorage.setItem("ImageType", "f2");

                                var image_number = obj.data + 1 + 219;
                                $('#survey-image').attr("src","../img/faces/" + image_number + ".jpg");
                                showCurrentPicNumber(image_number, "f2");
                                // imagenumbercheck();


                                 if(image_number == 220){
                                  $('#previous-nav-button').hide();
                                }else if(image_number == 300){
                                  $('#next-nav-button').hide();
                                }
                          }else if(obj.data >150 && obj.data <= 219){
                                $('#sitting-warning').text("Sitting 3: ");
                                $('#number-sex-faces').text("71 Male Face Images.");
                                localStorage.setItem("ImageType", "m1");
      
                                // hiding the unnecessary fields in table
                                for(var i=72;i<=81;i++){
                                  $('c#'+i).hide();
                                }
                                var image_number = obj.data - 151;
                                $('#survey-image').attr("src","../img/faces/" + image_number + ".jpg");
                                showCurrentPicNumber(image_number, "m1");
                                // imagenumbercheck();


                                if(image_number == 1){
                                  $('#previous-nav-button').hide();
                                }else if(image_number == 71){
                                  $('#next-nav-button').hide();
                                }

                          }else if(obj.data >219){
                                $('#sitting-warning').text("Sitting 4: ");
                                $('#number-sex-faces').text("79 Male Face Images.");
                                localStorage.setItem("ImageType", "m2");

                                // hiding the unnecessary fields in table
                                for(var i=80;i<=81;i++){
                                  $('c#'+i).hide();
                                }
                                var image_number = obj.data - 220;
                                $('#survey-image').attr("src","../img/faces/" + image_number + ".jpg");
                                showCurrentPicNumber(image_number, "m2");
                                // imagenumbercheck();

                                if(image_number == 72){
                                  $('#previous-nav-button').hide();
                                }else if(image_number == 150){
                                  $('#next-nav-button').hide();
                                }
                          }
                      }else{
                                if(obj.data <= 71){
                                $('#sitting-warning').text("Sitting 1: ");
                                $('#number-sex-faces').text("71 Male Face Images.");
                                localStorage.setItem("ImageType", "m1");

                                // hiding the unnecessary fields in table
                                for(var i=70;i<=81;i++){
                                  $('c#'+i).hide();
                                }
                                var image_number = obj.data + 1 ;
                                $('#survey-image').attr("src","../img/faces/" + image_number + ".jpg");
                                showCurrentPicNumber(image_number, "m1");
                                // imagenumbercheck();


                                if(image_number == 1){
                                  $('#previous-nav-button').hide();
                                }else if(image_number == 71){
                                  $('#next-nav-button').hide();
                                }

                          }else if(obj.data >71 && obj.data <= 150){
                                $('#sitting-warning').text("Sitting 2: ");
                                $('#number-sex-faces').text("79 Male Face Images.");
                                localStorage.setItem("ImageType", "m2");

                                // hiding the unnecessary fields in table
                                for(var i=80;i<=81;i++){
                                  $('c#'+i).hide();
                                }
                                var image_number = obj.data + 1;
                                $('#survey-image').attr("src","../img/faces/" + image_number + ".jpg");
                                showCurrentPicNumber(image_number, "m2");
                                // imagenumbercheck();


                                if(image_number == 72){
                                  $('#previous-nav-button').hide();
                                }else if(image_number == 150){
                                  $('#next-nav-button').hide();
                                }
                          }else if(obj.data >150 && obj.data <= 219){
                                $('#sitting-warning').text("Sitting 3: ");
                                $('#number-sex-faces').text("69 Female Face Images.");
                                localStorage.setItem("ImageType", "f1");

                                // hiding the unnecessary fields in table
                                for(var i=70;i<=81;i++){
                                  $('c#'+i).hide();
                                }
                                var image_number = obj.data + 1;
                                $('#survey-image').attr("src","../img/faces/" + image_number + ".jpg");
                                showCurrentPicNumber(image_number, "f1");
                                // imagenumbercheck();

                                if(image_number == 151){
                                  $('#previous-nav-button').hide();
                                }else if(image_number == 219){
                                  $('#next-nav-button').hide();
                                }
                          }else if(obj.data >219){
                                $('#sitting-warning').text("Sitting 4: ");
                                $('#number-sex-faces').text("69 Male Face Images.");
                                localStorage.setItem("ImageType", "f2");

                                var image_number = obj.data + 1;
                                $('#survey-image').attr("src","../img/faces/" + image_number + ".jpg");
                                showCurrentPicNumber(image_number, "f2");
                                // imagenumbercheck();


                                if(image_number == 220){
                                  $('#previous-nav-button').hide();
                                }else if(image_number == 300){
                                  $('#next-nav-button').hide();
                                }
                          }
                      }  
                      imagenumbercheck();
              },
            error: function(error) {
                console.log("some error in fetching the notifications");
             }
          });
function imagenumbercheck(){
  $.ajax({
            type: 'POST',
            data: 'secretcode='+localStorage.getItem("Secretcode"),
            contentType: "application/json",
            dataType:'json',
            async:false,
            url: 'http://localhost:8080/scoredimagenumber.json',                      
            success: function(response) {
              var obj = JSON.parse(JSON.stringify(response)); 
              var imagetype  = localStorage.getItem("ImageType");
              
              for(var i = 0; i < obj.data.length; i++){  
                if(imagetype == "m1"){      
                    $("#c" + (obj.data[i].imageno) + "").css("color", "rgb(255,255,255)");
                    $("#c" + (obj.data[i].imageno) + "").css("background-color", "rgb(0,0,255)");
                }else if(imagetype == "m2"){
                    $("#c" + (obj.data[i].imageno - 71) + "").css("color", "rgb(255,255,255)");
                    $("#c" + (obj.data[i].imageno - 71) + "").css("background-color", "rgb(0,0,255)");
                }else if(imagetype == "f1"){
                    $("#c" + (obj.data[i].imageno - 150) + "").css("color", "rgb(255,255,255)");
                    $("#c" + (obj.data[i].imageno - 150) + "").css("background-color", "rgb(0,0,255)");
                }else if(imagetype == "f2"){
                    $("#c" + (obj.data[i].imageno - 219) + "").css("color", "rgb(255,255,255)");
                    $("#c" + (obj.data[i].imageno - 219) + "").css("background-color", "rgb(0,0,255)");
                }
              }
              if((imagetype == "m1" && numericalImageNo == 71) || (imagetype == "m2" && numericalImageNo == 150) ||(imagetype == "f1" && numericalImageNo == 219) || numericalImageNo == 300){

              }
              // alert(obj.data[0].imageno);
            }
      });
}

});








