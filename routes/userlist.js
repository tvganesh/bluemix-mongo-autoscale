/* 
  * Title : Bend it like Bluemix and MongoDB
 * Description: A Bluemix application using  MongoDB using Autoscaling policy. This application demonstrates
 *              the elastic nature of the Bluemix PaaScloud
 * Developed by: Tinniam V Ganesh
 * Date: 04 Nov 2014
 * File: userlist.js
 */
var mongodb = require('mongodb');
var async = require('async');

// Create a callback function
var mycallback = function(err,results) {
    console.log("mycallback");
    if(err) throw err;
};
/* GET Phone users page. */
exports.list =  function(req, res) {
	
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
	 };
	}
	
	var MongoClient = mongodb.MongoClient;
	var db= MongoClient.connect(mongo.url, function(err, db) {
	  if(err) {
	    console.log("failed to connect to the database");
	    return;// Return immediately
	  } else {
	    console.log("connected to database");
	  }
	
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
	                   	console.log("222");
	                	
	                   	// Display a random set of 5 records based on a regular expression made with random letter, number
	                	var randnum = Math.floor((Math.random() * 10) + 1);
	                	var alpha = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','X','Y','Z'];
	                	var randletter = alpha[Math.floor(Math.random() * alpha.length)];
                        console.log(randletter);
                        var val =  randletter + ".*" + randnum + ".*";	
                        
                        // Limit the display to 5 documents
                        var results = collection.find({"FirstName": new RegExp(val)}).limit(5).toArray(function(err, items){
	         	           if(err) {
	         			       console.log(err + " Error getting items for display");
	         			      
	         	           }
	         	           else {
	         			      //console.log(items);
	         			      res.render('userlist', 
	         					   { "userlist" : items
	         			        
	         			          }); // end res.render
	         	            } //end else
	         	          db.close(); // Ensure that the open connection is closed
	         	         }); // end toArray function
	                	
	                	callback(null, 'two');
	                }
	               
	             ]);
	  
	}); // end MongoClient.connect
}