var jsonBody = JSON.parse(prev.getResponseDataAsString());
var st1;
var st2;
var st3;
var st4;
var st5;
var st6;
var st7;
var threeDSServerTransID;
var refundRefNum;
var gatewayReferenceId;
var originstring;
var svalue;
var sv;
var authorizationCode1;
var tokenId;
var xt1;
var xt2;
var xt3;
var xt4;
var xt5;
var xt6;
var v2_tokenLinks_signature;
var threeDSReferenceId1;
var specificationVersion11;
var commerceIndicator11;
var xid11;
var dsTxnId11;
var acsTransID11;
var cavv11;
var eciRaw11;
var PAResStatus11;
var threeDSReferenceId2;
var specificationVersion22;
var commerceIndicator22;
var xid22;
var dsTxnId22;
var acsTransID22;
var cavv22;
var eciRaw22;
var PAResStatus22;
var tokenvalue;



vars.put("txnId", jsonBody.transactionId)
log.info("see value  ----------txnId------------>" + vars.get("txnId"));


if (vars.get("requestType").equals("jsonTransactionsV2ApiKey") && jsonBody.datetime) {
	vars.put("datetime", jsonBody.datetime)
	log.info("see value-------jsonBody.datetime------->" + jsonBody.datetime);
}

if (jsonBody.nttrefid) {
	vars.put("nttrefid", jsonBody.nttrefid)
}
if (jsonBody.txnid) {
	vars.put("resultTxnid", jsonBody.txnid)
}

if (jsonBody.transactionId) {
	vars.put("transactionId", jsonBody.transactionId)
}

if (jsonBody.gatewayReferenceId) {
	vars.put("p_gatewayReferenceId", jsonBody.gatewayReferenceId);
	log.info("see value  ----------p_gatewayReferenceId------------>" + jsonBody.gatewayReferenceId);
}
if (jsonBody.gatewayReferenceId) {
	vars.put("nttrefid", jsonBody.gatewayReferenceId)
	vars.put("gatewayReferenceId", jsonBody.gatewayReferenceId);
	log.info("see value  ----------gatewayReferenceId------------>" + jsonBody.gatewayReferenceId);
}

if (jsonBody.captureReferenceId) {
	vars.put("captureReferenceId", jsonBody.captureReferenceId)
	log.info("see value  ----------captureReferenceId------------>" + jsonBody.gatewayReferenceId);
}
if (jsonBody.refundId) {
	vars.put("refundId", jsonBody.refundId)
	log.info("see value  ----------refundId------------>" + jsonBody.refundId);
}

if (jsonBody.reportId) {
	vars.put("reportId", jsonBody.reportId)
}

if (vars.get("requestType").equals("NewV13ds1") && jsonBody.responseCode == "02") {
	log.info("Into XQY  ----------NewV13ds1------------>" + jsonBody.threeDSReferenceId);
	vars.put("threeDSReferenceId1", jsonBody.threeDSReferenceId);
	log.info("Into XQY  ----------NewV13ds1------------>" + vars.get("threeDSReferenceId1"));
}

if (vars.get("requestType").equals("NewV23dsKey") && jsonBody.responseCode == "02") {
	log.info("Into XQY  ----------NewV23dsKey------------>" + jsonBody.threeDSReferenceId);
	vars.put("threeDSReferenceId2", jsonBody.threeDSReferenceId);
	log.info("Into XQY  ----------NewV23dsKey------------>" + vars.get("threeDSReferenceId2"));
}

