eval(props.get("commonUtilsJsContent"));

var jsonData = JSON.parse(vars.get("jsonData"));
var dataObj = vars.getObject("dataObj");
var requestType = vars.get("requestType");
var requestBody = JSON.parse(props.get(requestType + "Body"));
var errorurl1;
var errorurl2;
var errorurl3;
var errorurl4;
var setupurl;


vars.remove("signature");
log.info("set request body");
log.info("see current jsonData before handling: " + JSON.stringify(jsonData));
log.info("see current requestBody before handling: " + JSON.stringify(requestBody));
log.info("see current dataObj before handling: " + JSON.stringify(dataObj));
log.info("see signature before handling: " + vars.get("signature"));


if (requestType == "refundRequestV2") {
	var timeStr = new Date().getTime() + "";
	var timeSuffix = timeStr.substr(timeStr.length - 3);
	log.info("see value  ----------refund time------------>" + timeStr);
	vars.put("refundrefnum", vars.get("nttrefid") + timeSuffix);
}

if (requestType == "refundRequest") {
	var timeStr = new Date().getTime() + "";
	var timeSuffix = timeStr.substr(timeStr.length - 3);
	log.info("see value  ----------refund time------------>" + timeStr);
	vars.put("refundrefnum", vars.get("nttrefid") + timeSuffix);
}

if (requestType == "portalRefundRequest") {
	var timeStr = new Date().getTime() + "";
	var timeSuffix = timeStr.substr(timeStr.length - 3);
	log.info("see value  ----------refund time------------>" + timeStr);
	vars.put("refundrefnum", vars.get("nttrefid") + timeSuffix);
}

if (requestType == "initiateRefundRequestV2") {
	vars.put("refundrefnum", vars.get("nttrefid") + "-R2");
}



if (requestType == "capturesV2ApiKey") {
	var timeStr = new Date().getTime() + "";
	var timeSuffix = timeStr.substr(timeStr.length - 3);

	var captureIdTmp = vars.get("nttrefid") || vars.get("resultTxnid") || "error"
	vars.put("captureId", captureIdTmp + timeSuffix);
	log.info("see value  ----------captureId------------>" + refundIdTmp + timeSuffix);
}

if (requestType == "refundsV2ApiKey") {
	var timeStr = new Date().getTime() + "";
	var timeSuffix = timeStr.substr(timeStr.length - 3);

	var refundIdTmp = vars.get("nttrefid") || vars.get("resultTxnid") || "error"
	vars.put("refundId", refundIdTmp + timeSuffix);
	log.info("see value  ----------refundId------------>" + refundIdTmp + timeSuffix);
}

//add refundId handling for v2 portal refund
if (requestType == "portalRefundsV2ApiKey") {
	var timeStr = new Date().getTime() + "";
	var timeSuffix = timeStr.substr(timeStr.length - 3);

	var refundIdTmp = vars.get("nttrefid") || vars.get("resultTxnid") || "error"
	vars.put("refundId", refundIdTmp + timeSuffix);
	log.info("see value  ----------refundId------------>" + refundIdTmp + timeSuffix);
}

// 2021.08.12 add v2capture handling
if (!requestType.contains("ApiKey")) {
	commonUtils.setMerchantConfig(jsonData.merchantId);
}

if (requestType.contains("ApiKey")) {
	commonUtils.setApiKeyConfig(jsonData.merchantId, requestType);
}

commonUtils.setGenralParameters();
commonUtils.setDataObjIntoVars(dataObj);                   //dataObj  --------   json requestBody     存放到vars中
commonUtils.removeUnusedKey(requestBody);			    //如果requestBody中的某个字段在vars中找不到，删除
commonUtils.setVarsKeyIntoRequestBody(requestBody);
commonUtils.setSpecialApiKeyConfig(requestBody, requestType);


log.info("see current requestBody after common handling: " + JSON.stringify(requestBody));
log.info("see signature after common handling: " + vars.get("signature"));


