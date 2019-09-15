sap.ui.define([
		"sap/ui/core/mvc/Controller",
		"sap/m/MessageToast",
		"sap/m/MessageBox"
	],
	function (Controller, MT, MessageBox) {
		"use strict";

		return Controller.extend("ovly.fiori_79.cadastroalunos.controller.View1", {
			onInit: function () {

			},

			onEdit: function (oControlEvent) {
				alert("Edit");
			},
			
			// @type sap.ui.base.Event
			onDelete: function(oEvent){
				var oParameters = oEvent.getParameters();
				var oListItem = oParameters.listItem; // NAO EH UMA FUNCAO
				// var sId = oListItem.getInfo();
				
				// @type sap.ui.model.Context
				var oContext = oListItem.getBindingContext();
				var sId = oContext.getProperty("Id");
				
				// console.log("Deletando " + sId);
				
				// @type sap.ui.model.odata.v2.ODataModel
				var oDataModel = this.getView().getModel();
				
				var sPath = oDataModel.createKey("Students", { Id: sId });
				
				function onSuccess(){
					MT.show("Aluno deletado");
				}
				
				function onError(oError){
					var sMessage = JSON.parse(oError.responseText).error.message.value;
					MessageBox.error(sMessage);
				}
				
				var mParameters = {
					success: onSuccess,
					error: onError
				};
				
				oDataModel.remove("/" + sPath, mParameters);
				 
			},

			onCreate: function (oControlEvent) {
				var oInputFirstName = this.byId("first_name");
				var sFirstName = oInputFirstName.getValue();

				var oInputLastName = this.byId("last_name");
				var sLastName = oInputLastName.getValue();

				var oAluno = {
					FirstName: sFirstName,
					LastName: sLastName,
					ToSkills: [ ]
				};

				// console.log(oAluno);
				
				var oDataModel = this.getView().getModel();
				var sPath = "/Students";
				
				
				function onSuccess(oNovoAluno){
					MT.show("Aluno " + oNovoAluno.Id + " criado");
				}
				
				function onError(oError){
					var sMessage = JSON.parse(oError.responseText).error.message.value;
					MessageBox.error(sMessage);
				}
				
				var mParameters = {
					success: onSuccess,
					error: onError
				};
				
				oDataModel.create(sPath, oAluno, mParameters);
				
				
			}

		});
	});
	
	
	
	
	
	
	
	
	