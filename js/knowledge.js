/*\
title: $:/plugins/alvsan/semantic/knowledge.js
type: application/javascript
module-type: startup

\*/


( function(){ 

"use strict";

exports.name = "knowledge";
exports.platforms = ["node"];
exports.after = ["lhmacro"];
exports.synchronous = true;

exports.startup = function(callback) {
	
	var Client = require("node-rest-client").Client;
	var client = new Client();

	var args = {
	    headers: { "Accept": "application/sparql-results+json, */*;q=0.5" } // request headers 
	};

	//client.get("http://10.0.3.15:8080/rdf4j-server/repositories/snomed02?query=prefix%20rdfs%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0Aprefix%20scti%3A%20%3Chttp%3A%2F%2Fsnomed.info%2Fid%2F%3E%0Aselect%20%3Fconcept%0Awhere%20%7B%20%3Fconcept%20rdfs%3AsubClassOf%20scti%3A138875005%20%7D",args, function (data, response) {
    


    var config = JSON.parse($tw.wiki.getTiddlerAsJson("SnomedCT Config"));

    //client.get("http://10.0.3.15:8080/rdf4j-server/repositories/snomed02?query=PREFIX+rdfs%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0APREFIX+sctf%3A+%3Chttp%3A%2F%2Fsnomed.info%2Ffield%2F%3E%0APREFIX+scti%3A+%3Chttp%3A%2F%2Fsnomed.info%2Fid%2F%3E%0ASelect+%3Fconcept+%3Fdescription%0Awhere+%7B+%3Fconcept+sctf%3ADescription.term.en-us.preferred+%3Fdescription+.%0A++++++++%3Fconcept+rdfs%3AsubClassOf+scti%3A138875005+++%7D",args, function (data, response) {
	//client.get(config.rdfstorage + "?query=" + encodeURIComponent($tw.wiki.getTiddler("$:/linekedhealth/snomedct_l1_v1").fields.text),args, function (data, response) {	
	client.get("http://10.0.3.15:8080/rdf4j-server/repositories/snomed02?query=" + encodeURIComponent($tw.wiki.getTiddler("$:/linekedhealth/snomedct_l1_v1").fields.text),args, function (data, response) {	

    // parsed response body as js object 
    //console.log(JSON.parse(data));
    // raw response 
    //var nodeView = {title: config.snomedCTURI ,label: "SnomedCT", concepts: JSON.stringify(JSON.parse(data).results.bindings), newView: true };
    var nodeView = {title: "SnomedCT", concepts: JSON.stringify(JSON.parse(data).results.bindings), newView: true };
	$tw.wiki.addTiddler(nodeView);
    
    //Pensar en un arranque mas General desde un tiddly
    var nodeSnCT = {title: config.snomedCTURI ,label: "SnomedCT"};    
	$tw.wiki.addTiddler(nodeSnCT);



	$tw.wiki.addEventListener("change",function(changes) {
		/*console.log("---------------------------------------------/n");
		JSON.parse(JSON.stringify(changes)).forEach( function (nodeName) {
		console.log(JSON.parse(JSON.stringify(changes))["SnomedCT"]);
		}
		console.log("---------------------------------------------/n");
*/		
		if ( JSON.parse(JSON.stringify(changes))["$:/plugins/felixhayashi/tiddlymap/misc/defaultViewHolder"] ){
			console.log("-----------------Actualizando----------------------/n");
			var vistName = $tw.wiki.getTiddler("$:/plugins/felixhayashi/tiddlymap/misc/defaultViewHolder").fields.text;
			//console.log(vistName);
			//console.log("---------------------------------------------/n");
			var vista = $tw.wiki.getTiddlerAsJson("$:/plugins/felixhayashi/tiddlymap/graph/views/" + vistName);
			//console.log(JSON.parse(vista)['config.know'] == "true"  );
			//console.log(JSON.parse(vista)['config.url']);
			
			console.log("-----------------Actualizando----------------------/n");
			if (JSON.parse(vista)['config.know'] == "true" ) {
				$tw.wiki.setText("$:/plugins/felixhayashi/tiddlymap/graph/views/" + vistName,"config.know",0,false,"");
				var queryKw = $tw.wiki.getTiddler("$:/linekedhealth/snomedct_l1_v2").fields.text.replace(/##snomedCT##/g,"<"+JSON.parse(vista)['config.url']+">");
				console.log(queryKw);
				client.get("http://10.0.3.15:8080/rdf4j-server/repositories/snomed02?query=" + encodeURIComponent(queryKw),args, function (dataV, responseV) {	
					console.log("-----------------2Do nivel----------------------/n");
					
					console.log("-----------------JSON.parse(dataV).results.bindings----------------------/n");
					console.log(JSON.parse(dataV).results.bindings);

					console.log("-----------------JSON.parse(dataV).results.bindings----------------------/n");					
					console.log(JSON.stringify(JSON.parse(dataV).results.bindings));

					console.log("-----------------2Do nivel----------------------/n");
					var nodeKw = { title: "Kn__" + JSON.parse(vista)['config.url'] , concepts: JSON.stringify(JSON.parse(dataV).results.bindings), newkn: true };
					$tw.wiki.addTiddler(nodeKw);
    

    				//SI NO SE REQUIERE ACUTALIZACION MEJORA EL USO DE LA HERRAMIENTA
					console.log("-----------------Fin 2do nivel----------------------/n");
				});
			}

			console.log("-----------------Fin Actualizando----------------------/n");
			
			//JSON.parse(vista)['config.url']

			//var query = $tw.wiki.getTiddler("$:/linekedhealth/snomedct_l1_v2").fields.text;
			/*
			client.get("http://192.168.56.1:8080/rdf4j-workbench/repositories/snomed02/explore?resource=%3Chttp%3A%2F%2Fsnomed.info%2Fid%2F123038009%3E",args, function (data, response) {	
				console.log(data);

			});

			
			console.log("----------------------------------------------/n");
		
			if ( JSON.parse($tw.wiki.getTiddlerAsJson(val)).know == "true" ){
				console.log("-----------------Knowledge----------------------/n");
				console.log(JSON.parse($tw.wiki.getTiddlerAsJson(val)).know);
			}
		*/

		}
		



/*		console.log("-----------------Actualizando----------------------/n");
		for (var val in JSON.parse(JSON.stringify(changes))){
			
			if ( JSON.parse($tw.wiki.getTiddlerAsJson(val)).know == "true" ){
				console.log("-----------------Knowledge----------------------/n");
				console.log(JSON.parse($tw.wiki.getTiddlerAsJson(val)).know);
			}


		}
		console.log("---------------------------------------------/n");
*/


	});

///////////////////////////////////////////////////////////////////////////////
/*
	    JSON.parse(data).results.bindings.forEach( function(ct){ 
	        //console.log(ct);


	        var nodeView = { label: ct.description.value, title: ct.concept.value, newView: true };
	    	$tw.wiki.addTiddler(nodeView);	    	

	    });
*/

///////////////////////////////////////////////////////////////////////////////

	    // JSON.parse(data).results.bindings.forEach( function(concept){ 
	    //     console.log(concept);

	    //     var nodeView = { label: concept.description.value, title: concept.description.value };
	    // 	nodes.push(nodeView)

	    // });

	    // var newViews = {title: "Snomed CT", nodes: nodes, newView: true}
	    // $tw.wiki.addTiddler(newViews);
	    


	        
	});
}


})();