//if(requestType.contains("ApiKey")){
//  delete requestBody["apikey"];
//  delete requestBody["signatureKey"];

//  log.info("after delete apikey,apikey:"+vars.get("apikey"));
//}

if (requestBody.txnid == "generate") {
	var timeStr = new Date().getTime() + "";
	requestBody.txnid = timeStr;
	vars.put("generate_txnid", timeStr);
} else if (requestBody.txnid == "reuse") {
	requestBody.txnid = vars.get("generate_txnid");
}

if (requestBody.transactionId == "generate") {
	var timeStr = new Date().getTime() + "";
	requestBody.transactionId = timeStr;
	vars.put("generate_transactionId", timeStr);
}

if (requestBody.transactionId == "reuse") {
	log.info("see value  ----------generate_transactionId------------>" + vars.get("generate_transactionId"));
	requestBody.transactionId = vars.get("generate_transactionId") || vars.get("resultTxnid") || "error";
}


log.info("see value  ----------p_gatewayReferenceId2-----requestBody.gatewayReferenceId------->" + requestBody.gatewayReferenceId);
if (requestBody.gatewayReferenceId == "reuse") {
	log.info("see value  ----------p_gatewayReferenceId2------------>" + vars.get("p_gatewayReferenceId"));
	requestBody.gatewayReferenceId = vars.get("p_gatewayReferenceId") || vars.get("nttrefid") || "error";
}

if (requestBody.memberId == "generate") {
	var timeStr = new Date().getTime() + "";
	requestBody.memberId = timeStr;
	vars.put("generate_memberId", timeStr);
} else if (requestBody.memberId == "reuse") {
	requestBody.memberId = vars.get("generate_memberId");
}

log.info("refundrefnum:" + dataObj.refundrefnum);

if (dataObj.refundrefnum) {
	log.info("refundrefnumlngth------------>" + dataObj.refundrefnum.length);
	if (dataObj.refundrefnum.length > 21 && dataObj.refundrefnum.length < 26) {
		var timeStrs = new Date().getTime() + "" + "123";
		var refundObj = vars.get("nttrefid") + timeStrs;
		log.info("refundrefnumlngth1------------>" + refundObj);
		requestBody["refundrefnum"] = refundObj.substr(refundObj.length - dataObj.refundrefnum.length);
		log.info("refundrefnumlngth2------------>" + requestBody["refundrefnum"]);
	}

	//if(dataObj.refundrefnum.length > 25){
	//	var timeStrs =new Date().getTime()+""+"1234";
	//	var refundObj = vars.get("nttrefid") + timeStrs;
	//	log.info("refundrefnumlngth>25------------>"+refundObj);
	//	 requestBody["refundrefnum"] = refundObj;
	//	 log.info("refundrefnumlngth>25------------>"+requestBody["refundrefnum"]);
	//}
}

log.info("2021.06.11_requestType: " + requestType);
log.info("2021.06.requestBody: " + requestBody);

if (requestType.contains("ApiKey") && dataObj.apikey) {
	vars.put("apikey", dataObj.apikey);
	delete requestBody["apikey"];
	log.info("2021081701:" + vars.get("apikey"));
}

if (dataObj.pass) {
	requestBody["pass"] = dataObj.pass;
}

log.info("see signature before signatureData: " + vars.get("signature"));
var signatureData = commonUtils.generateSignatureData(requestType, requestBody);

log.info("see signature after signatureData: " + vars.get("signature"));

log.info("see value  ----------signatureKey------------>" + jsonData.merchantId);
log.info("see value  ----------signatureKey------------>" + props.get("nttSignatureKey"));

if (undefined != jsonData["signatureKey"]) {
	vars.remove("signatureKey");
	vars.put("signatureKey", jsonData["signatureKey"]);
}

vars.put("signatureData", signatureData);


vars.put("requestURL", props.get(requestType + "URL"));

log.info("requestURL:", props.get(requestType + "URL"));

log.info("sedataObj1------------>" + dataObj.pass);


