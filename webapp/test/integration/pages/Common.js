sap.ui.define([
	"sap/ui/test/Opa5"
], function (Opa5) {
	"use strict";

	function getFrameUrl(sHash, sUrlParameters) {
		var sUrl = jQuery.sap.getResourcePath("ovly/fiori_79/cadastroalunos/index", ".html");
		sHash = sHash || "";
		sUrlParameters = sUrlParameters ? "?" + sUrlParameters : "";

		if (sHash) {
			sHash = "#" + (sHash.indexOf("/") === 0 ? sHash.substring(1) : sHash);
		} else {
			sHash = "";
		}

		return sUrl + sUrlParameters + sHash;
	}

	return Opa5.extend("ovly.fiori_79.cadastroalunos.test.integration.pages.Common", {

		iStartTheApp: function (oOptions) {
			oOptions = oOptions || {};
			// Start the app with a minimal delay to make tests run fast but still async to discover basic timing issues
			this.iStartMyAppInAFrame(getFrameUrl(oOptions.hash));
		},

		iLookAtTheScreen: function () {
			return this;
		}

	});

});