

function inputErrorLog(message) {
	var failureMessage = "[" + vars.get("testDataId") + "] expected result" + message + ",not found in response log";
	AssertionResult.setFailureMessage(failureMessage);
	AssertionResult.setFailure(true);
	log.error("\n=============================================================\n" + failureMessage + "\n=============================================================");
}+

function Assert(actual, expected, message) {
	if (actual != expected) {
		var failureMessage = vars.get("testDataId") + ":" + message + ",look forward to[" + expected + "],Actually[" + actual + "].";
		log.error("\n=============================================================\n" + failureMessage + "\n=============================================================");
		AssertionResult.setFailureMessage(failureMessage);
		AssertionResult.setFailure(true);
	}
}

function Assert(actual, expected, message) {
	if (expected == null || expected.length == 0) {
		if (actual != null && actual.length != 0) {
			var failureMessage = vars.get("testDataId") + ":" + message + ",look forward to[" + expected + "],Actually[" + actual + "].";
			log.error("\n=============================================================\n" + failureMessage + "\n=============================================================");
			AssertionResult.setFailureMessage(failureMessage);
			AssertionResult.setFailure(true);
		}
	} else if (expected.indexOf("#Contains-") >= 0) {
		var strs = new Array();
		strs = expected.split("-");
		if (strs[1] == null || strs[1].length == 0) {
			var failureMessage = vars.get("testDataId") + ":" + message + ",look forward to[" + expected + "],Actually[" + actual + "].";
			log.error("\n=============================================================\n" + failureMessage + "\n=============================================================");
			AssertionResult.setFailureMessage(failureMessage);
			AssertionResult.setFailure(true);
		} else {
			if (actual.indexOf(strs[1]) < 0) {
				var failureMessage = vars.get("testDataId") + ":" + message + ",look forward to[" + expected + "],Actually[" + actual + "].";
				log.error("\n=============================================================\n" + failureMessage + "\n=============================================================");
				AssertionResult.setFailureMessage(failureMessage);
				AssertionResult.setFailure(true);
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
			var failureMessage = vars.get("testDataId") + ":" + message + ",look forward to[" + expected + "],Actually[" + actual + "].";
			log.error("\n=============================================================\n" + failureMessage + "\n=============================================================");
			AssertionResult.setFailureMessage(failureMessage);
			AssertionResult.setFailure(true);
		} else {
			if (actual == strArray[1]) {
				var failureMessage = vars.get("testDataId") + ":" + message + ",look forward to[" + expected + "],Actually[" + actual + "].";
				log.error("\n=============================================================\n" + failureMessage + "\n=============================================================");
				AssertionResult.setFailureMessage(failureMessage);
				AssertionResult.setFailure(true);
			}
		}
	} else {
		if (actual != expected) {
			var failureMessage = vars.get("testDataId") + ":" + message + ",look forward to[" + expected + "],Actually[" + actual + "].";
			log.error("\n=============================================================\n" + failureMessage + "\n=============================================================");
			AssertionResult.setFailureMessage(failureMessage);
			AssertionResult.setFailure(true);
		}
	}
}



function chuckSystemLogQueries(expectedResult, responseObj) {
	log.info("expectedResult-------->" + JSON.stringify(expectedResult) + "+responseObj------>" + JSON.stringify(responseObj));
	var raw;
	for (var key in expectedResult) {
		var expectedKey = expectedResult[key];
		if (expectedKey.length <= 0) {
			log.info("------------------------------->no expectedResult");
		} else if (expectedResult[key][0].indexOf("IsNull") >= 0) {
			log.info("------------------------------->log is null");
			raw = "IsNull";
			log.info("------------------------------->log is null2" + raw);
			if (JSON.stringify(responseObj).indexOf("{\"systemQuery1\":[]}") == -1) {
				log.info("------------------------------->log is null1");
				AssertionResult.setFailure(true);
			}
		} else if (expectedKey.length == 1) {
			if (expectedResult[key][0] == "Callback Json does not exist") {
				log.info("jsonDatas----------------------->" + jsonDatas.paymentLink.txncurr + jsonDatas.paymentLink.callbackUrl);
				var callbackurl = jsonDatas.paymentLink.callbackUrl;
				if (callbackurl == null || callbackurl.length == 0 || callbackurl == undefined) {
					raw = expectedResult[key][0];
					log.info("jsonDatas1------------------111222222----->" + raw);
				}
			} else {
				for (var i in responseObj[key]) {
					var respArray = responseObj[key][i];
					if (JSON.stringify(respArray).indexOf(expectedResult[key][0]) > -1) {
						raw = JSON.stringify(respArray);
						log.info("expectedResult[key][0]------------------------------->" + raw);
					}
				}
			}
		} else if (expectedKey.length > 1) {
			log.info("expectedResult------------------------------->" + JSON.stringify(expectedResult[key]));
			for (var i in responseObj[key]) {
				var respArray = responseObj[key][i];
				log.info("respArray------------------------------->" + JSON.stringify(respArray));

				if (respArray) {
					for (var j in expectedResult[key]) {
						log.info("expectedResult------------------------------->" + expectedResult[key][j]);
						if (JSON.stringify(respArray).indexOf(expectedResult[key][j]) == -1) {
							raw = null;
							break;
						} else {
							raw = JSON.stringify(respArray);
						}

					}
				}
				if (raw != null) {
					break;
				}
			}
		}
	}
	if (null == raw) {
		inputErrorLog(JSON.stringify(expectedResult));
	}

}

function chuck(expectedResult, responseObj) {
	var expectedResultJson = expectedResult;
	var responseObjJson = responseObj;
	log.info("expectedResultJson----------------------------------->" + JSON.stringify(expectedResultJson));
	log.info("responseObjJson-------------------------------------->" + JSON.stringify(responseObjJson));

	chuckSystemLogQueries(expectedResultJson.systemLogQueries, responseObjJson.systemLogQueries);
}

var responseBody = prev.getResponseDataAsString();

log.info("\n${testDataId}:Request body" + prev.getSamplerData());
log.info("\n${testDataId}:Response Info" + responseBody);

log.info("dataObj----------------------->" + JSON.stringify(vars.getObject("dataObj")));
var expectedResult = vars.getObject("dataObj").expectedResult;

var jsonDatas = JSON.parse(vars.get("jsonData"));

SampleResult.setNttrefid(vars.get("nttrefid"));
SampleResult.setTxnid(vars.get("resultTxnid"));
log.info("See TxnidNttrefidLOG Value-------------------------");

var responseObj = JSON.parse(prev.getResponseDataAsString());
chuck(expectedResult, responseObj);