log.info("see signature before dataObj.signature: " + vars.get("signature"));
log.info("the signature from requestBody : " + dataObj.signature);
if (dataObj.signature) {
	log.info("2021/09/01 signature1");
	requestBody["signature"] = dataObj.signature;
} else {
	log.info("2021/09/01 signature2");
	requestBody["signature"] = null;
}

log.info("see signature before ApiKey check: " + vars.get("signature"));
log.info("see request signature before ApiKey check: " + dataObj.signature);

vars.put("signature", dataObj.signature);
log.info("see signature after ApiKey check: " + vars.get("signature"));

if (requestType == "createPaymentLinkV2ApiKey" && vars.get("token") && requestBody["tokens"] && (JSON.stringify(requestBody["tokens"]).indexOf("CardTokenReferenceNo") == -1)) {
	log.info("see current tokens before tokens handling: " + JSON.stringify(requestBody["tokens"]));
	log.info("see current token before tokens handling: " + vars.get("token"));
	var tokensString = JSON.stringify(requestBody["tokens"]);
	if (tokensString.indexOf("reuse") != -1) {
		tokensString = tokensString.replace("reuse", vars.get("token"));
		requestBody["tokens"] = JSON.parse(tokensString);
		log.info("see current tokens before tokens handling: " + tokensString);
	}
}

if (requestType == "createPaymentLinkV2ApiKey" && requestBody["tokens"] && (JSON.stringify(requestBody["tokens"]).indexOf("CardTokenReferenceNo") > -1)) {
	log.info("XQY CardTokenReferenceNo HP payment:" + JSON.stringify(requestBody["tokens"]));
	var tokensString = JSON.stringify(requestBody["tokens"]);
	if (tokensString.indexOf("CardTokenReferenceNo") != -1) {
		tokensString = tokensString.replace("CardTokenReferenceNo", vars.get("CardTokenReferenceNo"));
		requestBody["tokens"] = JSON.parse(tokensString);
		log.info("XQY CardTokenReferenceNo HP payment: " + tokensString);
	}
}

if (requestType == "createPaymentLink" && vars.get("token") && requestBody["tokens"]) {
	log.info("see current tokens before tokens handling: " + JSON.stringify(requestBody["tokens"]));
	log.info("see current token before tokens handling: " + vars.get("token"));
	var tokensString = JSON.stringify(requestBody["tokens"]);
	if (tokensString.indexOf("reuse") != -1) {
		tokensString = tokensString.replace("reuse", vars.get("token"));
		requestBody["tokens"] = JSON.parse(tokensString);
		log.info("see current tokens before tokens handling: " + tokensString);
	}
}


if (requestType == "paymentRequest" && requestBody.carddata == "reuse") {
	requestBody.carddata = vars.get("resultcarddata");
	log.info("see value  ----------carddata------------>" + vars.get("resultcarddata"));
}





if (requestBody["ru"] && (dataObj.ru == "https://uat.ndhkpay.com/NTT_Pages/return" || dataObj.ru == "https://sit.ndhkpay.com/NTT_Pages/return")) {
	var env = props.get("envirnoment");
	if (env == "SIT") {
		requestBody["ru"] = "https://sit.ndhkpay.com/NTT_Pages/return";
	} else {
		requestBody["ru"] = "https://uat.ndhkpay.com/NTT_Pages/return";
	}
}

if (requestBody["ru"] && (dataObj.ru == "https://uat.ndhkpay.com/payment-page" || dataObj.ru == "https://sit.ndhkpay.com/payment-page")) {
	var env = props.get("envirnoment");
	if (env == "SIT") {
		requestBody["ru"] = "https://sit.ndhkpay.com/payment-page";
	} else {
		requestBody["ru"] = "https://uat.ndhkpay.com/payment-page";
	}
}

