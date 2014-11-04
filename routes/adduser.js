 /* 
  * Title : Bend it like Bluemix and MongoDB
 * Description: A Bluemix application using  MongoDB using Autoscaling policy. This application demonstrates
 *              the elastic nature of the Bluemix PaaScloud
 * Developed by: Tinniam V Ganesh
 * Date: 04 Nov 2014
 * File: adduser.js
 */

var mongodb = require('mongodb');
var async = require('async');

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
    // Set up the DB connection
    var MongoClient = mongodb.MongoClient;
	var db= MongoClient.connect(mongo.url, function(err, db) {
	  if(err) {
	    console.log("Failed to connect to the database");
	    return; // Return immediately
	  } else {
	    console.log("Connected to MongoDB");
	  }
	  
    // Get our form values. These rely on the "name" attributes
    var FirstName = req.body.firstname;
    var LastName = req.body.lastname;
    var Mobile = req.body.mobile;
  
    // Set our collection
    var collection = db.collection('phonebook');
    
    // Use the async module to perform the operations sequentially
    async.series([
	                
	                function(callback)
	                { 
	                	collection = db.collection('phonebook', function(error, response) {
	              	      if( error ) {
	              	          console.log(error + "  Could not connect to database-1")
	              	          return; // Return immediately
	              	          
	              	       }
	              	       else {
	              	          console.log("Connected to phonebook");
	              	       }
	                	});
	                	callback(null, 'one');
	              	    
	                },
	                function(callback)
	                {
	                	// Insert the record into the DB
	                	collection.insert({
	                        "FirstName" : FirstName,
	                        "LastName" : LastName,
	                        "Mobile" : Mobile
	                    }, function (err, doc) {
	                        if (err) {
	                            // If it failed, return error
	                            res.send("There was a problem adding the information to the database.");
	                        }
	                        else {
	                        	console.log("Done")
	                            // If it worked, redirect to userlist - Display users
	                            res.location("userlist");
	                            // And forward to success page
	                            res.redirect("userlist");
	                           
	                            
	                        }
	                    });	                	
	                	
	                	collection.find().toArray(function(err, items) {
	            	    	console.log("**************************>>>>>>>Length =" + items.length);
	            	    	db.close(); // Make sure that the open DB connection is closed.
	            	        
	            	    });
	                	 
	                	 callback(null, 'two');
	                }
	               
	             ]);

  }); // end MongoClient.connect
};
