$(document).ready(function(){

  // alert("hi theer");

  $('#namewarning').hide();
  $('#passwordwarning').hide();
  $('#dobwarning').hide();
  

    $('#login-button').click(function(){

      var flag = 1;
      $('#namewarning').hide();
      $('#passwordwarning').hide();
      $('#dobwarning').hide();

      if(!$('#name').val()){
        $('#namewarning').show();
        flag = 0;
      }
      if(!$('#password').val()){
        $('#passwordwarning').show();
        flag = 0;
      }
      if(!$('#dob').val()){
        $('#dobwarning').show();
        flag = 0;
      }

      var d = new Date();
      if(localStorage.getItem("CurrentTime") == null){
        localStorage.setItem("CurrentTime", formatDate(d));
      }

      // if((new Date(formatDate(d)) - new Date(localStorage.getItem("CurrentTime"))) < 1){ //cant loggin before 4 hours
      //     alert("There has to ba a difference of 1 hours between two sittings. Try again when Time is complete");
      // }else{
      if(flag == 1){
        $.ajax({
              type: 'POST',
              data: 'name=' + $('#name').val() + '&dob=' + $('#dob').val() + '&sex=' + $('#sex').val() + '&ethnicity=' + $('#ethnicity').val() + '&password=' + $('#password').val(),
              contentType: "application/json",
              dataType:'json',
              async:false,
              url: 'http://localhost:8080/authentication.json',                      
              success: function(response) {
                  var obj = JSON.parse(JSON.stringify(response));
                  if(obj.data == 1){
                      $('#passwordwarning').text("Secret Code entered is not 6 digit long");
                      $('#passwordwarning').show();
                   }else if(obj.data == 2){
                      $('#passwordwarning').text("Entered number is not a number");
                      $('#passwordwarning').show();
                   }else if(obj.data == 5){
                      alert("Wrong Secret Code! Enter correct code. In case, you don't have the code, contact Vishal Yadav on whatsapp: +91 8923080797");
                   }else if(obj.data == 3 || obj.data == 4){
                      if (typeof(Storage) !== "undefined"){
                        localStorage.setItem("Name", $('#name').val());
                        localStorage.setItem("Secretcode", $('#password').val());
                        localStorage.setItem("Gender", $('#sex').val());

                        console.log("secret code has been logged into the local storage");
                        window.location.href = "http://localhost:8080/instruction.html";
                      }else{
                        alert("Sorry! you cannot proceed with your current browser, kindly switch to Google Chrome, Opera, or mozilla");
                      }              
                   }                                 
              },
              error: function(error) {
                  console.log("some error in fetching the notifications");
               }
          });
      }
    // }
    });

    

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
  //   $('#instruction-submit').click(function(){
  //     alert("hi there");
  //      window.location.href = "http://localhost:8080/survey.html";
  //   });   
});