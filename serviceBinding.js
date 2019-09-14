function initModel() {
	var sUrl = "/sap/opu/odata/sap/ZT37_79_OVLY_APP_SRV/";
	var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
	sap.ui.getCore().setModel(oModel);
}