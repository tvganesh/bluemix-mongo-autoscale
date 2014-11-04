/* 
  * Title : Bend it like Bluemix and MongoDB
 * Description: A Bluemix application using  MongoDB using Autoscaling policy. This application demonstrates
 *              the elastic nature of the Bluemix PaaScloud
 * Developed by: Tinniam V Ganesh
 * Date: 04 Nov 2014
 * File: updateuser.js
 */
var mongodb = require('mongodb');

/* POST to Add User Service */
exports.list = function(req, res) {
	if (process.env.VCAP_SERVICES) {
		  var env = JSON.parse(process.env.VCAP_SERVICES);
		  if (env['mongodb-2.2']) {
			var mongo = env['mongodb-2.2'][0]['credentials'];
		  }
		} else {
			   var mongo = {
			      "username" : "user1",
			      "password" : "secret",
			      "url" : "mongodb://user1:secret@localhost:27017/test"
		 }
	}
    // Set our internal DB variable
    var MongoClient = mongodb.MongoClient;
	var db= MongoClient.connect(mongo.url, function(err, db) {
	  if(err) {
	    console.log("Failed to connect to the database");
	  } else {
	    console.log("Connected to database");
	  }
    // Get our form values. These rely on the "name" attributes
	    var FirstName = req.body.firstname;
	    var LastName = req.body.lastname;
	    var Mobile = req.body.mobile;
   
    // Set our collection
    var collection = db.collection('phonebook');

    // Update the DB with the new values. Note the setting 2 fields below
    collection.update({"FirstName" : FirstName},
    		{$set:{"LastName" : LastName},
    	     $set: {"Mobile" : Mobile}
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem updating the information to the database.");
        }
        else {
            // If it worked, redirect to display users
            res.location("userlist");
            // And forward to success page
            res.redirect("userlist");
        }
    });
	});
   
};
