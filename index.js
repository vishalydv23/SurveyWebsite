var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
 handle["/"] = requestHandlers.index;
 handle["/index.html"] = requestHandlers.index;
 handle["/form.html"] = requestHandlers.form;
 handle["/instruction.html"] = requestHandlers.instruction;

 handle["/css/style.css"] = requestHandlers.style;

 handle["/js/form.js"] = requestHandlers.scriptForm;

 handle["/img/vishalyadav.jpg"] = requestHandlers.profilePicture;
 handle["/img/bristollogo.png"] = requestHandlers.bristollogo;
server.index(router.route, handle);