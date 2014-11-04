/* 
  * Title : Bend it like Bluemix and MongoDB
 * Description: A Bluemix application using  MongoDB using Autoscaling policy. This application demonstrates
 *              the elastic nature of the Bluemix PaaScloud
 * Developed by: Tinniam V Ganesh
 * Date: 04 Nov 2014
 * File: index.js
 */
exports.index = function(req, res){
  res.render('index', { title: 'A Bluemix app with Node Express & Mongo' });
};

