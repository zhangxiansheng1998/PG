var signatureReponse = vars.get("signatureReponse");
var dataObj = vars.getObject("dataObj");
if(signatureReponse != null){
	var resultsigna = dataObj.expectedResult.signature;
	log.info("dataObj123123----------------------------->"+resultsigna);
	if(resultsigna != null){
		var signatureResult = JSON.parse(JSON.stringify(dataObj).replace("{{ResponseSignature}}", signatureReponse));
		vars.putObject("dataObj", signatureResult);
		log.info("dataObjdadada----------------------------->"+JSON.stringify(vars.getObject("dataObj")));
	}
}