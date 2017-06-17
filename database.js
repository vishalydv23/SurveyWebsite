
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('../SurveyWebsite/survey.db');

function authentication(pass, callback) {
  "use strict"
	var flag = 0;
	db.serialize(function () {

  		db.all("SELECT COUNT(*) AS population FROM user WHERE secretcode = '" + pass + "'", function (err, row) {
  			if (err){
  				throw err;
  			}else{
  				if(row[0].population == 0){
  					flag = 1;
  					callback(flag);
  				}else{
              db.all("SELECT age FROM user WHERE secretcode = '" + pass + "'", function (err, row) {
                if (err){
                  throw err;
                }else{
                    if(row[0].age == null){
                      flag = 2;
                      callback(flag);
                    }else{
                      flag = 3;
                      callback(flag);
                    }
                }
              });
  				}
  			}
  		}); 
	});
 }

function adduser(name, age, sex, ethnicity, password, callback1){
  "use strict"
  var flag = 0;
  db.serialize(function () {
      db.all("UPDATE user SET activity=\'Y\', name=\'" + name + "\', age=" + age + ", sex=\'" + sex + "\', ethnicity=\'" + ethnicity + "\' WHERE secretcode=" + password + " ", function (err) {
        if (err){
          throw err;
        }else{
          callback1(flag);
        }
      }); 
  });
}
 
 function addusertoscoretable(password, callback2){
  "use strict"
  var flag = 0;
  db.serialize(function () {
      db.all("ALTER TABLE score ADD COLUMN \'user" + password + "\' INTEGER", function (err) {
        if (err){
          throw err;
        }else{
          callback2(flag);
        }
      }); 
  });
}

function checkNumberOfImagesScored(password, callback3){
  "use strict"
  var flag = 0;
  db.serialize(function () {
      db.all("SELECT COUNT(user" + password + ") AS scoreCount FROM score", function (err, row) {
        if (err){
          throw err;
        }else{
          callback3(row[0].scoreCount);
        }
      }); 
  });
}

function addScore(imageno, iscore, password, callback4){
  "use strict"
  var flag = 0;
  db.serialize(function () {
      db.all("UPDATE score SET user" + password + "=" + iscore + " WHERE imageno=" + imageno+ "", function (err) {
        if (err){
          throw err;
        }else{
          callback3(flag);
        }
      }); 
  });
}

function checkType(imageno, callback5){
  "use strict"
  var flag = 0;
  db.serialize(function () {
      db.all("SELECT type FROM score WHERE imageno=" + imageno + "", function (err, row) {
        if (err){
          throw err;
        }else{
          callback5(row[0].type);
        }
      }); 
  });
}

 exports.authentication = authentication;
 exports.adduser = adduser;
 exports.addusertoscoretable = addusertoscoretable;
 exports.checkNumberOfImagesScored = checkNumberOfImagesScored;
 exports.addScore = addScore;
 exports.checkType = checkType;