if (vars.get("requestType").equals("NewsV13ds") && jsonBody.responseCode == "00") {
	log.info("Into XQY  ----------NewsV13ds1------------>" + jsonBody.cardAuthentication.specificationVersion);
	log.info("Into XQY  ----------NewsV13ds2------------>" + jsonBody.cardAuthentication.commerceIndicator);
	log.info("Into XQY  ----------NewsV13ds3------------>" + jsonBody.cardAuthentication.xid);
	log.info("Into XQY  ----------NewsV13ds4------------>" + jsonBody.cardAuthentication.dsTxnId);
	log.info("Into XQY  ----------NewsV13ds5------------>" + jsonBody.cardAuthentication.acsTransID);
	log.info("Into XQY  ----------NewsV13ds6------------>" + jsonBody.cardAuthentication.cavv);
	log.info("Into XQY  ----------NewsV13ds7------------>" + jsonBody.cardAuthentication.eciRaw);
	log.info("Into XQY  ----------NewsV13ds7------------>" + jsonBody.cardAuthentication.PAResStatus);
	vars.put("specificationVersion11", jsonBody.cardAuthentication.specificationVersion);
	vars.put("commerceIndicator11", jsonBody.cardAuthentication.commerceIndicator);
	vars.put("xid11", jsonBody.cardAuthentication.xid);
	vars.put("dsTxnId11", jsonBody.cardAuthentication.dsTxnId);
	vars.put("acsTransID11", jsonBody.cardAuthentication.acsTransID);
	vars.put("cavv11", jsonBody.cardAuthentication.cavv);
	vars.put("eciRaw11", jsonBody.cardAuthentication.eciRaw);
	vars.put("PAResStatus11", jsonBody.cardAuthentication.PAResStatus);
}

if (vars.get("requestType").equals("NewsV23dsKey") && jsonBody.responseCode == "00") {
	log.info("Into XQY  ----------NewsV23dsKey1------------>" + jsonBody.cardAuthentication.specificationVersion);
	log.info("Into XQY  ----------NewsV23dsKey2------------>" + jsonBody.cardAuthentication.commerceIndicator);
	log.info("Into XQY  ----------NewsV23dsKey3------------>" + jsonBody.cardAuthentication.xid);
	log.info("Into XQY  ----------NewsV23dsKey4------------>" + jsonBody.cardAuthentication.dsTxnId);
	log.info("Into XQY  ----------NewsV23dsKey5------------>" + jsonBody.cardAuthentication.acsTransID);
	log.info("Into XQY  ----------NewsV23dsKey6------------>" + jsonBody.cardAuthentication.cavv);
	log.info("Into XQY  ----------NewsV23dsKey7------------>" + jsonBody.cardAuthentication.eciRaw);
	log.info("Into XQY  ----------NewsV23dsKey8------------>" + jsonBody.cardAuthentication.PAResStatus);
	log.info("Into XQY  ----------NewsV23dsKey9------------>" + jsonBody.cardAuthentication.ucafCollectionIndicator);
	log.info("Into XQY  ----------NewsV23dsKey10------------>" + jsonBody.cardAuthentication.avv);
	vars.put("specificationVersion22", jsonBody.cardAuthentication.specificationVersion);
	vars.put("commerceIndicator22", jsonBody.cardAuthentication.commerceIndicator);
	vars.put("xid22", jsonBody.cardAuthentication.xid);
	vars.put("dsTxnId22", jsonBody.cardAuthentication.dsTxnId);
	vars.put("acsTransID22", jsonBody.cardAuthentication.acsTransID);
	vars.put("cavv22", jsonBody.cardAuthentication.cavv);
	vars.put("eciRaw22", jsonBody.cardAuthentication.eciRaw);
	vars.put("PAResStatus22", jsonBody.cardAuthentication.PAResStatus);
	vars.put("ucafCollectionIndicator22",jsonBody.cardAuthentication.ucafCollectionIndicator);
	vars.put("avv22",jsonBody.cardAuthentication.avv);
}

if (vars.get("requestType").equals("paymentRequest") && jsonBody.ru && jsonBody.channelType == "doku2" && jsonBody.respcode != "00") {
	if (jsonBody.ru.indexOf("https://") >= 0) {
		vars.put("redirect_url", jsonBody.ru)
	}
}

if (vars.get("requestType").equals("paymentRequest") && jsonBody.ru && jsonBody.channelType == "omise" && jsonBody.respcode != "00") {
	if (jsonBody.ru.indexOf("https://") >= 0) {
		vars.put("redirect_url", jsonBody.ru)
	}
}

