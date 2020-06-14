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
exports.after = ["story_no"];
exports.synchronous = true;

exports.startup = function(callback) {
	

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

};

})();