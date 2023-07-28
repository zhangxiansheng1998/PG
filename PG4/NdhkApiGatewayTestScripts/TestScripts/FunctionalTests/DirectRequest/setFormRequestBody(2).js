eval(props.get("commonUtilsJsContent"));

var jsonData = JSON.parse(vars.get("jsonData"));
commonUtils.setMerchantConfig(jsonData.merchantId);
var requestType = vars.get("requestType");

var dataObj = vars.getObject("dataObj");

log.info("see value  -----txnid------------>"+vars.get("txnidStr"));

// var headerToken = dataObj.headerToken;
// var headerSignature = dataObj.headerSignature;
// var bodySignature = dataObj.bodySignature;
// var bodyCarddata = dataObj.bodyCarddata;

// vars.put("headerToken",headerToken);
// vars.put("headerSignature",headerSignature);
// vars.put("bodySignature",bodySignature);
// vars.put("bodyCarddata",bodyCarddata);

var requestBody = "";

var login = dataObj.login;
if(typeof(login) != "undefined" && login != null && login !=""){
	requestBody +=  "login=" + login + "&";
}

var pass = dataObj.pass;
if(typeof(pass) != "undefined" && pass != null && pass !=""){
	requestBody +=  "pass=" + pass + "&";
}

var channelType = dataObj.channelType;
if(typeof(channelType) != "undefined" && channelType != null && channelType !=""){
	requestBody +=  "channelType=" + channelType + "&";
}

var paymentMethod = dataObj.paymentMethod;
if(typeof(paymentMethod) != "undefined" && paymentMethod != null && paymentMethod !=""){
	requestBody +=  "paymentMethod=" + paymentMethod + "&";
}

var channelId = dataObj.channelId;
if(typeof(channelId) != "undefined" && channelId != null && channelId !=""){
	requestBody +=  "channelId=" + channelId + "&";
}

var txnid = dataObj.txnid;
if(typeof(txnid) != "undefined" && txnid != null && txnid !=""){
	if(txnid=="generate"){
	   txnid=vars.get("txnidStr");
   }
	requestBody +=  "txnid=" + txnid + "&";
	log.info("check generated txnid: "+txnid);
}

var txncurr = dataObj.txncurr;
if(typeof(txncurr) != "undefined" && txncurr != null && txncurr !=""){
	requestBody +=  "txncurr=" + txncurr + "&";
}

var amt = dataObj.amt;
if(typeof(amt) != "undefined" && amt != null && amt !=""){
	requestBody +=  "amt=" + amt + "&";
}

var od = dataObj.od;
if(typeof(od) != "undefined" && od != null && od !=""){
	requestBody +=  "od=" + od + "&";
}

var remarks = dataObj.remarks;
if(typeof(remarks) != "undefined" && remarks != null && remarks !=""){
	requestBremarksy +=  "remarks=" + remarks + "&";
}

var paymentMode = dataObj.paymentMode;
if(typeof(paymentMode) != "undefined" && paymentMode != null && paymentMode !=""){
	requestBody +=  "paymentMode=" + paymentMode + "&";
}

var carddata = dataObj.carddata;
if(typeof(carddata) != "undefined" && carddata != null && carddata !="" && false!=vars.get("bodycarddata")){
	requestBody +=  "carddata=" + carddata + "&";
}

var isStorePaymentMethod = dataObj.isStorePaymentMethod;
if(typeof(isStorePaymentMethod) != "undefined" && isStorePaymentMethod != null && isStorePaymentMethod !=""){
	requestBody +=  "isStorePaymentMethod=" + isStorePaymentMethod + "&";
}


