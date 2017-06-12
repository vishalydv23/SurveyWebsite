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

  // $('#submitButton').click(function(){

  //       if( !$('#username').val() ) {
  //         $('#authentication-warning').show();
  //         $('#authentication-warning').text("Username can't be empty");   
  //       }else if(!$('#password').val()){
  //         $('#authentication-warning').show();
  //         $('#authentication-warning').text("password can't be empty");
  //       }else{
  //           $('#authentication-warning').hide();
            
  //           $.ajax({
  //               type: 'POST',
  //               data: 'username=' + $('#username').val() + '&password=' + $('#password').val(),
  //               contentType: "application/json",
  //               dataType:'json',
  //               async:false,
  //               url: 'http://localhost:8080/authenticate.json',                      
  //               success: function(response) {
  //                   var obj = JSON.parse(JSON.stringify(response));
  //                   if(obj.data == 1){
  //                     $('#username').val("");
  //                     $('#password').val("");
  //                     window.location.href = "http://localhost:8080/dashboard.html";
  //                   }else{
  //                       $('#authentication-warning').show();
  //                       $('#authentication-warning').text("No such account exist.");
  //                       $('#username').val("");
  //                       $('#password').val("");
  //                   }                            
  //               },
  //               error: function(error) {
  //                   console.log("some error in fetching the notifications");
  //                }
  //           });
  //       }
  // });
});