sap.ui.define([
		"sap/ui/core/mvc/Controller",
		"sap/m/MessageToast",
		"sap/m/MessageBox",
		"sap/ui/model/Filter"
	],
	function (Controller, MT, MessageBox, Filter) {
		"use strict";

		return Controller.extend("ovly.fiori_79.cadastroalunos.controller.View1", {
			onInit: function () {

			},

			onSearch: function (oEvt) {

				// add filter for search
				var aFilters = [];
				var sQuery = oEvt.getSource().getValue();
				if (sQuery && sQuery.length > 0) {
					var filter = new Filter("UserName", sap.ui.model.FilterOperator.Contains, sQuery);
					aFilters.push(filter);
				}

				// update list binding
				var list = this.byId("list");
				var binding = list.getBinding("items");
				binding.filter(aFilters, "Application");

			},

			onItemPress: function (oEvent) {
				var oParameters = oEvent.getParameters();
				var oListItem = oParameters.listItem;
				var oContext = oListItem.getBindingContext();
				var oStudent = oContext.getObject();

				this._sSelectedId = oStudent.Id;

				var oInputFirstName = this.byId("first_name");
				oInputFirstName.setValue(oStudent.FirstName);

				var oInputLastName = this.byId("last_name");
				oInputLastName.setValue(oStudent.LastName);

				var oInputUserName = this.byId("user_name");
				oInputUserName.setValue(oStudent.UserName);

				var oDatePickerBirthDate = this.byId("birth_date");
				oDatePickerBirthDate.setDateValue(oStudent.BirthDate);

			},

			onEdit: function (oControlEvent) {
				if (!this._sSelectedId) {
					MT.show("Selecionar aluno na tabela");
					return;
				}
				var sStudentId = this._sSelectedId;
				this._sSelectedId = null;

				var oStudent = this._captureCommonFields(false);
				oStudent.Id = sStudentId;

				var oDataModel = this.getView().getModel();

				var sPath = "/" + oDataModel.createKey("Students", {
					Id: sStudentId
				});

				function onSuccess() {
					MT.show("Aluno atualizado");
				}

				function onError(oError) {
					var sMessage = JSON.parse(oError.responseText).error.message.value;
					MessageBox.error(sMessage);
				}

				var mParameters = {
					success: onSuccess,
					error: onError
				};

				oDataModel.update(sPath, oStudent, mParameters);

			},

			onDelete: function (oEvent) {
				var oParameters = oEvent.getParameters();
				var oListItem = oParameters.listItem; // NAO EH UMA FUNCAO
				// var sId = oListItem.getInfo();

				// @type sap.ui.model.Context
				var oContext = oListItem.getBindingContext();
				var sId = oContext.getProperty("Id");

				// console.log("Deletando " + sId);

				// @type sap.ui.model.odata.v2.ODataModel
				var oDataModel = this.getView().getModel();

				var sPath = oDataModel.createKey("Students", {
					Id: sId
				});

				function onSuccess() {
					MT.show("Aluno deletado");
				}

				function onError(oError) {
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
				var oStudent = this._captureCommonFields(false);

				// console.log(oStudent);

				var oDataModel = this.getView().getModel();
				var sPath = "/Students";

				function onSuccess(oNovoStudent) {
					MT.show("Aluno " + oNovoStudent.Id + " criado");
				}

				function onError(oError) {
					var sMessage = JSON.parse(oError.responseText).error.message.value;
					MessageBox.error(sMessage);
				}

				var mParameters = {
					success: onSuccess,
					error: onError
				};

				oDataModel.create(sPath, oStudent, mParameters);

			},

			onSave: function (oControlEvent) {

				var oStudent = this._captureCommonFields(true);

				if (this._sSelectedId) {
					oStudent.Id = this._sSelectedId;
					this._sSelectedId = null;
				}

				// console.log(oStudent);

				var oDataModel = this.getView().getModel();
				var sPath = "/Students";

				function onSuccess(oNovoStudent) {
					MT.show("Aluno " + oNovoStudent.Id + " criado");
				}

				function onError(oError) {
					var sMessage = JSON.parse(oError.responseText).error.message.value;
					MessageBox.error(sMessage);
				}

				var mParameters = {
					success: onSuccess,
					error: onError
				};

				oDataModel.create(sPath, oStudent, mParameters);

			},

			_captureCommonFields: function (bDeep) {

				var oInputFirstName = this.byId("first_name");
				var sFirstName = oInputFirstName.getValue();

				var oInputLastName = this.byId("last_name");
				var sLastName = oInputLastName.getValue();

				var oInputUserName = this.byId("user_name");
				var sUserName = oInputUserName.getValue();

				var oDatePickerBirthDate = this.byId("birth_date");
				var dBirthDate = oDatePickerBirthDate.getDateValue();

				var oStudent = {
					FirstName: sFirstName,
					LastName: sLastName,
					UserName: sUserName,
					BirthDate: dBirthDate
				};

				if (bDeep) {
					var oMultiComboBoxSkills = this.byId("skills");
					var aKeys = oMultiComboBoxSkills.getSelectedKeys();
					var aSkills = [];
					for (var i = 0; i < aKeys.length; i++) {
						var value = aKeys[i];
						aSkills.push({
							Skill: +value
						});
					}
					oStudent.ToSkills = aSkills;
				}

				return oStudent;
			}

		});

	});