var token = dataObj.token;
if(typeof(token) != "undefined" && token != null && token !=""){
	requestBody +=  "token=" + token + "&";
}else{
		var token2 = vars.get("access_token");
		if(typeof(token2) == "undefined" || token2 == '' || token2 == null){
			var dataObjToken = dataObj.accessToken;
			if(typeof(dataObjToken) == "undefined" || dataObjToken == '' || dataObjToken == null){
				vars.putObject("access_token", "");
			}else{
				vars.put("access_token", dataObjToken);
			}
		}else{
			if(token.contains("Bearer")){
				vars.put("access_token", token2);
			}else{
				vars.put("access_token", "Bearer"+" "+token2);
			}
		}
		
		if(typeof(token2) != "undefined" && token2 != null && token2 !=""){
				requestBody +=  "token=" + token2 + "&";
		}
}


var tokenType = dataObj.tokenType;
if(typeof(tokenType) != "undefined" && tokenType != null && tokenType !=""){
	requestBody +=  "tokenType=" + tokenType + "&";
}

var cardCvv = dataObj.cardCvv;
if(typeof(cardCvv) != "undefined" && cardCvv != null && cardCvv !=""){
	requestBody +=  "cardCvv=" + cardCvv + "&";
}

var merchantDescriptor = dataObj.merchantDescriptor;
if(typeof(merchantDescriptor) != "undefined" && merchantDescriptor != null && merchantDescriptor !=""){
	requestBody +=  "merchantDescriptor=" + merchantDescriptor + "&";
}

var ru = dataObj.ru;
if(typeof(ru) != "undefined" && ru != null && ru !=""){

	if(ru == "https://uat.ndhkpay.com/NTT_Pages/return" || ru == "https://sit.ndhkpay.com/NTT_Pages/return"){
		var env = props.get("envirnoment");
		if(env == "SIT"){
			ru = "https://sit.ndhkpay.com/NTT_Pages/return";
		}else {
			ru = "https://uat.ndhkpay.com/NTT_Pages/return";
		}
	}
	requestBody +=  "ru=" + ru + "&";
}

var callbackUrl = dataObj.callbackUrl;
if(typeof(callbackUrl) != "undefined" && callbackUrl != null && callbackUrl !=""){
	requestBody +=  "callbackUrl=" + callbackUrl + "&";
}

var expirydate = dataObj.expirydate;
if(typeof(expirydate) != "undefined" && expirydate != null && expirydate !=""){

    if(expirydate == "CurrentTime"){
		var strTime = new Date();
		strTime=strTime.setDate(strTime.getDate()+1);
		strTime=new Date(strTime);
	    var currentTime = strTime.getFullYear() + '-';
		if((strTime.getMonth()) < 10){
			currentTime+= "0"+(strTime.getMonth() + 1) + '-';
		}else{
	    	currentTime += strTime.getMonth() + 1 + '-';
	    }
		if((strTime.getDate()) < 10){
			currentTime+= "0"+(strTime.getDate()) + ' ';
		}else {
	        currentTime += strTime.getDate() + ' ';
	    }	
		if(strTime.getHours() < 10){
			currentTime+= "0"+strTime.getHours() + ':';
		}else{
	    	currentTime += strTime.getHours() + ':';
	    }
		if(strTime.getMinutes() < 10){
			currentTime+= "0"+strTime.getMinutes() + ':';
		}else{
	   	    currentTime += strTime.getMinutes() + ':';
	    }
	    if(strTime.getSeconds() < 10){
			currentTime+= "0"+strTime.getSeconds();
		}else{
	   	    currentTime += strTime.getSeconds();
	    }
	    expirydate = currentTime
    }
    
	requestBody +=  "expirydate=" + expirydate + "&";
}

var lang = dataObj.lang;
if(typeof(lang) != "undefined" && lang != null && lang !=""){
	requestBody +=  "lang=" + lang + "&";
}

var udf1 = dataObj.udf1;
if(typeof(udf1) != "undefined" && udf1 != null && udf1 !=""){
	requestBody +=  "udf1=" + udf1 + "&";
}

var udf2 = dataObj.udf2;
if(typeof(udf2) != "undefined" && udf2 != null && udf2 !=""){
	requestBody +=  "udf2=" + udf2 + "&";
}

