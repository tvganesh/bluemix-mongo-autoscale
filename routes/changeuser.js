/* 
  * Title : Bend it like Bluemix and MongoDB
 * Description: A Bluemix application using  MongoDB using Autoscaling policy. This application demonstrates
 *              the elastic nature of the Bluemix PaaScloud
 * Developed by: Tinniam V Ganesh
 * Date: 04 Nov 2014
 * File: changeuser.js
 */
exports.list = function(req, res){
  res.render('changeuser', { title: 'Update User'});
};
