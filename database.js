
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('../WinterHugWebTechCW/WinterHug.db');

function authentication(un, pass, callback) {
  "use strict"
	var flag = 0;
	db.serialize(function () {

  		db.all("SELECT COUNT(userID) AS population FROM user WHERE username = '" + un + "' AND password = '" + pass + "'", function (err, row) {
  			if (err){
  				throw err;
  			}else{
  				if(row[0].population == 1){
  					flag = 1;
  					callback(flag);
  				}else{
  					flag = 0;
  					callback(flag);
  				}
  			}
  		}); 
	});
 }

function blogEntry(topic, text, image, callback){
  "use strict"
  var flag = 0;
  db.serialize(function () {
      db.all("INSERT INTO blogs (title, content, date, imageName) VALUES(\'"+ topic + "\', \'" + text + "\',\'" + Date() + "\',\'" + image + "\')", function (err) {
        if (err){
          console.log(err);
          throw err;
        }else{
          callback(flag);
        }
      }); 
  });
}

function blogdataretrieval(callback){
  "use strict"
  var flag = 0;
  db.serialize(function () {
      db.all("SELECT * FROM blogs LIMIT 3", function (err, row) {
        if (err){
          console.log(err);
          throw err;
        }else{
          callback(row);
        }
      }); 
  });
}
 
 exports.authentication = authentication;
 exports.blogEntry = blogEntry;
 exports.blogdataretrieval = blogdataretrieval;