var udf3 = dataObj.udf3;
if(typeof(udf3) != "undefined" && udf3 != null && udf3 !=""){
	requestBody +=  "udf3=" + udf3 + "&";
}

var udf4 = dataObj.udf4;
if(typeof(udf4) != "undefined" && udf4 != null && udf4 !=""){
	requestBody +=  "udf4=" + udf4 + "&";
}

var udf5 = dataObj.udf5;
if(typeof(udf5) != "undefined" && udf5 != null && udf5 !=""){
	requestBody +=  "udf5=" + udf5 + "&";
}

var subAction = dataObj.subAction;
if(typeof(subAction) != "undefined" && subAction != null && subAction !=""){
	requestBody +=  "subAction=" + subAction + "&";
}

var nttrefid = dataObj.nttrefid;
if(typeof(nttrefid) != "undefined" && nttrefid != null && nttrefid !=""){
	requestBody +=  "nttrefid=" + nttrefid + "&";
}

var otp = dataObj.otp;
if(typeof(otp) != "undefined" && otp != null && otp !=""){
	requestBody +=  "otp=" + otp + "&";
}

var authentication = dataObj.authentication;
if(typeof(authentication) != "undefined" && authentication != null && authentication !=""){
	requestBody +=  "authentication=" + authentication + "&";
}

// var jsonData = JSON.parse(vars.get("jsonData"));
// var requestType = vars.get("requestType");

// if(requestType.contains("ApiKey")){
//    commonUtils.setApiKeyConfig(jsonData.merchantId,requestType);
// }

// if(requestType.contains("ApiKey") && dataObj.apikey){
// 	vars.put("apikey", dataObj.apikey);
// }

// if(requestType == "formpaymentRequest" && dataObj.signature){
// 	vars.put("signature", dataObj.signature);
// }


var requestParams = requestBody.substring(0,requestBody.length()-1);
vars.put("requestParams",requestBody);
log.info("see value  ----------requestBody------------>"+vars.get("requestBody"));
log.info("see value  ----------encryptSignature1111------------>"+vars.get("signature"));

log.info("see signature before signatureData: "+vars.get("signatureData"));
var signatureData = commonUtils.generateFormPostSignatureData(requestType, requestBody);

log.info("see value  ----------FinalSignature------------>"+vars.get("signature"));

log.info("see value  ----------signatureKey------------>"+jsonData.merchantId);
log.info("see value  ----------signatureKey------------>"+props.get("nttSignatureKey"));

if(undefined!=jsonData["signatureKey"]){
	vars.remove("signatureKey");
	vars.put("signatureKey",jsonData["signatureKey"]);
}

vars.put("signatureData", signatureData);

// vars.put("signatureData", signatureData);

// if(dataObj.signature){
// 	log.info("2021/09/01 signature1");
// 	requestBody["signature"] = dataObj.signature;
// }else{
// 	log.info("2021/09/01 signature2");
// 	requestBody["signature"] = null;
// }

// log.info("see signature before ApiKey check: "+vars.get("signature"));
// log.info("see request signature before ApiKey check: "+dataObj.signature);

// vars.put("signature", dataObj.signature);
// log.info("see signature after ApiKey check: "+vars.get("signature"));

var bodySignature = dataObj.signature;
if(typeof(bodySignature) == "undefined" || signature == null || signature !=""){
	log.info("If???------------>");
	requestBody +=  "signature=" + vars.get("signature") + "&";
}

vars.put("requestParams",requestBody);
log.info("see value  ----------requestBody------------>"+vars.get("requestBody"));


log.info("see value  -----formdata-----signature------------>"+vars.get("signature"));
log.info("see value  -----formdata-----requestType------------>"+requestType);
// log.info("see value  -----formdata-----apikey------------>"+vars.get("apikey"));
log.info("see value  -----formdata-----SignatureKey------------>"+vars.get("signatureKey"));


vars.put("requestURL", props.get(requestType + "URL"));