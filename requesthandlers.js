var database = require("./database");
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

function i2(response, postData, pathname, type){
	console.log("new face image request is handled");	
	var file = "./public" + pathname;
	fs.readFile(file, ready);
	function ready(err, content) { deliver(response, type, err, content);}
}

// ******************************************************************************* json ***************************************************************************

function functionImageDownload(response, postData, pathname, type) {
 	console.log("Image Download request is handled");

	var formData = querystring.parse(postData);
	database.checkNumberOfImagesScored(formData.secretcode, function(result){
		console.log("Number of images scored are :" + result);
		responsecall(result, response, type);
	});

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

function functionsubmitscore(response, postData, pathname, type) {
	console.log("submit score function request is handled");

	var flag = 0;
	var formData = querystring.parse(postData);
	var isnum = /^\d+$/.test(formData.imagenumber); // check if the image number is actually a number or not

	if(!isnum){
		console.log("problem with data as default pic is returned");
		flag = 1;
		responsecall(flag, response, type);
	}else{
		database.addScore(formData.imagenumber, formData.score, formData.secretcode, function(result){
			if(result == 0){
				console.log("score added successfully");
				database.checkType(formData.imagenumber, function(result){
					flag = 2;
					content = '{data:'+flag.toString() +', type:\"' + result.toString() + '\"}';
					var json = JSON.stringify(eval("(" + content + ")"));
					type = "application/json";
					var err;
					deliver(response, type, err, json);
				});		
			}
		});
	}

}

function functionScoredImagesNumber(response, postData, pathname, type) {
	console.log("The images score check function is handled");
	var formData = querystring.parse(postData);

	database.getImageNumber(formData.secretcode, function(result){
		// console.log("**************" + result.length);
		content1 = '{data: [';
		for(var i = 0; i < result.length; i++){
				if(i == (result.length-1)){
					content1 = content1 + '{imageno:' + result[i].imageno + '}';
				}else{
					content1 = content1 + '{imageno:' + result[i].imageno + '},';
				}		
		}
		content1 = content1 + ']}';
		var json = JSON.stringify(eval("(" + content1 + ")"));
		type = "application/json";
		var err;
		deliver(response, type, err, json);
	});
}


function functionImageScore(response, postData, pathname, type) {
	console.log("The image score check function is handled");
	var formData = querystring.parse(postData);
	database.checkScore(formData.imagenumber, formData.secretcode, function(result){
		// console.log("The image score ^^^^^^^^^^^^^^^^^^^^^^ is :" + result);
		if(result == null){
			result = 0;
		}
		responsecall(result, response, type);
	});
}


 function functionAuthentication(response, postData, pathname, type) {
 	console.log("Authentication function request is handled");

 	var formData = querystring.parse(postData);

 	var flag = 0;
 	var isnum = /^\d+$/.test(formData.password);

 	if(formData.password.length != 6){
 		console.log("Secret Code entered is not 6 digit long");
 		flag = 1;
 		responsecall(flag, response, type);
 	}else if(!isnum){
 		console.log("entered number is not a number");
 		flag = 2;
 		responsecall(flag, response, type);
 	}else{
		 	database.authentication(formData.password, function(result){
		 		
		 		var res = formData.dob.substring(0, 4);
		 		var date = new Date();

		 		var difference = formatDate(date) - res;

		 		if(result == 2){
		 			database.adduser(formData.name, difference, formData.sex, formData.ethnicity, formData.password, function(result1){
		 				if(result1 == 0){
		 					database.addusertoscoretable(formData.password, function(result2){
		 						if(result2 == 0){
		 							console.log("New column added to the score table");
		 						} 						
		 					});
		 					console.log("New Person named " + formData.name + " entered detail successfully");
		 					flag = 3;
		 					responsecall(flag,response, type);
		 				}
		 			});
		 		}else if(result == 3){
		 			console.log("User already exist and credential matched: he/she can enter the website");
		 			flag = 4;
		 			responsecall(flag,response, type);
		 		}else{
		 			console.log("Credentials are wrong. Cannot enter the website");
		 			flag = 5;
		 			responsecall(flag,response, type);
		 		}
			});
		 }
 }

function responsecall(flag,response, type){
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
 exports.functionsubmitscore = functionsubmitscore;
 exports.functionScoredImagesNumber = functionScoredImagesNumber;
 exports.functionImageScore = functionImageScore;

 exports.scriptForm = scriptForm;
 exports.scriptInstruction = scriptInstruction;
 exports.scriptIndex = scriptIndex;
 exports.scriptSurvey = scriptSurvey;

 exports.profilePicture = profilePicture;
 exports.bristollogo = bristollogo;
 exports.defaultprofile = defaultprofile;

 exports.i2 = i2;
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