if (requestBody["returnUrl"] && (dataObj.returnUrl == "https://uat.ndhkpay.com/payment-page" || dataObj.returnUrl == "https://sit.ndhkpay.com/payment-page")) {
	var env = props.get("envirnoment");
	if (env == "SIT") {
		requestBody["returnUrl"] = "https://sit.ndhkpay.com/payment-page";
	} else {
		requestBody["returnUrl"] = "https://uat.ndhkpay.com/payment-page";
	}
}

if (requestBody["cancelUrl"] && (dataObj.cancelUrl == "https://uat.ndhkpay.com/payment-page" || dataObj.cancelUrl == "https://sit.ndhkpay.com/payment-page")) {
	var env = props.get("envirnoment");
	if (env == "SIT") {
		requestBody["cancelUrl"] = "https://sit.ndhkpay.com/payment-page";
	} else {
		requestBody["cancelUrl"] = "https://uat.ndhkpay.com/payment-page";
	}
}


//现在时间+1天
var strTime = new Date();
strTime = strTime.setDate(strTime.getDate() + 1);
strTime = new Date(strTime);
//strTime=strTime.setHours(strTime.getHours()+3);
//strTime=new Date(strTime);
var currentTime = strTime.getFullYear() + '-';
log.info("strTime.getMonth(): " + strTime.getMonth());

if ((strTime.getMonth() + 1) < 10) {
	currentTime += "0" + (strTime.getMonth() + 1) + '-';
} else {
	currentTime += strTime.getMonth() + 1 + '-';
}
if ((strTime.getDate()) < 10) {
	currentTime += "0" + (strTime.getDate()) + ' ';
} else {
	currentTime += strTime.getDate() + ' ';
}
if (strTime.getHours() < 10) {
	currentTime += "0" + strTime.getHours() + ':';
} else {
	currentTime += strTime.getHours() + ':';
}
if (strTime.getMinutes() < 10) {
	currentTime += "0" + strTime.getMinutes() + ':';
} else {
	currentTime += strTime.getMinutes() + ':';
}
if (strTime.getSeconds() < 10) {
	currentTime += "0" + strTime.getSeconds();
} else {
	currentTime += strTime.getSeconds();
}

if (dataObj.expirydate == "CurrentTime") {
	requestBody["expirydate"] = currentTime;
}
if (dataObj.expiryDate == "CurrentTime") {
	requestBody["expiryDate"] = currentTime;
}

if (dataObj.urlExpiryDate == "CurrentTime") {
	requestBody["urlExpiryDate"] = currentTime;
}

//现在时间+3小时
var strTime = new Date();
strTime = strTime.setHours(strTime.getHours() + 3);
strTime = new Date(strTime);
var specialCurrentTime = strTime.getFullYear() + '-';
log.info("strTime.getMonth(): " + strTime.getMonth());

if ((strTime.getMonth() + 1) < 10) {
	specialCurrentTime += "0" + (strTime.getMonth() + 1) + '-';
} else {
	specialCurrentTime += strTime.getMonth() + 1 + '-';
}
if ((strTime.getDate()) < 10) {
	specialCurrentTime += "0" + (strTime.getDate()) + ' ';
} else {
	specialCurrentTime += strTime.getDate() + ' ';
}
if (strTime.getHours() < 10) {
	specialCurrentTime += "0" + strTime.getHours() + ':';
} else {
	specialCurrentTime += strTime.getHours() + ':';
}
if (strTime.getMinutes() < 10) {
	specialCurrentTime += "0" + strTime.getMinutes() + ':';
} else {
	specialCurrentTime += strTime.getMinutes() + ':';
}
if (strTime.getSeconds() < 10) {
	specialCurrentTime += "0" + strTime.getSeconds();
} else {
	specialCurrentTime += strTime.getSeconds();
}

if (dataObj.expirydate == "specialCurrentTime") {
	requestBody["expirydate"] = specialCurrentTime;
}
if (dataObj.expiryDate == "specialCurrentTime") {
	requestBody["expiryDate"] = specialCurrentTime;
}

