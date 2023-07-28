var expectedResult = vars.getObject("dataObj").expectedResult;
var responseObj = prev.getResponseDataAsString();
var responseCode = prev.getResponseCode();
log.info("responseCode: " + responseCode);

log.info("See expectedResult Value ------>" + expectedResult);
log.info("See responseObj Value ----->" + responseObj);

SampleResult.setNttrefid(vars.get("nttrefid"));
SampleResult.setTxnid(vars.get("resultTxnid"));
SampleResult.setMerchantId(vars.get("merchantId"));
SampleResult.setChannelType(vars.get("channelType"));
log.info("See TxnidNttrefidMerchantIdChannelType Value-------------------------");



var needAssertArray = vars.getObject("dataObj").needAssert;
log.info("See TxnidNttrefid Value-------------------------" + needAssertArray);
var expectedHttpCode = "";
for (var key in needAssertArray) {
	log.info("key: " + needAssertArray[key]);
	if ("httpCode" == needAssertArray[key]) {
		expectedHttpCode = expectedResult[needAssertArray[key]];
		log.info("httpCode:" + responseCode);
		log.info("Asserting---" + needAssertArray[key] + "----->[" + responseCode + "] And [" + expectedResult[needAssertArray[key]] + "]");
		if (responseCode == expectedResult[needAssertArray[key]]) {
			log.info("httpCode is equal to expectedHttpCode");
			//AssertionResult.setFailure(false);
			SampleResult.setSuccessful(true);
		}
	} else if ("amt" == needAssertArray[key]) {
		log.info("Asserting---" + needAssertArray[key] + "----->[" + responseCode + "] And [" + expectedResult[needAssertArray[key]] + "]");
		if (responseObj.indexOf("input name=\"amt\"") != -1) {
			log.info("Asserting amt now !");
			var str = responseObj;
			str = str.substring(str.indexOf("input name=\"amt\" value=\"") + 24, str.indexOf("\"><input name=\"txncurr\""))
			log.info("Asserting amt now ! ------>" + str);
			Assert(str, expectedResult[needAssertArray[key]], "Assert amt");
		}
	} else if ("txncurr" == needAssertArray[key]) {
		log.info("Asserting---" + needAssertArray[key] + "----->[" + responseCode + "] And [" + expectedResult[needAssertArray[key]] + "]");
		if (responseObj.indexOf("input name=\"txncurr\"") != -1) {
			log.info("Asserting txncurr now !");
			var str = responseObj;
			str = str.substring(str.indexOf("input name=\"txncurr\" value=\"") + 28, str.indexOf("\"><input name=\"txnid\""))
			log.info("Asserting txncurr now ! ------>" + str);
			Assert(str, expectedResult[needAssertArray[key]], "Assert txncurr");
		}
	} else if ("channelType" == needAssertArray[key]) {
		log.info("Asserting---" + needAssertArray[key] + "----->[" + responseCode + "] And [" + expectedResult[needAssertArray[key]] + "]");
		if (responseObj.indexOf("input name=\"channelType\"") != -1) {
			log.info("Asserting channelType now !");
			var str = responseObj;
			str = str.substring(str.indexOf("input name=\"channelType\" value=\"") + 32, str.indexOf("\"><input name=\"paymentMethod\""))
			log.info("Asserting channelType now ! ------>" + str);
			Assert(str, expectedResult[needAssertArray[key]], "Assert channelType");
		}
	} else if ("paymentMethod" == needAssertArray[key]) {
		log.info("Asserting---" + needAssertArray[key] + "----->[" + responseCode + "] And [" + expectedResult[needAssertArray[key]] + "]");
		if (responseObj.indexOf("input name=\"paymentMethod\"") != -1) {
			log.info("Asserting paymentMethod now !");
			var str = responseObj;
			str = str.substring(str.indexOf("input name=\"paymentMethod\" value=\"") + 34, str.indexOf("\"><input name=\"ru\""))
			log.info("Asserting paymentMethod now ! ------>" + str);
			Assert(str, expectedResult[needAssertArray[key]], "Assert paymentMethod");
		}
	} else if ("respcode" == needAssertArray[key]) {
		log.info("Asserting---" + needAssertArray[key] + "----->[" + responseCode + "] And [" + expectedResult[needAssertArray[key]] + "]");
		if (responseObj.indexOf("input name=\"respcode\"") != -1) {
			log.info("Asserting respcode now !");
			var str = responseObj;
			str = str.substring(str.indexOf("input name=\"respcode\" value=\"") + 29, str.indexOf("\"><input name=\"respdesc\""))
			log.info("Asserting respcode now ! ------>" + str);
			Assert(str, expectedResult[needAssertArray[key]], "Assert respcode");
		}
	} else if ("respdesc" == needAssertArray[key]) {
		log.info("Asserting---" + needAssertArray[key] + "----->[" + responseCode + "] And [" + expectedResult[needAssertArray[key]] + "]");
		if (responseObj.indexOf("input name=\"respdesc\"") != -1) {
			log.info("Asserting respdesc now !");
			var str = responseObj;
			str = str.substring(str.indexOf("input name=\"respdesc\" value=\"") + 29, str.indexOf("\"><input name=\"proc_code\""))
			log.info("Asserting respdesc now ! ------>" + str);
			Assert(str, expectedResult[needAssertArray[key]], "Assert respdesc");
		}
	} else if ("errorCode" == needAssertArray[key]) {
		log.info("Asserting---" + needAssertArray[key] + "----->[" + responseCode + "] And [" + expectedResult[needAssertArray[key]] + "]");
		if (responseObj.indexOf("input name=\"errorCode\"") != -1) {
			log.info("Asserting errorCode now !");
			var str = responseObj;
			str = str.substring(str.indexOf("input name=\"errorCode\" value=\"") + 30, str.indexOf("\"><input name=\"errorDesc\""))
			log.info("Asserting errorCode now ! ------>" + str);
			Assert(str, expectedResult[needAssertArray[key]], "Assert errorCode");
		}
	} else if ("errorDesc" == needAssertArray[key]) {
		log.info("Asserting---" + needAssertArray[key] + "----->[" + responseCode + "] And [" + expectedResult[needAssertArray[key]] + "]");
		if (responseObj.indexOf("input name=\"errorDesc\"") != -1) {
			log.info("Asserting errorDesc now !");
			var str = responseObj;
			str = str.substring(str.indexOf("input name=\"errorDesc\" value=\"") + 30, str.indexOf("\"></form>"))
			log.info("Asserting errorDesc now ! ------>" + str);
			Assert(str, expectedResult[needAssertArray[key]], "Assert errorDesc");
		}
	}
}

