/*\
title: $:/plugins/alvsan/linkedhealth/js/lhmacro
type: application/javascript
module-type: startup
Semantic processing
\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

// Export name and synchronous status
exports.name = "lhmacro";
exports.platforms = ["node"];
exports.after = ["story"];
exports.synchronous = true;

exports.startup = function(callback) {
	

	//Extraer estos datos de tiddlies
	var nodeStart = {title: "SnomedCT Config", rdfStorage: "http://10.0.3.15:8080/rdf4j-server/repositories/snomed02", snomedCTURI: "http://snomed.info/id/138875005" };
	$tw.wiki.addTiddler(nodeStart);



	// On the server, start a commander with the command line arguments
	/*var commander = new $tw.Commander(
		$tw.boot.argv,
		function(err) {
			if(err) {
				return $tw.utils.error("Error: " + err);
			}
			callback();
		},
		$tw.wiki,
		{output: process.stdout, error: process.stderr}
	);
	commander.execute();*/
	// create a new view
	//var myView = new $tm.ViewAbstraction("Snomed Ct",{ isCreate: true})


	// insert a node in this view
	//var node = { label: "ya venimos" };
	//var options = { view: myView };
	//if ( !$tm.ViewAbstraction.exists("Snomed Ct","ya venimos") ){
	//	$tm.adapter.insertNode(node, myView);
	//}


	//$tw.wiki.filterTiddlers("[newView[true]]");




};

})();