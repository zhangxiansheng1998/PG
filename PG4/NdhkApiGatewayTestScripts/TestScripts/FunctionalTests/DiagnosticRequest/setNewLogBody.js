var dataObj = vars.getObject("dataObj");


String.prototype.signMixRepleas = function () {
	if (arguments.length === 0) return this;
	var param = arguments[0], str = this;
	if (typeof (param) === 'object') {
		for (var key in param)
			str = str.replace(new RegExp("\\{" + key + "\\}", "g"), param[key]);
		return str;
	} else {
		for (var i = 0; i < arguments.length; i++)
			str = str.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i]);
		return str;
	}
}

//var signMix = dataObj.body.signMix;
//var jsonsignMix = {};
//log.info("dataObj.signMix----------------------------->"+dataObj.body.signMix);
//for(var key in signMix){
//	jsonsignMix[signMix[key]] = vars.get(signMix[key]);
//}
//var diagnosticBody = JSON.parse(JSON.stringify(dataObj.body).signMixRepleas(jsonsignMix));
//delete diagnosticBody.signMix;
log.info("dataObj----------------------------->" + dataObj.body);
var diagnosticBody = JSON.parse(JSON.stringify(dataObj.body));

var date = new Date();
var str = date.toLocaleDateString("yyyy-MM-dd");
log.info("str-------------------------->" + str);
var subStr = date.toLocaleTimeString();
log.info("subStr-------------------------->" + subStr);
var dateSubtraction = formatDateSubtraction(date);
log.info("dateSubtraction-------------------------->" + dateSubtraction.toLocaleTimeString());
var diagnosticBody = JSON.parse(JSON.stringify(dataObj.body).replace("{{startDateTime}}", str + " " + dateSubtraction.toLocaleTimeString()));
log.info("str----------------------------->" + JSON.stringify(diagnosticBody));
var querys = dataObj.body.systemLogQueries.systemQuery1.query;
log.info("querys----------------------------->" + querys);
//diagnosticBody = JSON.parse(JSON.stringify(diagnosticBody).replace("{{startDateTime}}", str+" 00:00:00"));
var dateAddition = formatDateAddition(date);
log.info("dateAddition-------------------------->" + dateAddition.toLocaleTimeString());
diagnosticBody = JSON.parse(JSON.stringify(diagnosticBody).replace("{{endDateTime}}", str + " " + dateAddition.toLocaleTimeString()));
if (querys == '{{query}}') {
	diagnosticBody = JSON.parse(JSON.stringify(diagnosticBody).replace("{{query}}", vars.get("nttrefid")));
}
if (querys.indexOf("{{query}}") != -1 && querys != '{{query}}') {
	log.info("16/05/2022 querys refid + XXX----------------------------->" + querys);
	diagnosticBody = JSON.parse(JSON.stringify(diagnosticBody).replace("{{query}}", vars.get("nttrefid")));
}
if (querys == '{{reuse}}') {
	diagnosticBody = JSON.parse(JSON.stringify(diagnosticBody).replace("{{reuse}}", vars.get("generate_txnid") || vars.get("generate_transactionId")));
}
if (querys == '{{token}}') {
	diagnosticBody = JSON.parse(JSON.stringify(diagnosticBody).replace("{{token}}", vars.get("token")));
}

if (querys == '{{threeDSServerTransID}}') {
	diagnosticBody = JSON.parse(JSON.stringify(diagnosticBody).replace("{{threeDSServerTransID}}", vars.get("threeDSServerTransID")));
}


if (querys == '{{authorizationCode1}}') {
	diagnosticBody = JSON.parse(JSON.stringify(diagnosticBody).replace("{{authorizationCode1}}", vars.get("authorizationCode1")));
}
var logProvider = dataObj.body.systemLogQueries.systemQuery1.logProvider;
if (logProvider == 'splunk') {
	log.info("=====logProvider=======" + logProvider);
	var logQuery = diagnosticBody.systemLogQueries.systemQuery1.query;
	log.info("=====logQuery=======" + logQuery);
	diagnosticBody.systemLogQueries.systemQuery1.query = logQuery.replace(/\s+/g, " ");
	log.info("=====logQuery===replace====" + diagnosticBody.systemLogQueries.systemQuery1.query);
}
log.info("2222222222222222222222222222222222222222222222222222222222222222");
var logGroup = props.get("logGroup");
var logStream = props.get("logStream");
diagnosticBody = JSON.parse(JSON.stringify(diagnosticBody).replace("{{logGroup}}", logGroup));
diagnosticBody = JSON.parse(JSON.stringify(diagnosticBody).replace("{{logStream}}", logStream));

vars.putObject("diagnosticBody", diagnosticBody)
log.info("diagnosticBody----------------------------->" + JSON.stringify(diagnosticBody));

var login = dataObj.body.login;//vars.get("login");

var dbqstring = JSON.stringify(diagnosticBody.databaseQueries);
log.info("333333333333333333333333333333333333333333333333333333333333333333" + dbqstring);
dbqstring = (dbqstring === undefined) ? "" : dbqstring;

var slqstring = JSON.stringify(diagnosticBody.systemLogQueries);

slqstring = (slqstring === undefined) ? "" : slqstring;
log.info("dbqstring------------------->" + dbqstring);
log.info("slqstring------------------->" + slqstring);
vars.put("signatureData", login + dbqstring + slqstring);
log.info("signatureData" + login + dbqstring + slqstring);
function formatDateSubtraction(date) {
	var timezones = 'UTC+' + (0 - new Date().getTimezoneOffset() / 60);
	log.info(timezones);
	if (timezones.indexOf("8") > -1) {
		timeStr = new Date(date.getTime() - 1.5 * 60000);
	}
	//  timeStr = new Date(date.getTime()-5*60000);
	else {
		log.info("XQY need to change the timezone related time");
		timeStr = new Date(date.getTime() - 1.5 * 60000 + 8 * 60 * 60000);
	}
	return timeStr;
}


function formatDateAddition(date) {
	var timezonea = 'UTC+' + (0 - new Date().getTimezoneOffset() / 60);
	log.info(timezonea);
	if (timezonea.indexOf("8") > -1) {
		timeStr = new Date(date.getTime() + 1.5 * 60000);
	}
	else {
		log.info("XQY need to change the timezone related time");
		timeStr = new Date(date.getTime() + 1.5 * 60000 + 8 * 60 * 60000);
	}


	return timeStr;
}

