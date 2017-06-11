	// Run a node.js web server for local development of a static web site.
	// Start with "node server.js" and put pages in a "public" sub-folder.
	// Visit the site at the address printed on the console.

	// The server is configured to be platform independent.  URLs are made lower
	// case, so the server is case insensitive even on Linux, and paths containing
	// upper case letters are banned so that the file system is treated as case
	// sensitive even on Windows.

	// Load the library modules, and define the global constants.
	// See http://en.wikipedia.org/wiki/List_of_HTTP_status_codes.
	// Start the server: change the port to the default 80, if there are no
	// privilege issues and port number 80 isn't already in use.

	var http = require("http");
	var url = require("url");
	var OK = 200, NotFound = 404, Error = 500, port = 8080;

	//Start the http service. Accept only requests from localhost, for security.
	function index(route, handle) {
    	
		function onRequest(request, response) {
			 var lowerUrl = request.url.toLowerCase();

			 var postData = "";
			 var pathname = url.parse(lowerUrl).pathname;

			 console.log("Request for " + pathname + " is received.");
			 
			 request.setEncoding("utf8");			 
			 request.addListener("data", function(postDataChunk) {
			 postData += postDataChunk;
			 console.log("Received POST data chunk '"+
			 postDataChunk + "'.");
	 		});

			request.addListener("end", function() {
		 	route(handle, pathname, response, postData);
	 		});
	 
	 	}

	 http.createServer(onRequest).listen(port, "localhost");
	 var address = "http://localhost";
	 if (port != 80) address = address + ":" + port;
     console.log("Server running at", address);
	}

	exports.index = index;

	
