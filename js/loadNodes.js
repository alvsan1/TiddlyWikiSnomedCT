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


		function newNodeView(title,label,description, tags){
			var nodeId = $tm.adapter.getId(title);
			var node;

			if ( typeof  nodeId === "undefined" ) {
				var nodeView = { label: label, 
								 title: title ,
								 know: true,
								 description: description ,
								 text: $tw.wiki.getTiddler("$:/linekedhealth/concept_view").fields.text , 
								 term: "",				
								 tags: tags,				 
								 state: "$:/state/" + title ,
								 default: "$(currentTiddler)"

								};
				
				$tw.wiki.addTiddler(nodeView);
				nodeId = $tm.adapter.assignId(title);
				node = $tm.adapter.selectNodeById(nodeId);
				node.x = 0;
				node.y = 0;


				var newView = new $tm.ViewAbstraction( label, { isCreate: true});
				newView.setConfig({physics_mode: true, know: true, url: title });


				newView.addNode( node );
				newView.addPlaceholder( node );
				newView.saveNodePosition(node);
				
			}else {
				node = $tm.adapter.selectNodeById(nodeId);
			}

			return node;
		}

		
		var vistasL2 = $tw.wiki.filterTiddlers("[newkn[true]]");
		vistasL2.forEach( function (nodeName) {
			
			//$tw.wiki.setText(nodeName,"tags",0,"[]","");


			var know = $tw.wiki.getTiddlerAsJson(nodeName);
			$tw.wiki.deleteTiddler(nodeName);

			//Generalizarlo para cualquier repo
			//var config = JSON.parse($tw.wiki.getTiddlerAsJson("SnomedCT Config"));
			var oelement = nodeName.replace("Kn__","");
			if ( JSON.parse($tw.wiki.getTiddlerAsJson(oelement)).know === "true" ){
				$tw.wiki.setText(oelement,"know",0,"false","");

				var nodeOId = $tm.adapter.getId(oelement);
				var myViewName = JSON.parse($tw.wiki.getTiddlerAsJson(oelement)).label ;
				var myView = new $tm.ViewAbstraction( myViewName );
				

				JSON.parse(JSON.parse(know).concepts).forEach( function(ct){
						//Indentifico el nodo que incorpora conocimiento
					
					//var selement = ct.oproperty.value;
					if 	(typeof ct.list != "undefined"){
						var nodeId = $tm.adapter.getId(ct.oproperty.value);

						if ( typeof  nodeId === "undefined" ) {
							var nodeView = { label: ct.olabel.value, 
											 title: ct.oproperty.value ,
											 know: true, 									  
											 text: $tw.wiki.getTiddler("$:/linekedhealth/concept_view").fields.text , 
											 term: "",								 
											 state: "$:/state/" + ct.oproperty.value,
											 default: "$(currentTiddler)"

											};
							
							$tw.wiki.addTiddler(nodeView);
							nodeId = $tm.adapter.assignId(ct.oproperty.value);
							var node = $tm.adapter.selectNodeById(nodeId);

							var newView = new $tm.ViewAbstraction(node.label,{ isCreate: true});
							newView.setConfig({physics_mode: true, know: true, url: ct.oproperty.value });

							newView.addNode( node );
							newView.addPlaceholder( node );
							newView.saveNodePosition(node);							

		    //var nodeId = $tm.adapter.getId(newNode);  					


						}


						var nodeOVId = $tm.adapter.getId(ct.ovalor.value);

						if ( typeof  nodeOVId === "undefined" ) {
							var nodeView = { description: ct.ovdescription.value, 
											 title: ct.ovalor.value , 
											 know: true,
											 text: $tw.wiki.getTiddler("$:/linekedhealth/concept_view").fields.text , 
											 term: "",
											 label: ct.ovlabel.value,								 
											 state: "$:/state/" + ct.ovalor.value,
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
										 //text: $tw.wiki.getTiddler("$:/linekedhealth/property_view").fields.text,
										 default: "$(currentTiddler)",
										 tags: [oelement]
										};

						$tw.wiki.addTiddler(nodeList);
					} else if ((typeof ct.oconcept != "undefined") && ( typeof ct.odescription != "undefined" ) ) {
						var nodeId = $tm.adapter.getId(ct.oconcept.value);

						if ( typeof  nodeId === "undefined" ) {
							var nodeView = { label: ct.olabel.value, 
											 title: ct.oconcept.value ,
											 know: true,
											 description: ct.odescription.value ,									  
											 text: $tw.wiki.getTiddler("$:/linekedhealth/concept_view").fields.text , 
											 term: "",								 
											 state: "$:/state/" + ct.oconcept.value ,
											 default: "$(currentTiddler)"

											};
							
							$tw.wiki.addTiddler(nodeView);
							nodeId = $tm.adapter.assignId(ct.oconcept.value);
							
						}

						var node = $tm.adapter.selectNodeById(nodeId);
						node.x = 0;
						node.y = 0;

						myView.addNode( node );
						myView.addPlaceholder( node );
						myView.saveNodePosition(node);

						var newView = new $tm.ViewAbstraction(ct.olabel.value,{ isCreate: true});
						newView.setConfig({physics_mode: true, know: true, url: ct.oconcept.value });


						newView.addNode( node );
						newView.addPlaceholder( node );
						newView.saveNodePosition(node);

						
						

						var nodosvista = myView.getNodeData();
						nodosvista[nodeId]['open-view'] = ct.olabel.value;
						myView.saveNodeData(nodosvista);

						//var edgeId = $tm.adapter.getId("rdfs:subClassOf");
						/*if ( typeof  edgeId === "undefined" ) {

						}*/
						
						

						var toWL = [];
						toWL[oelement] = true;
						var typeWL = [];
						typeWL["rdfs:subClassOf"] = true;
						var listE = $tm.adapter.getEdges( ct.oconcept.value ,toWL, typeWL);



						if ( Object.keys(listE).length == 0 ) {
							//var edgeLabel = ct.property.value.replace(/.*#(.*)/g,"$1");
							//var edge = { from: nodeOId, to: nodeId, label: edgeLabel, type: ct.property.value};
							var edge = { from: nodeId, to: nodeOId, label: "subClassOf", type: "rdfs:subClassOf"};
							$tw.wiki.addTiddler(edge);
							$tm.adapter.insertEdge(edge);

						}

					} else if ((typeof ct.oconcept != "undefined") && ( typeof ct.ovalor != "undefined" ) ) {

						newNodeView( ct.property.value, ct.label.value , ct.description.value, null);
						newNodeView( ct.ovalor.value, ct.ovlabel.value , ct.ovdescription.value, null);

						var nodeSentence = { title: ct.oconcept.value,
										 property: ct.property.value, 
										 ovalor: ct.ovalor.value,
										 state: "$:/state/" + ct.oconcept.value,  
										 //text: $tw.wiki.getTiddler("$:/linekedhealth/property_view").fields.text,
										 default: "$(currentTiddler)",
										 tags: [oelement]
										};
						$tw.wiki.addTiddler(nodeSentence);






						/*
						var nodeId = $tm.adapter.getId(ct.oconcept.value);
						var node;

						if ( typeof  nodeId === "undefined" ) {
							var nodeView = { label: ct.label.value, 
											 title: ct.oconcept.value ,
											 know: true,
											 description: ct.description.value ,									  
											 text: $tw.wiki.getTiddler("$:/linekedhealth/concept_view").fields.text , 
											 term: "",								 
											 state: "$:/state/" + ct.oconcept.value ,
											 default: "$(currentTiddler)"

											};
							
							$tw.wiki.addTiddler(nodeView);
							nodeId = $tm.adapter.assignId(ct.oconcept.value);
							node = $tm.adapter.selectNodeById(nodeId);
							node.x = 0;
							node.y = 0;


							var newView = new $tm.ViewAbstraction(ct.label.value,{ isCreate: true});
							newView.setConfig({physics_mode: true, know: true, url: ct.oconcept.value });


							newView.addNode( node );
							newView.addPlaceholder( node );
							newView.saveNodePosition(node);
							
						}else {
							node = $tm.adapter.selectNodeById(nodeId);
						}
///NO///////////////////////////////
						/*
						node.x = 0;
						node.y = 0;

						myView.addNode( node );
						myView.addPlaceholder( node );
						myView.saveNodePosition(node);											

						var nodosvista = myView.getNodeData();
						nodosvista[nodeId]['open-view'] = ct.label.value;
						myView.saveNodeData(nodosvista);*/
/////////////////////////////////
						//var edgeId = $tm.adapter.getId("rdfs:subClassOf");
						/*if ( typeof  edgeId === "undefined" ) {

						}*/
						
						/*

						var toWL = [];
						toWL[oelement] = true;
						var typeWL = [];
						typeWL["rdfs:subClassOf"] = true;
						var listE = $tm.adapter.getEdges( ct.oconcept.value ,toWL, typeWL);



						if ( Object.keys(listE).length == 0 ) {
							//var edgeLabel = ct.property.value.replace(/.*#(.*)/g,"$1");
							//var edge = { from: nodeOId, to: nodeId, label: edgeLabel, type: ct.property.value};
							var edge = { from: nodeId, to: nodeOId, label: "subClassOf", type: "rdfs:subClassOf"};
							$tw.wiki.addTiddler(edge);
							$tm.adapter.insertEdge(edge);

						}

*/

////////////////////////////////////////////////////////////////////////////////////////////////





					} else if ( typeof ct.label != "undefined" )  {

						var nodeId = $tm.adapter.getId(ct.oconcept.value);
						var node;

						if ( typeof  nodeId === "undefined" ) {
							var nodeView = { label: ct.label.value, 
											 title: ct.oconcept.value ,
											 know: true,
											 description: ct.description.value ,									  
											 text: $tw.wiki.getTiddler("$:/linekedhealth/concept_view").fields.text , 
											 term: "",								 
											 state: "$:/state/" + ct.oconcept.value ,
											 default: "$(currentTiddler)"

											};
							
							$tw.wiki.addTiddler(nodeView);
							nodeId = $tm.adapter.assignId(ct.oconcept.value);

							var newView = new $tm.ViewAbstraction(ct.label.value,{ isCreate: true});
							newView.setConfig({physics_mode: true, know: true, url: ct.oconcept.value });

							node = $tm.adapter.selectNodeById(nodeId);
							node.x = 0;
							node.y = 0;


							newView.addNode( node );
							newView.addPlaceholder( node );
							newView.saveNodePosition(node);							
						}

						node = $tm.adapter.selectNodeById(nodeId);
						node.x = 0;
						node.y = 0;

						myView.addNode( node );
						myView.addPlaceholder( node );
						myView.saveNodePosition(node);
	
						

						var nodosvista = myView.getNodeData();
						nodosvista[nodeId]['open-view'] = ct.label.value;
						myView.saveNodeData(nodosvista);

						//var edgeId = $tm.adapter.getId("rdfs:subClassOf");
						/*if ( typeof  edgeId === "undefined" ) {

						}*/
						
						var toWL = [];
						toWL[ct.oconcept.value] = true;
						var typeWL = [];
						typeWL["rdfs:subClassOf"] = true;
						var listE = $tm.adapter.getEdges( oelement ,toWL, typeWL);


						if ( Object.keys(listE).length == 0 ) {
							//var edgeLabel = ct.property.value.replace(/.*#(.*)/g,"$1");
							//var edge = { from: nodeOId, to: nodeId, label: edgeLabel, type: ct.property.value};
							var edge = { from: nodeOId, to: nodeId, label: "subClassOf", type: "rdfs:subClassOf"};
							$tw.wiki.addTiddler(edge);
							$tm.adapter.insertEdge(edge);
						}








					} else if ( typeof ct.oconcept != "undefined" )  {
						var parameter = ct.property.value.replace(/.*\.(.*)/g,"$1");
						var ps = JSON.parse($tw.wiki.getTiddlerAsJson(oelement));


						var vparameter = "" ;
						if (typeof ps[parameter] != "undefined"){
							vparameter += ps[parameter];							
						}

						vparameter += "# " + ct.oconcept.value + " <br>";
						$tw.wiki.setText(oelement,parameter,0,vparameter,"");

					}



				});
			}			
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
								 know: true,
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
						var nodeP = { title: oconcept, know: true };
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


