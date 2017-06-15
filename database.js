
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('../SurveyWebsite/survey.db');

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

 
 exports.authentication = authentication;