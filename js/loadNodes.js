/*\
title: $:/plugins/alvsan/semantic/js/loadNodes
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
exports.name = "loadNodes";
exports.platforms = ["browser"];
exports.after = ["story"];
exports.synchronous = true;

exports.startup = function(callback) {
	
	// create a new view
	$tw.wiki.addEventListener("change",function(changes) {
		
		var vistasL2 = $tw.wiki.filterTiddlers("[newkn[true]]");
		vistasL2.forEach( function (nodeName) {
			var known = $tw.wiki.getTiddlerAsJson(nodeName);
			//Generalizarlo para cualquier repo
			//var config = JSON.parse($tw.wiki.getTiddlerAsJson("SnomedCT Config"));
			var oelement = nodeName.replace("Kn__","");
			JSON.parse(JSON.parse(known).concepts).forEach( function(ct){
					//Indentifico el nodo que incorpora conocimiento
				
				//var selement = ct.oproperty.value;

				var nodeId = $tm.adapter.getId(ct.oproperty.value);

				if ( typeof  nodeId === "undefined" ) {
					var nodeView = { label: ct.olabel.value, 
									 title: ct.oproperty.value ,									  
									 text: $tw.wiki.getTiddler("$:/linekedhealth/concept_view").fields.text , 
									 term: "",								 
									 state: "$:/state/" + ct.oproperty.value,
									 default: "$(currentTiddler)$_Summary"

									};
					
					$tw.wiki.addTiddler(nodeView);
					nodeId = $tm.adapter.assignId(ct.oproperty.value);
					var node = $tm.adapter.selectNodeById(nodeId);

					var newView = new $tm.ViewAbstraction(node.label,{ isCreate: true});
					newView.setConfig({physics_mode: true, know: true, url: ct.oproperty.value });

					newView.addNode( node );
					newView.addPlaceholder( node );
					newView.saveNodePosition(node);

				}


				var nodeOVId = $tm.adapter.getId(ct.ovalor.value);

				if ( typeof  nodeOVId === "undefined" ) {
					var nodeView = { description: ct.ovdescprition.value, 
									 title: ct.ovalor.value , 
									 text: $tw.wiki.getTiddler("$:/linekedhealth/concept_view").fields.text , 
									 term: "",
									 label: ct.ovlabel.value,								 
									 state: "$:/state/" + ct.oproperty.value,
									 default: "$(currentTiddler)$_Summary"

									};
					
					$tw.wiki.addTiddler(nodeView);

				}


				var nodeList = { title: ct.list.value,
								 description: ct.description.value,
								 property: ct.property.value, 
								 oproperty: ct.oproperty.value, 
								 ovalor: ct.ovalor.value,
								 state: "$:/state/" + ct.list.value,  
								 text: $tw.wiki.getTiddler("$:/linekedhealth/property_view").fields.text,
								 default: "$(currentTiddler)$_Summary",
								 tags: [oelement]
								};

				$tw.wiki.addTiddler(nodeList);
			});
			//$tw.wiki.deleteTiddler(nodeName);
		});


	});
		/*
			var nodeKn = JSON.parse(ct).label;			

			var myView = new $tm.ViewAbstraction(nodeKn.title,{ isCreate: true});
		
			
			var nodeId = $tm.adapter.getId(ct.concept.value);
			if ( typeof  nodeId === "undefined" ) {
				//var nodeView = { label: ct.description.value, title: ct.concept.value , };
				var nodeView = { label: ct.description.value, 
								 title: ct.concept.value , 
								 text: $tw.wiki.getTiddler("$:/linekedhealth/concept_view").fields.text , 
								 term: "",								 
								 state: "$:/state/" + ct.concept.value,
								 default: "$(currentTiddler)$_Summary"
								};
				$tw.wiki.addTiddler(nodeView);
				nodeId = $tm.adapter.assignId(ct.concept.value);
			}
			

			var node = $tm.adapter.selectNodeById(nodeId);
			myView.addNode( node );
			myView.addPlaceholder( node );
			node.x = 0;
			node.y = 0;
			myView.saveNodePosition(node);



			var newView = new $tm.ViewAbstraction(node.label,{ isCreate: true});
			newView.setConfig({physics_mode: true, know: true, url: ct.concept.value });


			var nodosvista = myView.getNodeData();

		    //var nodeId = $tm.adapter.getId(newNode);
		    
			nodosvista[nodeId]['open-view'] = ct.description.value;
			myView.saveNodeData(nodosvista);



////////////////////////////////////////


			});


//////////////////////////////////////

/*|!Field |!Description |
|title |By default, alert titles have the prefix `$:/temp/alerts/` |
|text |The text of the alert message |
|modified |Date of the alert (used for ordering the alerts on screen) |
|component |Component name associated with the alert |
|tags |Must include [[$:/tags/Alert]] |


		var noty = { title: "$:/temp/alerts/", text: "The text of the alert message"
		,  component: "Component name associated with the alert" ,
		tags: "Must include [[$:/tags/Alert]]" }
		$tw.wiki.addTiddler(noty);
*/

	
			
	var vistas = $tw.wiki.filterTiddlers("[newView[true]]");
	vistas.forEach( function (nodeName) {

		var nodeNew = $tw.wiki.getTiddlerAsJson(nodeName);
		//Generalizarlo para cualquier repo
		//var config = JSON.parse($tw.wiki.getTiddlerAsJson("SnomedCT Config"));
		var nodeJson = JSON.parse(nodeNew);
		var myView = new $tm.ViewAbstraction(nodeJson.title,{ isCreate: true});
		
		JSON.parse(nodeJson.concepts).forEach( function(ct){

			var nodeId = $tm.adapter.getId(ct.concept.value);
			//var nodeView;
			if ( typeof  nodeId === "undefined" ) {
				//var nodeView = { label: ct.description.value, title: ct.concept.value , };
				var nodeView = { label: ct.description.value, 
								 title: ct.concept.value , 
								 text: $tw.wiki.getTiddler("$:/linekedhealth/concept_view").fields.text , 
								 term: "",								 
								 state: "$:/state/" + ct.concept.value,
								 default: "$(currentTiddler)"
								};
				$tw.wiki.addTiddler(nodeView);
				nodeId = $tm.adapter.assignId(ct.concept.value);
			}
			

			var node = $tm.adapter.selectNodeById(nodeId);
			node.x = 0;
			node.y = 0;
			myView.addNode( node );
			myView.addPlaceholder( node );
			myView.saveNodePosition(node);

			var newView = new $tm.ViewAbstraction(ct.description.value,{ isCreate: true});
			newView.setConfig({physics_mode: true, know: true, url: ct.concept.value });

			newView.addNode( node );
			newView.addPlaceholder( node );
			newView.saveNodePosition(node);



			var nodosvista = myView.getNodeData();

		    //var nodeId = $tm.adapter.getId(newNode);
		    
			nodosvista[nodeId]['open-view'] = ct.description.value;
			myView.saveNodeData(nodosvista);


		
			if ( ct.property.value == "http://www.w3.org/2000/01/rdf-schema#subClassOf" ) {
				JSON.parse(ct.oconcepts.value).forEach( function( oconcept ){
					

					var nodePId = $tm.adapter.getId(oconcept);
					if ( typeof  nodePId === "undefined" ) {
						var nodeP = { title: oconcept };
						$tw.wiki.addTiddler(nodeP);
						var nodePId = $tm.adapter.assignId(oconcept);
					}

					var nodeObejet = $tm.adapter.selectNodeById(nodePId);
					myView.addNode( nodeObejet );
					myView.addPlaceholder( nodeObejet );
					nodeObejet.x = 0;
					nodeObejet.y = 0;
					myView.saveNodePosition(nodeObejet);

					var edgeId = $tm.adapter.getId("rdfs:subClassOf");
					if ( typeof  edgeId === "undefined" ) {

					}
					var edge = { from: nodeId, to: nodePId, label: "subClassOf", type: "rdfs:subClassOf"};
					$tw.wiki.addTiddler(edge)
					$tm.adapter.insertEdge(edge);
				});
			} else if ( ct.property.value == "http://snomed.info/field/TextDefinition.term" ) {
				var textterm = "";
				JSON.parse(ct.oconcepts.value).forEach( function( oconcept ){
					textterm += "# " + oconcept + " <br>";
				});
				$tw.wiki.setText(ct.concept.value,"term",0,textterm,"")
				//$tw.wiki.addTiddler( {title: ct.concept.value + "_term", text: textterm })
			}else if ( ct.property.value == "http://snomed.info/field/Description.term.en-us.synonym" ) {
				var synonym = "";
				JSON.parse(ct.oconcepts.value).forEach( function( oconcept ){
					synonym += "# " + oconcept + " <br>";
				});
				$tw.wiki.setText(ct.concept.value,"synonym",0,synonym,"")
			}else if ( ct.property.value == "http://www.w3.org/2000/01/rdf-schema#label" ) {
				var textterm = "";
				JSON.parse(ct.oconcepts.value).forEach( function( oconcept ){
					textterm += "# " + oconcept + " <br>";
				});
				$tw.wiki.setText(ct.concept.value,"labelNd",0,textterm,"")
			}



	/////////////////////////////////////////////
	/*
		    //console.log(newNode);
		    var id = 
		  	var nodeId = $tm.adapter.getId(newNode);
		    //console.log(nodeId);
				// 
				//if ( typeof  nodeId === "undefined" ) {
			var node = $tm.adapter.selectNodeById(nodeId);
			myView.addNode( node );
			myView.addPlaceholder( node );
			node.x = 0;
			node.y = 0;
			myView.saveNodePosition(node);

				
				//}
			//myView.update({});
	*/
		});

		myView.setConfig({physics_mode: true});

		$tw.wiki.deleteTiddler(nodeName);

	});

};

})();