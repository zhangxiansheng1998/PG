function inputErrorLog(message){
     var failureMessage = "[${testDataId}]An error occurred,"+message;
     AssertionResult.setFailureMessage(failureMessage);
	AssertionResult.setFailure(true);
     log.error("\n=============================================================\n"+failureMessage+"\n=============================================================");
}

function Assert(actual,expected,message){
if(expected == null || expected.length == 0 ){
	if(actual != null && actual.length != 0){
     		var failureMessage = "${testDataId}:"+message+",look forward to["+expected+"],Actually["+actual+"].";
     		log.error("\n=============================================================\n"+failureMessage+"\n=============================================================");
			AssertionResult.setFailureMessage(failureMessage);
			AssertionResult.setFailure(true);
	}
}else if(expected.indexOf("#Contains-") >= 0 ){
	var strs= new Array();
	    strs=expected.split("-");
  	  if(strs[1]==null||strs[1].length==0){
	  	     var failureMessage = "${testDataId}:"+message+",look forward to["+expected+"],Actually["+actual+"].";
     		log.error("\n=============================================================\n"+failureMessage+"\n=============================================================");
			AssertionResult.setFailureMessage(failureMessage);
			AssertionResult.setFailure(true);
	}else{
	  if(actual.indexOf(strs[1]) < 0){
	  	     var failureMessage = "${testDataId}:"+message+",look forward to["+expected+"],Actually["+actual+"].";
     		log.error("\n=============================================================\n"+failureMessage+"\n=============================================================");
			AssertionResult.setFailureMessage(failureMessage);
			AssertionResult.setFailure(true);
	  }
	}
}else if(expected.indexOf("IsNull") >= 0 ){
	if(actual!=null && actual!=""){
	  	     var failureMessage = vars.get("testDataId")+":"+message+",look forward33 to["+expected+"],Actually["+actual+"].";
     		log.error("\n=============================================================\n"+failureMessage+"\n=============================================================");
			AssertionResult.setFailureMessage(failureMessage);
			AssertionResult.setFailure(true);

	}
}else if(expected.indexOf("IsNotNull") >= 0 ){
	if(actual==null || actual==""){
	  	     var failureMessage = vars.get("testDataId")+":"+message+",look forward to["+expected+"],Actually["+actual+"].";
	  	     log.info("test isNotNull");
     		log.error("\n=============================================================\n"+failureMessage+"\n=============================================================");
			AssertionResult.setFailureMessage(failureMessage);
			AssertionResult.setFailure(true);

	}
}else if(expected.indexOf("@@#-") >= 0 ){
	var strArray = new Array();
	    strArray=expected.split("-");
	if(strArray[1]==null||strArray[1].length==0){
	  	     var failureMessage = "${testDataId}:"+message+",look forward to["+expected+"],Actually["+actual+"].";
     		log.error("\n=============================================================\n"+failureMessage+"\n=============================================================");
			AssertionResult.setFailureMessage(failureMessage);
			AssertionResult.setFailure(true);
	}else{
	  if(actual == strArray[1]){
	  	     var failureMessage = "${testDataId}:"+message+",look forward to["+expected+"],Actually["+actual+"].";
     		log.error("\n=============================================================\n"+failureMessage+"\n=============================================================");
			AssertionResult.setFailureMessage(failureMessage);
			AssertionResult.setFailure(true);
	  }
	}
}else {
		if(actual!=expected){
     	var failureMessage = "${testDataId}:"+message+",look forward to["+expected+"],Actually["+actual+"].";
     	log.error("\n=============================================================\n"+failureMessage+"\n=============================================================");
		AssertionResult.setFailureMessage(failureMessage);
		AssertionResult.setFailure(true);
	 }
   }	
}