//现在时间+2分钟
var strTime = new Date();
strTime = strTime.setMinutes(strTime.getMinutes() + 2);
strTime = new Date(strTime);
var expiryTime = strTime.getFullYear() + '-';
log.info("strTime.getMonth(): " + strTime.getMonth());

if ((strTime.getMonth() + 1) < 10) {
	expiryTime += "0" + (strTime.getMonth() + 1) + '-';
} else {
	expiryTime += strTime.getMonth() + 1 + '-';
}
if ((strTime.getDate()) < 10) {
	expiryTime += "0" + (strTime.getDate()) + ' ';
} else {
	expiryTime += strTime.getDate() + ' ';
}
if (strTime.getHours() < 10) {
	expiryTime += "0" + strTime.getHours() + ':';
} else {
	expiryTime += strTime.getHours() + ':';
}
if (strTime.getMinutes() < 10) {
	expiryTime += "0" + strTime.getMinutes() + ':';
} else {
	expiryTime += strTime.getMinutes() + ':';
}
if (strTime.getSeconds() < 10) {
	expiryTime += "0" + strTime.getSeconds();
} else {
	expiryTime += strTime.getSeconds();
}

if (dataObj.expirydate == "expiryTime") {
	requestBody["expirydate"] = expiryTime;
}
if (dataObj.expiryDate == "expiryTime") {
	requestBody["expiryDate"] = expiryTime;
}
if (dataObj.urlExpiryDate == "expiryTime") {
	requestBody["urlExpiryDate"] = expiryTime;
}


var datetime = new Date(vars.get("datetime"));
log.info("see value-------datetime1------->" + datetime);
datetime = datetime.setMinutes(datetime.getMinutes() - 3);
datetime = new Date(datetime);

var datetime1 = datetime.getFullYear() + '-';

if ((datetime.getMonth() + 1) < 10) {
	datetime1 += "0" + (datetime.getMonth() + 1) + '-';
} else {
	datetime1 += datetime.getMonth() + 1 + '-';
}
if ((datetime.getDate()) < 10) {
	datetime1 += "0" + (datetime.getDate()) + ' ';
} else {
	datetime1 += datetime.getDate() + ' ';
}
if (datetime.getHours() < 10) {
	datetime1 += "0" + datetime.getHours() + ':';
} else {
	datetime1 += datetime.getHours() + ':';
}
if (datetime.getMinutes() < 10) {
	datetime1 += "0" + datetime.getMinutes() + ':';
} else {
	datetime1 += datetime.getMinutes() + ':';
}
if (datetime.getSeconds() < 10) {
	datetime1 += "0" + datetime.getSeconds();
} else {
	datetime1 += datetime.getSeconds();
}

log.info("see value-------datetime2------->" + datetime1);

if (dataObj.startDateTime == "reuse") {
	requestBody["startDateTime"] = datetime1;
	log.info("see value-------datetime------->" + datetime1);
}

var token = vars.get("access_token");
log.info("result333---:", token);
if (typeof (token) == "undefined" || token == '' || token == null) {
	var dataObjToken = dataObj.accessToken;
	log.info("dataObjToken111:", dataObjToken);
	if (typeof (dataObjToken) == "undefined" || dataObjToken == '' || dataObjToken == null) {
		vars.putObject("access_token", "");
	} else {
		vars.put("access_token", dataObjToken);
	}
} else {
	if (token.contains("Bearer")) {
		vars.put("access_token", token);
	} else {
		vars.put("access_token", "Bearer" + " " + token);
		var test=vars.get("access_token")
		log.info("result222---:", test);
	}
}

// jsfk token
var token = vars.get("token");
if (typeof (token) == "undefined" || token == '' || token == null) {
	var dataObjToken = dataObj.token;
	if (typeof (dataObjToken) == "undefined" || dataObjToken == '' || dataObjToken == null) {
		vars.putObject("token", "");
	} else {
		vars.put("token", dataObjToken);
	}
} else {
	if (token.contains("Bearer")) {
		vars.put("token", token);
	} else {
		vars.put("token", "Bearer" + " " + token);
	}
}