if (vars.get("requestType").indexOf("3dsV1") > -1 && jsonBody.responseCode == "02") {
	log.info("see value  ----------XQY 3dsV1------------>");
	st1 = prev.getResponseDataAsString()
	st2 = st1.split(',');
	st3 = st2[0].split('{');
	st4 = st3[2].split(':');
	st5 = st4[2].split('=');
	st6 = st5[1].split('"');
	st7 = "https://simulator.ps.paysec-3dssvgw.com/api/v2/auth/brw/threeDsMethod?threeDSServerTransID=" + st6[0];
	vars.put("redirect_url", st7);
	vars.put("threeDSServerTransID", st6[0]);
}



if (vars.get("requestType").indexOf("tokenLinksV2ApiKey") > -1 && jsonBody.responseCode == "00") {
	log.info("see value  ----------XQY tokenId1------------>");
	xt1 = jsonBody.redirectUrl;
	xt2 = xt1.split('&');
	xt3 = xt2[0].split('=');
	xt5 = xt2[1].split('=');
	xt4 = xt3[1];
	xt6 = xt5[1];
	log.info("see value  ----------XQY tokenId------------>" + xt4);
	vars.put("tokenId", xt4);
	vars.put("v2_tokenLinks_signature", xt6);

}

if (vars.get("requestType").indexOf("vcnnewCharge") > -1 && jsonBody.respdesc == "success") {
	originstring = jsonBody.result;
	svalue = originstring.substring(44, 76);
	log.info("see value  ----------XQY s------------>" + svalue);
	vars.put("sv", svalue);
}

if (vars.get("requestType").equals("jsonTransactionsV2ApiKey") && jsonBody.returnUrl && jsonBody.channelType == "gmo") {
	if ((jsonBody.returnUrl.indexOf("https://uat-paymentsvcs.ndhkpay.com") >= 0) || (jsonBody.returnUrl.indexOf("https://sit-paymentsvcs.ndhkpay.com") >= 0)) {
		vars.put("redirect_url", jsonBody.returnUrl)
	}
}

if (vars.get("requestType").equals("jsonTransactionsV2ApiKey") && jsonBody.userDefinedData2 == "MP_Operation") {
	vars.put("redirect_url", "https://portal.sit.ndhkpay.com/operations/users");
	vars.put("gatewayReferenceId", jsonBody.gatewayReferenceId);
}

if (vars.get("requestType").equals("portalTransactionsV2ApiKey") && jsonBody.userDefinedData2 == "MP_Operation") {
	vars.put("redirect_url", "https://portal.sit.ndhkpay.com/operations/users");
	vars.put("gatewayReferenceId", jsonBody.gatewayReferenceId);
}

if (vars.get("requestType").equals("jsonTransactionsV2ApiKey") && jsonBody.authorizationCode) {
	vars.put("authorizationCode1", jsonBody.authorizationCode);
	log.info("XQY Auth Code" + jsonBody.authorizationCode);
}

if (jsonBody.redirect_url) {
	if (jsonBody.udf1 == "omise_pending" || jsonBody.udf1 == "omise_expired") {
		vars.put("redirect_url", jsonBody.ru);
	}
	else { vars.put("redirect_url", jsonBody.redirect_url); }
} else {
	log.info("see value-------jsonBody.redirect_url------->" + jsonBody.redirect_url);
}

if (jsonBody.redirectUrl && (vars.get("requestType").indexOf("tokenLinksV2ApiKey") == -1)) {
	vars.put("redirect_url", jsonBody.redirectUrl)
}

if (vars.get("requestType").equals("paymentRequest") && jsonBody.ru && jsonBody.channelType == "doku2" && jsonBody.paymentMethod == "shopee" && jsonBody.txnid == 'SpecialTxnidForRU') {
	if (jsonBody.ru.indexOf("https://") >= 0) {
		vars.put("redirect_url", jsonBody.ru)
	}
}

if (vars.get("requestType").equals("jsonTransactionsV2ApiKey") && jsonBody.returnUrl && jsonBody.channelType == "unionpay" && jsonBody.userDefinedData1 == "JPMC_DEFAULT") {
	if ((jsonBody.returnUrl.indexOf("https://uat-paymentsvcs.ndhkpay.com") >= 0) || (jsonBody.returnUrl.indexOf("https://sit-paymentsvcs.ndhkpay.com") >= 0)) {
		vars.put("redirect_url", jsonBody.returnUrl)
	}
}

