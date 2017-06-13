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
        window.location.href = "http://localhost:8080/instruction.html";
      }

    });

    $('#instruction-submit').click(function(){
      alert("hi there");
       window.location.href = "http://localhost:8080/survey.html";
    });
    
});