var headerToken = requestBody.headerToken;
var headerAuthorization = requestBody.headerAuthorization;
var headerSignature = requestBody.headerSignature;
var bodySignature = requestBody.bodySignature;
var bodyCarddata = requestBody.bodyCarddata;
var bodyIncorrectFormat = requestBody.bodyIncorrectFormat;
log.info("see value  ----------headerToken------------>" + headerToken);
log.info("see value  ----------headerAuthorization------------>" + headerAuthorization);
log.info("see value  ----------headerSignature------------>" + headerSignature);
log.info("see value  ----------bodySignature------------>" + bodySignature);
log.info("see value  ----------bodyCarddata------------>" + bodyCarddata);
log.info("see value  ----------bodyIncorrectFormat------------>" + bodyIncorrectFormat);
vars.put("headerToken", headerToken);
vars.put("headerAuthorization", headerAuthorization);
vars.put("headerSignature", headerSignature);
vars.put("bodySignature", bodySignature);
vars.put("bodyCarddata", bodyCarddata);
vars.put("bodyIncorrectFormat", bodyIncorrectFormat);
if (false == bodySignature) {
	delete requestBody["signature"];
}
if (false == bodyCarddata) {
	delete requestBody["carddata"];
	delete requestBody["cardData"];
}
if (true == bodyIncorrectFormat) {
	log.info("see value  ----------bodyIncorrectFormat IN------------>");
	var requestBodyIncorrect = "\"\"";
	log.info("see value  ----------requestBodyIncorrect------------>" + requestBodyIncorrect);
	requestBody = "\"\"";
	log.info("see value  ----------requestBody111------------>" + requestBody);
}
delete requestBody["headerToken"];
delete requestBody["headerAuthorization"];
delete requestBody["headerSignature"];
delete requestBody["bodySignature"];
delete requestBody["bodyCarddata"];
delete requestBody["apikey"];
delete requestBody["bodyIncorrectFormat"];

log.info("after delete headerSignature,headerSignature:" + vars.get("headerSignature"));

if (true == headerSignature) {
	if (requestType == "portalCreatePaymentLinkV2ApiKey") {
		vars.put("headerSignatureData", "/api/v2/portalPaymentLinks");
		log.info("see value  ----------headerSignatureData------------>" + vars.get("headerSignatureData"));
	} else if (requestType == "portalTransactionsV2ApiKey") {
		vars.put("headerSignatureData", "/api/v2/portalTransactions");
		log.info("see value  ----------headerSignatureData------------>" + vars.get("headerSignatureData"));
	} else if (requestType == "portalCapturesV2ApiKey") {
		vars.put("headerSignatureData", "/api/v2/portalCaptures");
		log.info("see value  ----------headerSignatureData------------>" + vars.get("headerSignatureData"));
	} else if (requestType == "portalRefundsV2ApiKey") {
		vars.put("headerSignatureData", "/api/v2/portalRefunds");
		log.info("see value  ----------headerSignatureData------------>" + vars.get("headerSignatureData"));
	}
	else {
		vars.put("headerSignatureData", JSON.stringify(requestBody));
		log.info("see value  ----------headerSignatureData------------>" + vars.get("headerSignatureData"));
	}
}
vars.put("requestLogin", requestBody.login);
vars.putObject("requestBody", requestBody);
log.info("see value  ----------requestBody------------>" + vars.get("requestBody"));

log.info(requestBody);
log.info("see signature in the last: " + vars.get("signature"));

