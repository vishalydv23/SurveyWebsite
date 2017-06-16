$(document).ready(function(){

	$('#hi-user').text("Hi " + localStorage.getItem("Name"));
    $('#instruction-submit').click(function(){
       window.location.href = "http://localhost:8080/survey.html";
    });
    
});