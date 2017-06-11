var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
 handle["/"] = requestHandlers.index;
 handle["/index.html"] = requestHandlers.index;

 handle["/css/style.css"] = requestHandlers.style;

 handle["/img/vishalyadav.jpg"] = requestHandlers.profilePicture;
 handle["/img/bristollogo.png"] = requestHandlers.bristollogo;
server.index(router.route, handle);