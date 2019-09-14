/* global QUnit*/

sap.ui.define([
	"sap/ui/test/Opa5",
	"ovly/fiori_79/cadastroalunos/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"ovly/fiori_79/cadastroalunos/test/integration/pages/View1",
	"ovly/fiori_79/cadastroalunos/test/integration/navigationJourney"
], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "ovly.fiori_79.cadastroalunos.view.",
		autoWait: true
	});
});