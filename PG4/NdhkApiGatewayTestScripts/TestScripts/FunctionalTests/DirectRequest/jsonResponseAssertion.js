var expectedResult = vars.getObject("dataObj").expectedResult;
var responseObj = JSON.parse(prev.getResponseDataAsString());
var responseCode = prev.getResponseCode();
log.info("responseCode:"+responseCode);

log.info("See expectedResult Value"+expectedResult);
log.info("See responseObj Value"+responseObj);

SampleResult.setNttrefid(vars.get("nttrefid"));
SampleResult.setTxnid(vars.get("resultTxnid"));
SampleResult.setMerchantId(vars.get("merchantId"));
SampleResult.setChannelType(vars.get("channelType"));
log.info("See TxnidNttrefidMerchantIdChannelType Value-------------------------");

var needAssertArray = vars.getObject("dataObj").needAssert;
log.info("See TxnidNttrefid Value-------------------------"+needAssertArray);
var expectedHttpCode="";
for(var key in needAssertArray){
log.info("key: "+needAssertArray[key]);	
if("httpCode"==needAssertArray[key]){
   expectedHttpCode=expectedResult[needAssertArray[key]];
   log.info("httpCode:"+ responseCode);
   log.info("Asserting---"+needAssertArray[key]+"----->["+responseCode+"] And ["+expectedResult[needAssertArray[key]]+"]");
   if(responseCode==expectedResult[needAssertArray[key]]){
        log.info("httpCode is equal to expectedHttpCode");
   	    //AssertionResult.setFailure(false);
   	    SampleResult.setSuccessful(true);
    }
}else{
	log.info("Asserting---"+needAssertArray[key]+"----->["+responseObj[needAssertArray[key]]+"] And ["+expectedResult[needAssertArray[key]]+"]");
	var jsonExpectedResult = expectedResult[needAssertArray[key]];
	
	if(typeof(jsonExpectedResult) == "object" && Object.prototype.toString.call(jsonExpectedResult).toLowerCase() == "[object object]" && !jsonExpectedResult.length){
		var jsonResponseObj = responseObj[needAssertArray[key]];
			for(var key in jsonExpectedResult){
				if(typeof(jsonExpectedResult[key]) == "object" && Object.prototype.toString.call(jsonExpectedResult[key]).toLowerCase() == "[object object]" && !jsonExpectedResult[key].length){
					for(var i in jsonExpectedResult[key]){
						Assert(jsonResponseObj[key][i],jsonExpectedResult[key][i],"Assert "+i);
					}
				}else{
					Assert(jsonResponseObj[key],jsonExpectedResult[key],"Assert "+key);
				}
			}
	}else if(typeof(jsonExpectedResult) == "object" && Object.prototype.toString.call(jsonExpectedResult).toLowerCase() == "[object array]"){
         for(i = 0; i < jsonExpectedResult.length; i++){
             var dataArray = jsonExpectedResult[i];
			 var respArray = responseObj[needAssertArray[key]][i];
			 
			if(typeof(dataArray) == "object" && Object.prototype.toString.call(dataArray).toLowerCase() == "[object object]" && !dataArray.length){
				for(var dataKey in dataArray){
					Assert(respArray[dataKey],dataArray[dataKey],"Assert "+dataKey);
				}
			}else{
				    Assert(respArray,dataArray,"Assert "+ needAssertArray[key]);
			}			 
		 }   
	}else{
		Assert(responseObj[needAssertArray[key]],expectedResult[needAssertArray[key]],"Assert "+needAssertArray[key]);
	}
  }
}

if(vars.getObject("dataObj").if_02_redirect_url){
	var forwardRespCode ="02";
	if(responseObj.respcode==forwardRespCode&&(null==responseObj.redirect_url||undefined==responseObj.redirect_url)){
		inputErrorLog("Return status code 02, but did not detect the generated redirect_url.");
	}

	if(responseObj.respcode!=forwardRespCode&&(null!=responseObj.redirect_url&&undefined!=responseObj.redirect_url)){
		inputErrorLog("The return status code is not 02, but it is detected that there is redirect_url generation.");
	}
}


//for (var key in expectedResult) {
//	var value = expectedResult[key];
//	if(key == "httpCode" && responseCode != value) {
//		setErrorMessage("Incorrect httpCode");
//		continue;
//	} else if(typeof value === 'string' && responseObj[key] !== value){
//		setErrorMessage("Incorrect " + key + "with value " + value);
//		continue;
//	} else if(typeof value === 'boolean' && value && responseObj[key] == "undefined"){
//		setErrorMessage("Missing " + key);
//		continue;
//	}
//}
//
//function setErrorMessage(error){
//	errorMessage += error;
//	errorMessage += "\n";
//	failure = true;
//}

function inputErrorLog(message){
     var failureMessage = "[${testDataId}]An error occurred,"+message;
     AssertionResult.setFailureMessage(failureMessage);
	AssertionResult.setFailure(true);
     logErrorMessage(failureMessage);
}

function Assert(actual,expected,message){
if(expected == null || expected.length == 0 ){
	if(actual != null && actual.length != 0){
		var failureMessage = vars.get("testDataId") + ": "+message+",look forward to["+expected+"],Actually["+actual+"].";
     	setAssertionFail(failureMessage);
	}
}else if(expected.indexOf("#Contains-") >= 0 ){
	var strs= new Array();
	    strs=expected.split("-");
		if(strs[1]==null||strs[1].length==0){
			var failureMessage = vars.get("testDataId") + ": "+message+",look forward to["+expected+"],Actually["+actual+"].";
     		setAssertionFail(failureMessage);
		}else{
			if(actual.indexOf(strs[1]) < 0){
				var failureMessage = vars.get("testDataId") + ": "+message+",look forward to["+expected+"],Actually["+actual+"].";
				setAssertionFail(failureMessage);
			}
		}
}else if(expected.indexOf("IsNull") >= 0 ){
	if(actual!=null && actual!=""){
	  	     var failureMessage = vars.get("testDataId")+":"+message+",look forward to["+expected+"],Actually["+actual+"].";
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
				var failureMessage = vars.get("testDataId") + ": "+message+",look forward to["+expected+"],Actually["+actual+"].";
				setAssertionFail(failureMessage);
		}else{
			if(actual == strArray[1]){
				var failureMessage = vars.get("testDataId") + ": "+message+",look forward to["+expected+"],Actually["+actual+"].";
				setAssertionFail(failureMessage);
			}
		}
}else {
	if(typeof expected === 'boolean' && expected){
		if(actual == "undefined"){
			var failureMessage = vars.get("testDataId") + ": "+message+",look forward to have value,Actually["+actual+"].";
			setAssertionFail(failureMessage);
		}
	}else if(actual!=expected){	
		var failureMessage = vars.get("testDataId") + ": "+message+",look forward to["+expected+"],Actually["+actual+"].";
     	setAssertionFail(failureMessage);
	}
  }	
}

function setAssertionFail(failureMessage){
	vars.put("redirect_url", null);
	AssertionResult.setFailureMessage(failureMessage);
	AssertionResult.setFailure(true);
	logErrorMessage(failureMessage);
}

function logErrorMessage(failureMessage){
	log.error("\n=============================================================\n"+failureMessage+"\n=============================================================");
}