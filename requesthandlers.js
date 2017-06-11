var database = require("../WinterHugWebTechCW/database");
var saveAs = require('file-saver');
var fs = require("fs");
var OK = 200;

var querystring = require("querystring");

// ******************************************************************************* html *************************************************************************
function index(response, postData, pathname, type) {
 	console.log("index request is handled");
	 var file = "./public" + pathname;
     fs.readFile(file, ready);
     function ready(err, content) { deliver(response, type, err, content); }
 }

function style(response, postData, pathname, type){
	console.log("style.css request is handled");	
	var file = "./public" + pathname;
	fs.readFile(file, ready);
	function ready(err, content) { deliver(response, type, err, content);}
}

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


 exports.index = index;

 exports.style = style;
 exports.profilePicture = profilePicture;
 exports.bristollogo = bristollogo;
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