function chuckDatabaseQueries(expectedResult,responseObj){                     //"databaseQueries": {"dbQueryId1": [{ "token_id": "1","merchantId": "NTT"}]}
		if(expectedResult){										    //"dbQueryId1": [{ "token_id": "1","merchantId": "NTT"}]
			for(var key in expectedResult){
				var subQueries =expectedResult[key];              //"dbQueryId1": [{ "token_id": "1","merchantId": "NTT"}]
				if(subQueries.length<=0){
					
				}else if(subQueries.length==1){
					var dataArray = subQueries[0];
					
					log.info("responseObj------------------------------->"+JSON.stringify(responseObj));
					var respArray = responseObj[key][0];
					log.info("dataArray------------------------------->"+JSON.stringify(dataArray));
					log.info("respArray------------------------------->"+JSON.stringify(respArray));
					for(var dataKey in dataArray){
//						     log.info("responseObj[key][dataKey]------------------->dataKey[dataKey]"+responseObj[key][dataKey]+"------"+dataArray[dataKey]);
//							Assert(responseObj[key][dataKey],dataKey[dataKey],"");
//							for(var respKey in respArray){
//						     			log.info("respArray[respKey]------------------->dataArray[dataKey]"+respArray[respKey]+"------"+dataArray[dataKey]);
								

								if(respArray&&respArray.hasOwnProperty(dataKey)){
									if(dataKey == 'rrn'){
										if(respArray[dataKey] == null){
											if(dataArray[dataKey] == null){
												Assert(respArray[dataKey],dataArray[dataKey],"["+dataKey+"] not equal");
											}else{
												inputErrorLog("["+dataKey+"] = null");
											}
										}
									} else{
										Assert(respArray[dataKey],dataArray[dataKey],"["+dataKey+"] not equal");
									}
										//Assert(respArray[dataKey],dataArray[dataKey],"["+dataKey+"] not equal");
									}else{
										inputErrorLog("Don't have key ["+dataKey+"] in actual")
										}
//					}
					}
				
				}else if(subQueries.length>1){
					for(i = 0; i < subQueries.length; i++){
					log.info("112321312a----------------->"+JSON.stringify(subQueries[i]));
					log.info("-----QQQQQQQQQQQQQ------------------------------>");
					log.info("112321312b------------------------------->"+JSON.stringify(responseObj[key][i]));

					var dataArray = subQueries[i];
					var respArray = responseObj[key][i];
					for(var dataKey in dataArray){
								if(respArray&&respArray.hasOwnProperty(dataKey)){
									if(dataKey == 'rrn'){
										if(respArray[dataKey] == null){
											if(dataArray[dataKey] == null){
												Assert(respArray[dataKey],dataArray[dataKey],"["+dataKey+"] not equal");
											}else{
												inputErrorLog("["+dataKey+"] = null");
											}
										}
									} else{
										Assert(respArray[dataKey],dataArray[dataKey],"["+dataKey+"] not equal");
									}
									}else{
										inputErrorLog("Don't have key ["+dataKey+"] in actual")
										}
					   }
				   }
				}
			}
		}
}

function chuckSystemLogQueries(expectedResult,responseObj){
//	if(actual!=expected){
//     	var failureMessage = "${testDataId}:"+message+",look forward to["+expected+"],Actually["+actual+"].";
//     	log.error("\n=============================================================\n"+failureMessage+"\n=============================================================");
//	AssertionResult.setFailureMessage(failureMessage);
//	AssertionResult.setFailure(true);
//	}
}

function chuck(expectedResult,responseObj){
	var expectedResultJson = expectedResult;
	var responseObjJson = responseObj;
	log.info("expectedResultJson----------------------------------->"+JSON.stringify(expectedResultJson));
	log.info("responseObjJson-------------------------------------->"+JSON.stringify(responseObjJson));
     chuckDatabaseQueries(expectedResultJson.databaseQueries,responseObjJson.databaseQueries);
	chuckSystemLogQueries(expectedResultJson.SystemLogQueries,responseObjJson.SystemLogQueries);
}

var responseBody = prev.getResponseDataAsString();

log.info("\n${testDataId}:Request body"+prev.getSamplerData());
log.info("\n${testDataId}:Response Info"+responseBody);