if (vars.get("requestType").equals("tokenizeRequest") && jsonBody.result) {
	vars.put("token", jsonBody.result)
}

if (vars.get("requestType").equals("Login")) {
	vars.put("tokenvalue", jsonBody.token)
	log.info("see value-------Login000------->" + vars.get("tokenvalue"));
	log.info("see value-------Login222------->" + jsonBody.token);
}

if (vars.get("requestType").equals("formTokenizeRequest") && jsonBody.result) {
	vars.put("token", jsonBody.result)
}


if (vars.get("requestType").equals("jsonV2TokenApiKey") && jsonBody.token) {
	vars.put("token", jsonBody.token)
}

if (vars.get("requestType").equals("hostpageTokenizeV2ApiKey") && jsonBody.token) {
	vars.put("token", jsonBody.token)
}

if (vars.get("requestType").equals("postToken") && jsonBody.token) {
	log.info("XQY postToken")
	vars.put("token", jsonBody.token)
}

if (vars.get("requestType").equals("jsonTransactionsV2ApiKey") && jsonBody.tokenization.token) {
	vars.put("token", jsonBody.tokenization.token)
	log.info("see value-------jsonBody.token------->" + jsonBody.tokenization.token);
}

if (vars.get("requestType").equals("cardVerificationV2ApiKey") && jsonBody.tokenization.token) {
	vars.put("token", jsonBody.tokenization.token)
	log.info("see value-------jsonBody.token------->" + jsonBody.tokenization.token);
}

if (vars.get("requestType").equals("paymentRequest") && jsonBody.tokenization.token) {
	vars.put("token", jsonBody.tokenization.token)
	log.info("see value-------jsonBody.token------->" + jsonBody.tokenization.token);
}



if (vars.get("requestType").equals("createPaymentLink") && jsonBody.result) {
	if (jsonBody.result.indexOf("https://") >= 0) {
		vars.put("redirect_url", jsonBody.result)
	}
}


if (vars.get("requestType").equals("vcnnewCharge") && jsonBody.result) {

	vars.put("redirect_url", jsonBody.result);

}



if (vars.get("requestType").equals("portalCreatePaymentLink") && jsonBody.result) {
	if (jsonBody.result.indexOf("https://") >= 0) {
		vars.put("redirect_url", jsonBody.result)
	}
}

if (vars.get("requestType").equals("cardVerificationV2") && jsonBody.tokenization.token) {
	vars.put("token", jsonBody.tokenization.token)
}
if (jsonBody.channelType == "gmo" && jsonBody.paymentMethod == "cvs" && jsonBody.responseCode == "02") {
	if (jsonBody.returnUrl.indexOf("https://") >= 0) {
		vars.put("redirect_url", jsonBody.returnUrl)
	}
}

if (vars.get("requestType").equals("cardVerificationV2") && jsonBody.tokenization.token) {
	vars.put("token", jsonBody.tokenization.token)
}

if (vars.get("requestType").equals("reportsV2ApiKey") && jsonBody.reportId) {
	vars.put("reportId", jsonBody.reportId)
}

if (vars.get("requestType").equals("encrypt") && jsonBody.result) {
	vars.put("resultcarddata", jsonBody.result)
	log.info("see value  ----------generate carddata------------>" + vars.get("resultcarddata"));
}

var requestType = vars.get("requestType");
if (requestType == "refundRequestV2" || requestType == "captureRequestV2" || requestType == "requeryRequestV3" || requestType == "refundRequest" || requestType == "captureRequest" || requestType == "requeryRequestV2" || requestType == "requeryRequest" || requestType == "getToken" || requestType == "putToken" || requestType == "deleteToken") {
	log.info("see value  ----------reponseSignature1------------>" + vars.get("signatureData") + "***" + jsonBody.respcode);
	log.info("see value  ----------reponseSignature2------------>" + jsonBody.signature);
	if (jsonBody.signature) {
		vars.put("reponseSignature", vars.get("signatureData") + jsonBody.respcode);
	}

}

if (vars.get("requestType").equals("refundRequestV2") && jsonBody.refundRefNum.indexOf("9") >= 0) {
	log.info("XQY refund");
	vars.put("refundRefNum", jsonBody.refundRefNum);

}

