sap.ui.define([
		"sap/ui/core/mvc/Controller"
	],
	function (Controller) {
		"use strict";

		return Controller.extend("ovly.fiori_79.cadastroalunos.controller.View1", {
			onInit: function () {

			},

			onEdit: function (oControlEvent) {
				alert("Edit");
			},
			
			onDelete: function(oEvent){
				var oParameters = oEvent.getParameters();
				var oListItem = oParameters.listItem; // NAO EH UMA FUNCAO
				var sId = oListItem.getInfo();
				
				console.log("Deletando " + sId);
			},

			onCreate: function (oControlEvent) {
				var oInputFirstName = this.byId("first_name");
				var sFirstName = oInputFirstName.getValue();

				var oInputLastName = this.byId("last_name");
				var sLastName = oInputLastName.getValue();

				var oAluno = {
					Nome: sFirstName,
					Sobrenome: sLastName
				};

				console.log(oAluno);
			}

		});
	});