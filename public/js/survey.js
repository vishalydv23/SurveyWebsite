$(document).ready(function(){

  function showCurrentPicNumber(picNumber, type){
    if(type == "m1"){
      $("#c" + picNumber).css("color", "rgb(0,0,0)");
      $("#c" + picNumber).css("background-color", "rgb(0,255,0)");
    }else if(type == "m2"){
      $("#c" + (picNumber - 71) + "").css("color", "rgb(0,0,0)");
      $("#c" + (picNumber - 71) + "").css("background-color", "rgb(0,255,0)");
    }else if(type == "f1"){
      $("#c" + (picNumber - 150) + "").css("color", "rgb(0,0,0)");
      $("#c" + (picNumber - 150) + "").css("background-color", "rgb(0,255,0)");
    }else if(type == "f2"){
      $("#c" + (picNumber - 219) + "").css("color", "rgb(0,0,0)");
      $("#c" + (picNumber - 219) + "").css("background-color", "rgb(0,255,0)");
    }
  }

    function showCurrentPicNumberInvert(picNumber, type){
    if(type == "m1"){
      $("#c" + picNumber).css("color", "rgb(197,0,10)");
      $("#c" + picNumber).css("background-color", "rgb(255,255,255)");
    }else if(type == "m2"){
      $("#c" + (picNumber - 71) + "").css("color", "rgb(197,0,10)");
      $("#c" + (picNumber - 71) + "").css("background-color", "rgb(255,255,255)");
    }else if(type == "f1"){
      $("#c" + (picNumber - 150) + "").css("color", "rgb(197,0,10)");
      $("#c" + (picNumber - 150) + "").css("background-color", "rgb(255,255,255)");
    }else if(type == "f2"){
      $("#c" + (picNumber - 219) + "").css("color", "rgb(197,0,10)");
      $("#c" + (picNumber - 219) + "").css("background-color", "rgb(255,255,255)");
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
      if(imagetype == "m1"){
          $('#survey-image').attr("src","../img/faces/" + numericalImageNo + ".jpg");
        }else if(imagetype == "m2"){
          $('#survey-image').attr("src","../img/faces/" + numericalImageNo + ".png");
        }else if(imagetype == "f1"){
          $('#survey-image').attr("src","../img/faces/" + numericalImageNo + ".jpg");
        }else if(imagetype == "f2"){
          $('#survey-image').attr("src","../img/faces/" + numericalImageNo + ".png");
        } 
        scoreUpdate(numericalImageNo);
        showCurrentPicNumberInvert(numericalImageNo - 1, imagetype);
        imagenumbercheck(); 
        showCurrentPicNumber(numericalImageNo, imagetype);
    }else{
        $('#next-nav-button').show();
        if(imagetype == "m1"){
          $('#survey-image').attr("src","../img/faces/" + numericalImageNo + ".jpg");
        }else if(imagetype == "m2"){
          $('#survey-image').attr("src","../img/faces/" + numericalImageNo + ".png");
        }else if(imagetype == "f1"){
          $('#survey-image').attr("src","../img/faces/" + numericalImageNo + ".jpg");
        }else if(imagetype == "f2"){
          $('#survey-image').attr("src","../img/faces/" + numericalImageNo + ".png");
        }  
        scoreUpdate(numericalImageNo);
        showCurrentPicNumberInvert(numericalImageNo - 1, imagetype);
        imagenumbercheck(); 
        showCurrentPicNumber(numericalImageNo, imagetype);
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

    if((numericalImageNo == 1) || (imagetype == "m2" && numericalImageNo == 72) ||(imagetype == "f1" && numericalImageNo == 151) || (imagetype == "f2" && numericalImageNo == 220)){
      $('#previous-nav-button').hide();
       if(imagetype == "m1"){
          $('#survey-image').attr("src","../img/faces/" + numericalImageNo + ".jpg");
        }else if(imagetype == "m2"){
          $('#survey-image').attr("src","../img/faces/" + numericalImageNo + ".png");
        }else if(imagetype == "f1"){
          $('#survey-image').attr("src","../img/faces/" + numericalImageNo + ".jpg");
        }else if(imagetype == "f2"){
          $('#survey-image').attr("src","../img/faces/" + numericalImageNo + ".png");
        }
        scoreUpdate(numericalImageNo);
        showCurrentPicNumberInvert(numericalImageNo + 1, imagetype);
        imagenumbercheck(); 
        showCurrentPicNumber(numericalImageNo, imagetype);
    }else{
      $('#previous-nav-button').show();
      if(imagetype == "m1"){
          $('#survey-image').attr("src","../img/faces/" + numericalImageNo + ".jpg");
        }else if(imagetype == "m2"){
          $('#survey-image').attr("src","../img/faces/" + numericalImageNo + ".png");
        }else if(imagetype == "f1"){
          $('#survey-image').attr("src","../img/faces/" + numericalImageNo + ".jpg");
        }else if(imagetype == "f2"){
          $('#survey-image').attr("src","../img/faces/" + numericalImageNo + ".png");
        }
      scoreUpdate(numericalImageNo); 
      showCurrentPicNumberInvert(numericalImageNo + 1, imagetype);
      imagenumbercheck();
      showCurrentPicNumber(numericalImageNo, imagetype);
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

                  if (localStorage.getItem("Gender") == "male" && imageNo == 150){
                    alert("Thanks you for survey. You can now leave the site.");
                    window.location.href = "http://localhost:8080/index.html";
                  }else if (localStorage.getItem("Gender") == "female" && imageNo == 300){
                    alert("Thanks you for survey. You can now leave the site.");
                    window.location.href = "http://localhost:8080/index.html";
                  }else if((obj.type == "m1" && imageNo == 71) || (obj.type == "m2" && imageNo == 150) ||(obj.type == "f1" && imageNo == 219) ||(obj.type == "f2" && imageNo == 300)){
                    alert("You sitting session has ended, next session will start after 1 hours");
                    var d = new Date();
                    localStorage.setItem("CurrentTime", formatDate(d));
                    window.location.href = "http://localhost:8080/index.html";
                    // window.location.href = "http://localhost:8080/instruction.html";

                  }else{
              
                    var numericalImageNo = parseInt(imageNo);
                    numericalImageNo = numericalImageNo + 1;
                  
                    if(obj.type == "m1"){
                      $('#survey-image').attr("src","../img/faces/" + numericalImageNo + ".jpg");
                    }else if(obj.type == "m2"){
                      $('#survey-image').attr("src","../img/faces/" + numericalImageNo + ".png");
                    }else if(obj.type == "f1"){
                      $('#survey-image').attr("src","../img/faces/" + numericalImageNo + ".jpg");
                    }else if(obj.type == "f2"){
                      $('#survey-image').attr("src","../img/faces/" + numericalImageNo + ".png");
                    }
                    

                    if((obj.type == "m1" && numericalImageNo == 71) || (obj.type == "m2" && numericalImageNo == 150) ||(obj.type == "f1" && numericalImageNo == 219) || numericalImageNo == 300){
                      $('#next-nav-button').hide();
                      if(obj.type == "m1"){
                          $('#survey-image').attr("src","../img/faces/" + numericalImageNo + ".jpg");
                        }else if(obj.type == "m2"){
                          $('#survey-image').attr("src","../img/faces/" + numericalImageNo + ".png");
                        }else if(obj.type == "f1"){
                          $('#survey-image').attr("src","../img/faces/" + numericalImageNo + ".jpg");
                        }else if(obj.type == "f2"){
                          $('#survey-image').attr("src","../img/faces/" + numericalImageNo + ".png");
                        }
                    }else{
                      $('#next-nav-button').show();
                      $('#previous-nav-button').show();
                    }
                    // if((numericalImageNo == 0) || (obj.type == "m2" && numericalImageNo == 71) ||(obj.type == "f1" && numericalImageNo == 150) || (obj.type == "f2" && numericalImageNo == 219)){
                    //   $('#previous-nav-button').hide();
                    // }
                    scoreUpdate(numericalImageNo);
                    showCurrentPicNumberInvert(numericalImageNo - 1, obj.type);
                    imagenumbercheck();
                    showCurrentPicNumber(numericalImageNo, obj.type);                                    
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

// On the load of the page download the most suitable picture
 $.ajax({
            type: 'POST',
            data: 'secretcode='+localStorage.getItem("Secretcode"),
            contentType: "application/json",
            dataType:'json',
            async:false,
            url: 'http://localhost:8080/imagedownload.json',                      
            success: function(response) {
                var obj = JSON.parse(JSON.stringify(response));  
                imagenumbercheck();
                // alert(obj.data);
                if(localStorage.getItem("Gender") == "male"){
                                // if(obj.data == 69){
                                //   window.location.href = "http://localhost:8080/survey.html";
                                // }
                                if(obj.data < 69){

                                $('#sitting-warning').text("Sitting 1: ");
                                $('#number-sex-faces').text("69 Female Face Images.");
                                localStorage.setItem("ImageType", "f1");
                                // hiding the unnecessary fields in table
                                for(var i=70;i<=81;i++){
                                  $('#c'+i).hide();
                                }
                                var image_number = obj.data + 1 + 150;
                                $('#survey-image').attr("src","../img/faces/" + image_number + ".jpg");
                                scoreUpdate(image_number);
                                showCurrentPicNumber(image_number, "f1");
                                // imagenumbercheck();

                                if(image_number == 151){
                                  $('#previous-nav-button').hide();
                                }else if(image_number == 219){
                                  $('#next-nav-button').hide();
                                }
                          }else if(obj.data >=69 && obj.data < 150){

                                if(obj.data == 69){
                                  $("table td").css("color", "rgb(197,0,10)");
                                  $("table td").css("background-color", "rgb(255,255,255)");
                                }

                                $('#sitting-warning').text("Sitting 2: ");
                                $('#number-sex-faces').text("81 Female Face Images.");
                                localStorage.setItem("ImageType", "f2");

                                var image_number = obj.data + 151;
                                $('#survey-image').attr("src","../img/faces/" + image_number + ".png");
                                scoreUpdate(image_number);
                                showCurrentPicNumber(image_number, "f2");
                                // imagenumbercheck();


                                 if(image_number == 220){
                                  $('#previous-nav-button').hide();
                                }else if(image_number == 300){
                                  $('#next-nav-button').hide();
                                }
                          }else if(obj.data >=150 && obj.data < 219){

                                if(obj.data == 150){
                                  $("table td").css("color", "rgb(197,0,10)");
                                  $("table td").css("background-color", "rgb(255,255,255)");
                                }

                                $('#sitting-warning').text("Sitting 3: ");
                                $('#number-sex-faces').text("71 Male Face Images.");
                                localStorage.setItem("ImageType", "m1");
      
                                // hiding the unnecessary fields in table
                                for(var i=72;i<=81;i++){
                                  $('#c'+i).hide();
                                }
                                var image_number = obj.data - 149;
                                $('#survey-image').attr("src","../img/faces/" + image_number + ".jpg");
                                scoreUpdate(image_number);
                                showCurrentPicNumber(image_number, "m1");
                                // imagenumbercheck();


                                if(image_number == 1){
                                  $('#previous-nav-button').hide();
                                }else if(image_number == 71){
                                  $('#next-nav-button').hide();
                                }

                          }else if(obj.data >=219){

                                if(obj.data == 219){
                                  $("table td").css("color", "rgb(197,0,10)");
                                  $("table td").css("background-color", "rgb(255,255,255)");
                                }
                                
                                $('#sitting-warning').text("Sitting 4: ");
                                $('#number-sex-faces').text("79 Male Face Images.");
                                localStorage.setItem("ImageType", "m2");

                                // hiding the unnecessary fields in table
                                for(var i=80;i<=81;i++){
                                  $('#c'+i).hide();
                                }
                                var image_number = obj.data - 149;
                                $('#survey-image').attr("src","../img/faces/" + image_number + ".png");
                                scoreUpdate(image_number);
                                showCurrentPicNumber(image_number, "m2");
                                // imagenumbercheck();

                                if(image_number == 72){
                                  $('#previous-nav-button').hide();
                                }else if(image_number == 150){
                                  $('#next-nav-button').hide();
                                }
                          }
                      }else{
                                if(obj.data < 71){
                                $('#sitting-warning').text("Sitting 1: ");
                                $('#number-sex-faces').text("71 Male Face Images.");
                                localStorage.setItem("ImageType", "m1");

                                // hiding the unnecessary fields in table
                                for(var i=72;i<=81;i++){
                                  $('#c'+i).hide();
                                }
                                var image_number = obj.data + 1 ;
                                $('#survey-image').attr("src","../img/faces/" + image_number + ".jpg");
                                scoreUpdate(image_number);
                                showCurrentPicNumber(image_number, "m1");
                                // imagenumbercheck();


                                if(image_number == 1){
                                  $('#previous-nav-button').hide();
                                }else if(image_number == 71){
                                  $('#next-nav-button').hide();
                                }

                          }else if(obj.data >=71 && obj.data < 150){

                                if(obj.data == 71){
                                  $("table td").css("color", "rgb(197,0,10)");
                                  $("table td").css("background-color", "rgb(255,255,255)");
                                }

                                $('#sitting-warning').text("Sitting 2: ");
                                $('#number-sex-faces').text("79 Male Face Images.");
                                localStorage.setItem("ImageType", "m2");

                                // hiding the unnecessary fields in table
                                for(var i=80;i<=81;i++){
                                  $('#c'+i).hide();
                                }
                                var image_number = obj.data + 1;
                                $('#survey-image').attr("src","../img/faces/" + image_number + ".png");
                                scoreUpdate(image_number);
                                showCurrentPicNumber(image_number, "m2");


                                if(image_number == 72){
                                  $('#previous-nav-button').hide();
                                }else if(image_number == 150){
                                  $('#next-nav-button').hide();
                                }
                          }else if(obj.data >=150 && obj.data < 219){

                                if(obj.data == 150){
                                  $("table td").css("color", "rgb(197,0,10)");
                                  $("table td").css("background-color", "rgb(255,255,255)");
                                }

                                $('#sitting-warning').text("Sitting 3: ");
                                $('#number-sex-faces').text("69 Female Face Images.");
                                localStorage.setItem("ImageType", "f1");

                                // hiding the unnecessary fields in table
                                for(var i=70;i<=81;i++){
                                  $('#c'+i).hide();
                                }
                                var image_number = obj.data + 1;
                                $('#survey-image').attr("src","../img/faces/" + image_number + ".jpg");
                                scoreUpdate(image_number);
                                showCurrentPicNumber(image_number, "f1");


                                if(image_number == 151){
                                  $('#previous-nav-button').hide();
                                }else if(image_number == 219){
                                  $('#next-nav-button').hide();
                                }
                          }else if(obj.data >=219){

                                if(obj.data == 219){
                                  $("table td").css("color", "rgb(197,0,10)");
                                  $("table td").css("background-color", "rgb(255,255,255)");
                                }

                                $('#sitting-warning').text("Sitting 4: ");
                                $('#number-sex-faces').text("69 Male Face Images.");
                                localStorage.setItem("ImageType", "f2");

                                var image_number = obj.data + 1;
                                $('#survey-image').attr("src","../img/faces/" + image_number + ".png");
                                scoreUpdate(image_number);
                                showCurrentPicNumber(image_number, "f2");

                                if(image_number == 220){
                                  $('#previous-nav-button').hide();
                                }else if(image_number == 300){
                                  $('#next-nav-button').hide();
                                }
                          }
                      }  
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
            }
      });
}

function scoreUpdate(imageNumber){
  $.ajax({
            type: 'POST',
            data: 'imagenumber=' + imageNumber + '&secretcode=' + localStorage.getItem("Secretcode"),
            contentType: "application/json",
            dataType:'json',
            async:false,
            url: 'http://localhost:8080/imagescore.json',                      
            success: function(response) {
              var obj = JSON.parse(JSON.stringify(response)); 
              if(obj.data == 0){
                $("#score5").prop("checked", true);
              }else{
                $("#score"+obj.data).prop("checked", true);
              }
            }
      });
}


function formatDate(date) {
      var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();

          hour = '' + d.getHours();
          minutes = '' + date.getMinutes();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
      if (hour.length < 2) day = '0' + hour;
      if (minutes.length < 2) day = '0' + minutes;


      return (year + "-" + month + "-" + day + " " + hour + ":" + minutes);
  }

});








