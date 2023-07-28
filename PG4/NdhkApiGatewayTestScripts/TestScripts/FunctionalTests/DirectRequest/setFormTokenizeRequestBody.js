eval(props.get("commonUtilsJsContent"));

var jsonData = JSON.parse(vars.get("jsonData"));
commonUtils.setMerchantConfig(jsonData.merchantId);

var dataObj = vars.getObject("dataObj");

var headerToken = dataObj.headerToken;
var headerAuthorization = dataObj.headerAuthorization;
var headerSignature = dataObj.headerSignature;
var bodySignature = dataObj.bodySignature;
var bodyCarddata = dataObj.bodyCarddata;

vars.put("headerToken",headerToken);
vars.put("headerAuthorization",headerAuthorization);
vars.put("headerSignature",headerSignature);
vars.put("bodySignature",bodySignature);
vars.put("bodyCarddata",bodyCarddata);

var requestBody = "";

var login = dataObj.login;
if(typeof(login) != "undefined" && login != null && login !=""){
	requestBody +=  "login=" + login + "&";
}

var pass = dataObj.pass;
if(typeof(pass) != "undefined" && pass != null && pass !=""){
	requestBody +=  "pass=" + pass + "&";
}

var card = dataObj.card;
if(typeof(card) != "undefined" && card != null && card !=""){
	requestBody +=  "card=" + card + "&";
}

var expiryDate = dataObj.expiryDate;
if(typeof(expiryDate) != "undefined" && expiryDate != null && expiryDate !=""){
	requestBody +=  "expiryDate=" + expiryDate + "&";
}

var cvv = dataObj.cvv;
if(typeof(cvv) != "undefined" && cvv != null && cvv !=""){
	requestBody +=  "cvv=" + cvv + "&";
}

var verifyRequest = dataObj.verifyRequest;
if(typeof(verifyRequest) != "undefined" && verifyRequest != null && verifyRequest !=""){
	requestBody +=  "verifyRequest=" + verifyRequest + "&";
}

var txncurr = dataObj.txncurr;
if(typeof(txncurr) != "undefined" && txncurr != null && txncurr !=""){
	requestBody +=  "txncurr=" + txncurr + "&";
}

var cardHolderName = dataObj.cardHolderName;
if(typeof(cardHolderName) != "undefined" && cardHolderName != null && cardHolderName !=""){
	requestBody +=  "cardHolderName=" + cardHolderName + "&";
}

var tokenProvider = dataObj.tokenProvider;
if(typeof(tokenProvider) != "undefined" && tokenProvider != null && tokenProvider !=""){
	requestBody +=  "tokenProvider=" + tokenProvider + "&";
}

var nickname = dataObj.nickname;
if(typeof(nickname) != "undefined" && nickname != null && nickname !=""){
	requestBody +=  "nickname=" + nickname + "&";
}

var tokenType = dataObj.tokenType;
if(typeof(tokenType) != "undefined" && tokenType != null && tokenType !=""){
	requestBody +=  "tokenType=" + tokenType + "&";
}

var userDefinedData1 = dataObj.userDefinedData1;
if(typeof(userDefinedData1) != "undefined" && userDefinedData1 != null && userDefinedData1 !=""){
	requestBody +=  "userDefinedData1=" + userDefinedData1 + "&";
}

var userDefinedData2 = dataObj.userDefinedData2;
if(typeof(userDefinedData2) != "undefined" && userDefinedData2 != null && userDefinedData2 !=""){
	requestBody +=  "userDefinedData2=" + userDefinedData2 + "&";
}

var userDefinedData3 = dataObj.userDefinedData3;
if(typeof(userDefinedData3) != "undefined" && userDefinedData3 != null && userDefinedData3 !=""){
	requestBody +=  "userDefinedData3=" + userDefinedData3 + "&";
}

var userDefinedData4 = dataObj.userDefinedData4;
if(typeof(userDefinedData4) != "undefined" && userDefinedData4 != null && userDefinedData4 !=""){
	requestBody +=  "userDefinedData4=" + userDefinedData4 + "&";
}

var userDefinedData5 = dataObj.userDefinedData5;
if(typeof(userDefinedData5) != "undefined" && userDefinedData5 != null && userDefinedData5 !=""){
	requestBody +=  "userDefinedData5=" + userDefinedData5;
}

var requestParams = requestBody.substring(0,requestBody.length()-1);
vars.put("requestParams",requestBody);
log.info("see value  ----------requestBody------------>"+vars.get("requestBody"));

var jsonData = JSON.parse(vars.get("jsonData"));
var requestType = vars.get("requestType");

if(requestType.contains("ApiKey")){
   commonUtils.setApiKeyConfig(jsonData.merchantId,requestType);
}

if(requestType.contains("ApiKey") && dataObj.apikey){
	vars.put("apikey", dataObj.apikey);
}

if(requestType.contains("ApiKey") && dataObj.signature){
	vars.put("signature", dataObj.signature);
}

log.info("see value  -----formdata-----requestType------------>"+requestType);
log.info("see value  -----formdata-----apikey------------>"+vars.get("apikey"));
log.info("see value  -----formdata-----SignatureKey------------>"+vars.get("signatureKey"));


vars.put("requestURL", props.get(requestType + "URL"));