if (vars.getObject("dataObj").if_02_redirect_url) {
	var forwardRespCode = "02";
	if (responseObj.respcode == forwardRespCode && (null == responseObj.redirect_url || undefined == responseObj.redirect_url)) {
		inputErrorLog("Return status code 02, but did not detect the generated redirect_url.");
	}

	if (responseObj.respcode != forwardRespCode && (null != responseObj.redirect_url && undefined != responseObj.redirect_url)) {
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

function inputErrorLog(message) {
	var failureMessage = "[${testDataId}]An error occurred," + message;
	AssertionResult.setFailureMessage(failureMessage);
	AssertionResult.setFailure(true);
	logErrorMessage(failureMessage);
}

function Assert(actual, expected, message) {
	if (expected == null || expected.length == 0) {
		if (actual != null && actual.length != 0) {
			var failureMessage = vars.get("testDataId") + ": " + message + ",look forward to[" + expected + "],Actually[" + actual + "].";
			setAssertionFail(failureMessage);
		}
	} else if (expected.indexOf("#Contains-") >= 0) {
		var strs = new Array();
		strs = expected.split("-");
		if (strs[1] == null || strs[1].length == 0) {
			var failureMessage = vars.get("testDataId") + ": " + message + ",look forward to[" + expected + "],Actually[" + actual + "].";
			setAssertionFail(failureMessage);
		} else {
			if (actual.indexOf(strs[1]) < 0) {
				var failureMessage = vars.get("testDataId") + ": " + message + ",look forward to[" + expected + "],Actually[" + actual + "].";
				setAssertionFail(failureMessage);
			}
		}
	} else if (expected.indexOf("IsNull") >= 0) {
		if (actual != null && actual != "") {
			var failureMessage = vars.get("testDataId") + ":" + message + ",look forward to[" + expected + "],Actually[" + actual + "].";
			log.error("\n=============================================================\n" + failureMessage + "\n=============================================================");
			AssertionResult.setFailureMessage(failureMessage);
			AssertionResult.setFailure(true);

		}
	} else if (expected.indexOf("IsNotNull") >= 0) {
		if (actual == null || actual == "") {
			var failureMessage = vars.get("testDataId") + ":" + message + ",look forward to[" + expected + "],Actually[" + actual + "].";
			log.info("test isNotNull");
			log.error("\n=============================================================\n" + failureMessage + "\n=============================================================");
			AssertionResult.setFailureMessage(failureMessage);
			AssertionResult.setFailure(true);

		}
	} else if (expected.indexOf("@@#-") >= 0) {
		var strArray = new Array();
		strArray = expected.split("-");
		if (strArray[1] == null || strArray[1].length == 0) {
			var failureMessage = vars.get("testDataId") + ": " + message + ",look forward to[" + expected + "],Actually[" + actual + "].";
			setAssertionFail(failureMessage);
		} else {
			if (actual == strArray[1]) {
				var failureMessage = vars.get("testDataId") + ": " + message + ",look forward to[" + expected + "],Actually[" + actual + "].";
				setAssertionFail(failureMessage);
			}
		}
	} else {
		if (typeof expected === 'boolean' && expected) {
			if (actual == "undefined") {
				var failureMessage = vars.get("testDataId") + ": " + message + ",look forward to have value,Actually[" + actual + "].";
				setAssertionFail(failureMessage);
			}
		} else if (actual != expected) {
			var failureMessage = vars.get("testDataId") + ": " + message + ",look forward to[" + expected + "],Actually[" + actual + "].";
			setAssertionFail(failureMessage);
		}
	}
}

function setAssertionFail(failureMessage) {
	vars.put("redirect_url", null);
	AssertionResult.setFailureMessage(failureMessage);
	AssertionResult.setFailure(true);
	logErrorMessage(failureMessage);
}

function logErrorMessage(failureMessage) {
	log.error("\n=============================================================\n" + failureMessage + "\n=============================================================");
}