/*\
title: $:/plugins/alvsan/semantic/js/loadViews
type: application/javascript
module-type: startup
Semantic processing
\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

// Export name and synchronous status
exports.name = "loadviews";
exports.platforms = ["browser"];
exports.after = ["loadNodes"];
exports.synchronous = true;

exports.startup = function(callback) {
	
	// create a new view
	/*
	var myView = new $tm.ViewAbstraction("Snomed Ct",{ isCreate: true})
			
	var vistasNodos = $tw.wiki.filterTiddlers("[newView[true]]")
	
	vistasNodos.forEach( function(newNode){


		var nodeId = $tm.adapter.getId(newNode);
		var node = $tm.adapter.selectNodeById(nodeId);

	    var newView = new $tm.ViewAbstraction(node.label,{ isCreate: true});
		var nodosvista = myView.getNodeData();

	    //var nodeId = $tm.adapter.getId(newNode);
	    
		nodosvista[nodeId]['open-view'] = newNode;
		myView.saveNodeData(nodosvista);
	});

	//myView.setConfig({physics_mode: true, "field.nodeLabel": "label"});

	myView.setConfig({physics_mode: true});
	*/

};

})();

		//var node = { label: newNode. };

		//var obj = Object.assign(newNode,
		//Obtengo el tiddly correspondiente
		

//////////////////////////////////////////////////////////////////////////////////
		//$tm.adapter.insertNode( $tw.wiki.getTiddler(newNode) , myView);
		//var newView = new $tm.ViewAbstraction(newNode,{ isCreate: true});
///////////////////////////////////////////////////////////////////////////////////
		//var options = { view: myView };
		//if ( !$tm.ViewAbstraction.exists("Snomed Ct","ya venimos") ){
		
		//}




		//var elnodo = $tw.wiki.getTiddler(newNode);
		//var node = $tm.adapter.makeNode( elnodo , {}); 
		//$tm.adapter.insertNode( node , myView);

		//myView.addNode($tw.wiki.getTiddler(newNode));

	// 	nodes = newNode.nodes;
	// 	for (key in nodes) {
	// -		nodes[key]
	// 	 };

    


