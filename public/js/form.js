$(document).ready(function(){

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

      if(flag == 1){
        $.ajax({
              type: 'POST',
              data: 'name=' + $('#name').val() + '&dob=' + $('#dob').val() + '&sex=' + $('#sex').val() + '&ethnicity=' + $('#ethnicity').val() + '&password=' + $('#password').val(),
              contentType: "application/json",
              dataType:'json',
              async:false,
              url: 'http://localhost:8080/authentication.json',                      
              success: function(response) {
                  alert("hi");
                  var obj = JSON.parse(JSON.stringify(response));
                  if(obj.data == 1){
                      $('#passwordwarning').text("Secret Code entered is not 6 digit long");
                      $('#passwordwarning').show();
                   }else if(obj.data == 2){
                      $('#passwordwarning').text("Entered number is not a number");
                      $('#passwordwarning').show();
                   }else if(obj.data == 3){
                      // alert("new person added");
                      window.location.href = "http://localhost:8080/instruction.html"; 
                   }else if(obj.data == 4){
                      // alert("User already exist and credential matched: he/she can enter the website");
                      window.location.href = "http://localhost:8080/instruction.html"; 
                   }                                  
              },
              error: function(error) {
                  console.log("some error in fetching the notifications");
               }
          });
      }
    });

    $('#instruction-submit').click(function(){
      alert("hi there");
       window.location.href = "http://localhost:8080/survey.html";
    });   
});