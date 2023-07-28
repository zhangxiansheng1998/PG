var requestBody = vars.getObject("requestBody");
if(typeof(requestBody["signature"])=="undefined" || requestBody["signature"]=='' || requestBody["signature"]==null){
	var requestType = vars.get("requestType");
	if(requestType == "jsonOauthToken" || requestType == "jsonOauthTokenV2" || requestType == "cardVerificationV2"){
		delete requestBody["signature"];
	}else{
		requestBody["signature"] = vars.get("signature");
	}
}else{
	if(requestBody["signature"] == "skip"){
		delete requestBody["signature"];
	}else if(requestBody["signature"] == "signature"){
		requestBody["signature"] = "";
	}else if(requestBody["signature"] == "signatureIsNull"){
		requestBody["signature"] = null;
	}else if(requestBody["signature"] == "123"){
		requestBody["signature"] = "123";
	}else{
		
	}
}

var bodySignature = vars.get("bodySignature");
log.info("see value  ------addSignatureToRequBody--bodySignature-->"+bodySignature);
if("false" == bodySignature){
	delete requestBody["signature"];
}

//var requestType = vars.get("requestType");
//if(requestType == "cardVerification"){
//  if(requestBody["carddata"] == null){
//    	requestBody["carddata"] = "";
//	}
//}

if(requestBody["txnid"]){
	vars.put("resultTxnid", requestBody.txnid);
}

vars.put("requestBody", JSON.stringify(requestBody));