if (requestType == "paymentRequest" && requestBody.cardAuthentication.dsTxnId == 'dsTxnId11') {
	log.info("Go to XQY cybs 3DS 2.0 payment11");
	requestBody.cardAuthentication.specificationVersion = vars.get("specificationVersion11");
	requestBody.cardAuthentication.commerceIndicator = vars.get("commerceIndicator11");
	requestBody.cardAuthentication.xid = vars.get("xid11");
	requestBody.cardAuthentication.dsTxnId = vars.get("dsTxnId11");
	requestBody.cardAuthentication.PAResStatus = vars.get("PAResStatus11");
	requestBody.cardAuthentication.cavv = vars.get("cavv11");
	requestBody.cardAuthentication.eciRaw = vars.get("eciRaw11");
	log.info("Go to XQY cybs 3DS 2.0 payment");

}

if (requestType == "jsonTransactionsV2ApiKey" && requestBody.cardAuthentication != null) {
	log.info("Go to XQY cybs 3DS 2.0 payment22");
	requestBody.cardAuthentication.specificationVersion = vars.get("specificationVersion22");
	requestBody.cardAuthentication.commerceIndicator = vars.get("commerceIndicator22");
	requestBody.cardAuthentication.dsTxnId = vars.get("dsTxnId22");
	requestBody.cardAuthentication.PAResStatus = vars.get("PAResStatus22");
	requestBody.cardAuthentication.eciRaw = vars.get("eciRaw22");
	requestBody.cardAuthentication.acsTransID = vars.get("acsTransID22");
	if (requestBody.cardAuthentication.avv != null) {
		requestBody.cardAuthentication.avv = vars.get("avv22");
	}
	if (requestBody.cardAuthentication.ucafCollectionIndicator != null) {
		requestBody.cardAuthentication.ucafCollectionIndicator = vars.get("ucafCollectionIndicator22");
	}
	if (requestBody.cardAuthentication.cavv != null) {
		requestBody.cardAuthentication.cavv = vars.get("cavv22");
	}
	if (requestBody.cardAuthentication.xid != null) {
		requestBody.cardAuthentication.xid = vars.get("xid22");
	}
	log.info("Go to XQY cybs 3DS 2.0 payment");

}

if (requestType == "paymentRequest" || requestType == "createPaymentLink" || requestType == "portalCreatePaymentLink") {
	log.info("see value  ----------setRequestBody------------>" + jsonData.merchantId);
	log.info("see value  ----------setRequestBody------------>" + requestBody["channelType"]);
	vars.put("merchantId", jsonData.merchantId);
	vars.put("channelType", requestBody["channelType"]);
}

if (requestType == "paymentRequest" && (requestBody.cardAuthentication.dsTxnId == "dsTxnId" && requestBody.cardAuthentication.verificationValue == "verificationValue" && requestBody.cardAuthentication.threeDSServerTransID == "threeDSServerTransID" && requestBody.cardAuthentication.acsTransID == "acsTransID")) {

	requestBody.cardAuthentication.dsTxnId = vars.get("dsTxnId");
	requestBody.cardAuthentication.verificationValue = vars.get("verificationValue");
	requestBody.cardAuthentication.threeDSServerTransID = vars.get("threeDSServerTransID");
	requestBody.cardAuthentication.acsTransID = vars.get("acsTransID");
	log.info("Go to XQY 3DS 2.0");

}


if (requestType == "NewsV13ds" && requestBody.threeDSReferenceId == "threeDSReferenceId1") {
	log.info("Go to XQY cybs 3DS 2.0" + vars.get("threeDSReferenceId1"));
	requestBody.threeDSReferenceId = vars.get("threeDSReferenceId1");
}

if (requestType == "NewtV13ds" && requestBody.threeDSReferenceId == "threeDSReferenceId1") {
	log.info("Go to XQY cybs 3DS 2.0" + vars.get("threeDSReferenceId1"));
	requestBody.threeDSReferenceId = vars.get("threeDSReferenceId1");
}


if (requestType == "NewsV23dsKey" && requestBody.threeDSReferenceId == "threeDSReferenceId2") {
	log.info("Go to v2 XQY cybs 3DS 2.0" + vars.get("threeDSReferenceId2"));
	requestBody.threeDSReferenceId = vars.get("threeDSReferenceId2");
}

