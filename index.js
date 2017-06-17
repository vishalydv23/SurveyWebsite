var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
 handle["/"] = requestHandlers.index;
 handle["/index.html"] = requestHandlers.index;
 handle["/form.html"] = requestHandlers.form;
 handle["/instruction.html"] = requestHandlers.instruction;
 handle["/survey.html"] = requestHandlers.survey;

 handle["/css/style.css"] = requestHandlers.style;

 handle["/imagedownload.json"] = requestHandlers.functionImageDownload;
 handle["/authentication.json"] = requestHandlers.functionAuthentication;
 handle["/submitscore.json"] = requestHandlers.functionsubmitscore;
 

 handle["/js/form.js"] = requestHandlers.scriptForm;
 handle["/js/instruction.js"] = requestHandlers.scriptInstruction;
 handle["/js/index.js"] = requestHandlers.scriptIndex;
 handle["/js/survey.js"] = requestHandlers.scriptSurvey;

 handle["/img/vishalyadav.jpg"] = requestHandlers.profilePicture;
 handle["/img/bristollogo.png"] = requestHandlers.bristollogo;
 handle["/img/defaultprofile.png"] = requestHandlers.defaultprofile;

 for(var i = 1; i <= 300; i++){
 	handle["/img/faces/" + i + ".jpg"] = requestHandlers.i2;
 }
 handle["/img/faces/2.jpg"] = requestHandlers.i2;

server.index(router.route, handle);