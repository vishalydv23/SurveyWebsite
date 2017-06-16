var database = require("../SurveyWebsite/database");
var saveAs = require('file-saver');
var fs = require("fs");
var FileReader = require('filereader');
var OK = 200;

var querystring = require("querystring");

// ******************************************************************************* html *************************************************************************
function index(response, postData, pathname, type) {
 	console.log("index request is handled");
	 var file = "./public" + pathname;
     fs.readFile(file, ready);
     function ready(err, content) { deliver(response, type, err, content); }
 }

function form(response, postData, pathname, type) {
 	console.log("index request is handled");
	 var file = "./public" + pathname;
     fs.readFile(file, ready);
     function ready(err, content) { deliver(response, type, err, content); }
 }

function instruction(response, postData, pathname, type) {
 	console.log("index request is handled");
	 var file = "./public" + pathname;
     fs.readFile(file, ready);
     function ready(err, content) { deliver(response, type, err, content); }
 }

function survey(response, postData, pathname, type) {
 	console.log("index request is handled");
	 var file = "./public" + pathname;
     fs.readFile(file, ready);
     function ready(err, content) { deliver(response, type, err, content); }
 }
 
// ******************************************************************************* css *************************************************************************
function style(response, postData, pathname, type){
	console.log("style.css request is handled");	
	var file = "./public" + pathname;
	fs.readFile(file, ready);
	function ready(err, content) { deliver(response, type, err, content);}
}

// ******************************************************************************* javascript *************************************************************************
function scriptForm(response, postData, pathname, type){
	console.log("form.js request is handled");	
	var file = "./public" + pathname;
	fs.readFile(file, ready);
	function ready(err, content) { deliver(response, type, err, content);}
}

function scriptInstruction(response, postData, pathname, type){
	console.log("form.js request is handled");	
	var file = "./public" + pathname;
	fs.readFile(file, ready);
	function ready(err, content) { deliver(response, type, err, content);}
}

function scriptIndex(response, postData, pathname, type){
	console.log("form.js request is handled");	
	var file = "./public" + pathname;
	fs.readFile(file, ready);
	function ready(err, content) { deliver(response, type, err, content);}
}

function scriptSurvey(response, postData, pathname, type){
	console.log("form.js request is handled");	
	var file = "./public" + pathname;
	fs.readFile(file, ready);
	function ready(err, content) { deliver(response, type, err, content);}
}

// ******************************************************************************* images *************************************************************************
function profilePicture(response, postData, pathname, type){
	console.log("profile_picture request is handled");	
	var file = "./public" + pathname;
	fs.readFile(file, ready);
	function ready(err, content) { deliver(response, type, err, content);}
}

function bristollogo(response, postData, pathname, type){
	console.log("bristol logo request is handled");	
	var file = "./public" + pathname;
	fs.readFile(file, ready);
	function ready(err, content) { deliver(response, type, err, content);}
}

function defaultprofile(response, postData, pathname, type){
	console.log("bristol logo request is handled");	
	var file = "./public" + pathname;
	fs.readFile(file, ready);
	function ready(err, content) { deliver(response, type, err, content);}
}

// ******************************************************************************* json ***************************************************************************

function functionImageDownload(response, postData, pathname, type) {
 	console.log("Image Download request is handled");

	var formData = querystring.parse(postData);
	var file = "./pics/" + formData.gender + "/" + formData.gender + ".jpg";

	if(file){
		var reader = new FileReader();
		fs.readFile(file);
	}
 }

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return (year);
}

 function functionAuthentication(response, postData, pathname, type) {
 	console.log("Authentication function request is handled");

 	var formData = querystring.parse(postData);

 	var flag = 0;
 	var isnum = /^\d+$/.test(formData.password);

 	if(formData.password.length != 6){
 		console.log("Secret Code entered is not 6 digit long");
 		flag = 1;
 	}else if(!isnum){
 		console.log("entered number is not a number");
 		flag = 2;
 	}
 	database.authentication(formData.password, function(result){
 		
 		var res = formData.dob.substring(0, 4);
 		var date = new Date();

 		var difference = formatDate(date) - res;

 		if(result == 2){
 			database.adduser(formData.name, difference, formData.sex, formData.ethnicity, formData.password, function(result1){
 				if(result1 == 0){
 					console.log("New Person named " + formData.name + " entered detail successfully");
 					flag = 3;
 				}
 			});
 		}else{
 			console.log("User already exist and credential matched: he/she can enter the website");
 			flag = 4;
 		}
	});

	content = '{data:'+flag.toString() +'}';
			var json = JSON.stringify(eval("(" + content + ")"));
			type = "application/json";
			var err;
			deliver(response, type, err, json);
 }

 exports.index = index;
 exports.form = form;
 exports.instruction = instruction;
 exports.survey = survey;

 exports.style = style;

 exports.functionImageDownload = functionImageDownload;
 exports.functionAuthentication = functionAuthentication;

 exports.scriptForm = scriptForm;
 exports.scriptInstruction = scriptInstruction;
 exports.scriptIndex = scriptIndex;
 exports.scriptSurvey = scriptSurvey;

 exports.profilePicture = profilePicture;
 exports.bristollogo = bristollogo;
 exports.defaultprofile = defaultprofile;
// Deliver the file that has been read in to the browser.
function deliver(response, type, err, content) {
    if (err) {
    	return fail(response, NotFound, "File not found");
    }
    var typeHeader = { "Content-Type": type };
    response.writeHead(OK, typeHeader);
    response.write(content);
    response.end();
}