log.info("dataObj----------------------->"+JSON.stringify(vars.getObject("dataObj")));
var expectedResult = vars.getObject("dataObj").expectedResult;
//var responseObj = {
//    "signature": "6e4747fb47442071c5886a6e959550c29a21f6d7cf1a6b9b33ec815838fcd4c7f87eb7feef23d3a01d8d98a87e63da37c466a864ab397a24310b5dca0fbb060a",
//    "systemLogQueries": {
//        "systemQuery1": [
//            {
//                "billTo_email": "Ops.HK@nttdata.com",
//                "card_expirationMonth": "12",
//                "raw": "2019-11-29 11:45:14,820 INFO  [com.nttdata.hk.processor.cybersource.util.CybersourceUtils] (default task-4) 940831487: Authorization request from NTT to cybs with USD[purchaseTotals_currency=USD, billTo_city=HK, billTo_email=Ops.HK@nttdata.com, merchantReferenceCode=940831487, billTo_country=HK, billTo_lastName=Hong Kong, billTo_postalCode=852, billTo_street1=Kings Road Quarry Bay, ccAuthService_run=true, purchaseTotals_grandTotalAmount=1.00, billTo_firstName=NTT Data, billTo_state=HK, card_expirationMonth=12, card_expirationYear=2023, card_accountNumber=411111XXXXXXX1111]"
//            },
//            {
//                "raw": "2019-11-29 11:45:16,507 INFO  [com.nttdata.hk.processor.cybersource.util.CybersourceUtils] (default task-4) 940831487: Authorization response from cybs to NTT with USD[ccAuthReply_reasonCode=231, decision=REJECT, merchantReferenceCode=940831487, requestID=5749991142416152303009, reasonCode=231]"
//            },
//            {
//                "billTo_email": "Ops.HK@nttdata.com",
//                "card_expirationMonth": "12",
//                "raw": "2019-11-29 11:45:40,929 INFO  [com.nttdata.hk.processor.cybersource.util.CybersourceUtils] (default task-14) 940831488: Authorization request from NTT to cybs with USD[purchaseTotals_currency=USD, billTo_city=HK, billTo_email=Ops.HK@nttdata.com, merchantReferenceCode=940831488, billTo_country=HK, billTo_lastName=Hong Kong, billTo_postalCode=852, billTo_street1=Kings Road Quarry Bay, ccAuthService_run=true, purchaseTotals_grandTotalAmount=1.00, billTo_firstName=NTT Data, billTo_state=HK, card_expirationMonth=12, card_expirationYear=2023, card_accountNumber=411111XXXXXX1111]"
//            },
//            {
//                "raw": "2019-11-29 11:45:42,546 INFO  [com.nttdata.hk.processor.cybersource.util.CybersourceUtils] (default task-14) 940831488: Authorization response from cybs to NTT with USD[purchaseTotals_currency=USD, ccAuthReply_processorResponse=00, ccAuthReply_avsCode=Y, decision=ACCEPT, ccAuthReply_reasonCode=100, merchantReferenceCode=940831488, ccAuthReply_authorizationCode=831000, ccAuthReply_reconciliationID=5749991401756686203011, ccAuthReply_amount=1.00, requestID=5749991401756686203011, ccAuthReply_authorizedDateTime=2019-11-29T03:45:40Z, reasonCode=100, ccAuthReply_avsCodeRaw=Y]"
//            },
//            {
//                "billTo_email": "Ops.HK@nttdata.com",
//                "card_expirationMonth": "12",
//                "raw": "2019-11-29 12:00:48,986 INFO  [com.nttdata.hk.processor.cybersource.util.CybersourceUtils] (default task-28) 940831489: Authorization request from NTT to cybs with USD[purchaseTotals_currency=USD, billTo_city=HK, billTo_email=Ops.HK@nttdata.com, merchantReferenceCode=940831489, billTo_country=HK, billTo_lastName=Hong Kong, billTo_postalCode=852, billTo_street1=Kings Road Quarry Bay, ccAuthService_run=true, purchaseTotals_grandTotalAmount=1.00, billTo_firstName=NTT Data, billTo_state=HK, card_expirationMonth=12, card_expirationYear=2023, card_accountNumber=411111XXXXXX1111]"
//            },
//            {
//                "raw": "2019-11-29 12:00:50,572 INFO  [com.nttdata.hk.processor.cybersource.util.CybersourceUtils] (default task-28) 940831489: Authorization response from cybs to NTT with USD[purchaseTotals_currency=USD, ccAuthReply_processorResponse=00, ccAuthReply_avsCode=Y, decision=ACCEPT, ccAuthReply_reasonCode=100, merchantReferenceCode=940831489, ccAuthReply_authorizationCode=831000, ccAuthReply_reconciliationID=5750000482516733503012, ccAuthReply_amount=1.00, requestID=5750000482516733503012, ccAuthReply_authorizedDateTime=2019-11-29T04:00:48Z, reasonCode=100, ccAuthReply_avsCodeRaw=Y]"
//            }
//        ]
//    },
//    "databaseQueries": {
//        "dbQueryId1": [
//            {
//                "token_id": "1",
//                "merchantId": "NTT1"
//            }
//        ]
//    }
//};

SampleResult.setNttrefid(vars.get("nttrefid"));
SampleResult.setTxnid(vars.get("resultTxnid"));
log.info("See TxnidNttrefidDB Value-------------------------");

var responseObj = JSON.parse(prev.getResponseDataAsString());
chuck(expectedResult,responseObj);