if (requestType == "deleteisgTokensApiKey" && (requestBody.token.indexOf("CardTokenReferenceNo") > -1)) {

	requestBody.token = vars.get("CardTokenReferenceNo");
	log.info("Go to XQY deleteisgTokensApiKey");

}

if (vars.get("requestType").equals("Login")) {
	delete requestBody["signature"];
}

if (requestType == "tokenLinksV2ApiKey" && (requestBody.customerDetails.firstName.indexOf("no_signature") > -1)) {
	log.info("XQY no_signature url tokenLinksV2ApiKey");
	errorurl1 = "https://sit.ndhkpay.com/api/redirect/token?tokenId=" + vars.get("tokenId");
	log.info("XQY no_signature url tokenLinksV2ApiKey" + errorurl1);
	vars.put("redirect_url", errorurl1);
}

if (requestType == "tokenLinksV2ApiKey" && (requestBody.customerDetails.firstName.indexOf("invalid_signature") > -1)) {
	log.info("XQY invalid_signature url tokenLinksV2ApiKey");
	errorurl2 = "https://sit.ndhkpay.com/api/redirect/token?tokenId=" + vars.get("tokenId") + "&signature=123";
	log.info("XQY invalid_signature url tokenLinksV2ApiKey" + errorurl2);
	vars.put("redirect_url", errorurl2);
}

if (requestType == "tokenLinksV2ApiKey" && (requestBody.customerDetails.firstName.indexOf("no_tokenId") > -1)) {
	log.info("XQY no_tokenId url tokenLinksV2ApiKey");
	errorurl3 = "https://sit.ndhkpay.com/api/redirect/token?tokenId=" + "&signature=" + vars.get("v2_tokenLinks_signature");
	log.info("XQY no_tokenId url tokenLinksV2ApiKey" + errorurl3);
	vars.put("redirect_url", errorurl3);
}

if (requestType == "tokenLinksV2ApiKey" && (requestBody.customerDetails.firstName.indexOf("invalid_tokenId") > -1)) {
	log.info("XQY invalid_tokenId url tokenLinksV2ApiKey");
	errorurl4 = "https://sit.ndhkpay.com/api/redirect/token?tokenId=123" + "&signature=" + vars.get("v2_tokenLinks_signature");
	log.info("XQY invalid_tokenId url tokenLinksV2ApiKey" + errorurl4);
	vars.put("redirect_url", errorurl4);
}

if (requestType == "putV2TokenApiKey" && (requestBody.token.indexOf("CardTokenReferenceNo") > -1)) {

	requestBody.token = vars.get("CardTokenReferenceNo");
	log.info("Go to XQY putV2TokenApiKey");

}

if (requestType == "jsonTransactionsV2ApiKey" && (requestBody.token.indexOf("CardTokenReferenceNo") > -1)) {

	requestBody.token = vars.get("CardTokenReferenceNo");
	log.info("Go to XQY deleteisgTokensApiKey");
}

if (requestType == "jsonTransactionsV2ApiKey" && (requestBody.token.indexOf("hptoken") > -1)) {

	requestBody.token = vars.get("hptoken");
	log.info("Go to XQY deleteisgTokensApiKey");
}

if (requestType == "vcnupdateCharge" && requestBody.s == "sv") {
	requestBody.s = vars.get("sv");
	log.info("Go to XQY vcnupdateCharge" + vars.get("sv"));
}

if (requestType == "vcnqueryCharge" && requestBody.s == "sv") {
	requestBody.s = vars.get("sv");
	log.info("Go to XQY vcnqueryCharge" + vars.get("sv"));
}

if (requestType == "vcncancelCharge" && requestBody.s == "sv") {
	requestBody.s = vars.get("sv");
	log.info("Go to XQY vcncancelCharge" + vars.get("sv"));
}

if (requestType == "vcnqueryCharge" && requestBody.s == "sv") {
	requestBody.s = vars.get("sv");
	log.info("Go to XQY vcnqueryCharge" + vars.get("sv"));
}