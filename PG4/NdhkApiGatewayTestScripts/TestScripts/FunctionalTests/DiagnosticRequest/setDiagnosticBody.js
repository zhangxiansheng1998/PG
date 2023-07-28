var dataObj = vars.getObject("dataObj");
var jsonData = JSON.parse(vars.get("jsonData"));
var rnttrefid1;
var rnttrefid;
vars.put("signatureKey", props.get(jsonData.merchantId + "SignatureKey"));

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

var signMix = dataObj.body.signMix;
var jsonsignMix = {};
var diagnosticBody;
var signMixlist = signMix.toString();
log.info("XQY signMixlist" + signMixlist);
if (signMix.toString() == "nttrefid") {
    log.info("dataObj.signMix----------------------------->" + dataObj.body.signMix);
    for (var key in signMix) {
        jsonsignMix[signMix[key]] = vars.get(signMix[key]);
    }
    log.info("dataObj.body----------------------------->" + JSON.stringify(dataObj.body));

    diagnosticBody = JSON.parse(JSON.stringify(dataObj.body).signMixRepleas(jsonsignMix));
    log.info("di111111111111111-------------------->" + JSON.stringify(diagnosticBody));
} else if (signMix.toString() == "reportId") {
    log.info("dataObj.signMix----------------------------->" + dataObj.body.signMix);
    for (var key in signMix) {
        jsonsignMix[signMix[key]] = vars.get(signMix[key]);
    }
    log.info("dataObj.body----------------------------->" + JSON.stringify(dataObj.body));
    diagnosticBody = JSON.parse(JSON.stringify(dataObj.body).signMixRepleas(jsonsignMix));
    log.info("di111111111111111-------------------->" + JSON.stringify(diagnosticBody));
}
else if (signMix.toString() == "threeDSReferenceId1") {
    log.info("dataObj.signMix----------------------------->" + dataObj.body.signMix);
    for (var key in signMix) {
        jsonsignMix[signMix[key]] = vars.get("threeDSReferenceId1");
    }
    log.info("dataObj.body----------------------------->" + JSON.stringify(dataObj.body));
    diagnosticBody = JSON.parse(JSON.stringify(dataObj.body).signMixRepleas(jsonsignMix));
    log.info("XQY threeDSReferenceId1-------------------->" + JSON.stringify(diagnosticBody));
}else if (signMix.toString() == "rnttrefid") {
    log.info("dataObj.signMix----------------------------->" + dataObj.body.signMix);
    for (var key in signMix) {
        rnttrefid1 = Number(vars.get("nttrefid")) + 7;
        rnttrefid =  String (rnttrefid1);
        jsonsignMix[signMix[key]] = rnttrefid;
    }
    log.info("dataObj.body----------------------------->" + JSON.stringify(dataObj.body));
    diagnosticBody = JSON.parse(JSON.stringify(dataObj.body).signMixRepleas(jsonsignMix));
    log.info("XQY rnttrefid-------------------->" + JSON.stringify(diagnosticBody));
}else if (signMix.toString() == "threeDSReferenceId2") {
    log.info("dataObj.signMix----------------------------->" + dataObj.body.signMix);
    for (var key in signMix) {
        jsonsignMix[signMix[key]] = vars.get("threeDSReferenceId2");
    }
    log.info("dataObj.body----------------------------->" + JSON.stringify(dataObj.body));
    diagnosticBody = JSON.parse(JSON.stringify(dataObj.body).signMixRepleas(jsonsignMix));
    log.info("XQY threeDSReferenceId2-------------------->" + JSON.stringify(diagnosticBody));
}else if (signMix.toString() == "gatewayReferenceId") {
    log.info("dataObj.signMix----------------------------->" + dataObj.body.signMix);
    for (var key in signMix) {
        jsonsignMix[signMix[key]] = vars.get(signMix[key]);
    }
    log.info("dataObj.body----------------------------->" + JSON.stringify(dataObj.body));
    diagnosticBody = JSON.parse(JSON.stringify(dataObj.body).signMixRepleas(jsonsignMix));
    log.info("di111111111111111-------------------->" + JSON.stringify(diagnosticBody));
} else if (signMix.toString() == "captureReferenceId") {
    log.info("dataObj.signMix----------------------------->" + dataObj.body.signMix);
    for (var key in signMix) {
        jsonsignMix[signMix[key]] = vars.get(signMix[key]);
    }
    log.info("dataObj.body----------------------------->" + JSON.stringify(dataObj.body));
    diagnosticBody = JSON.parse(JSON.stringify(dataObj.body).signMixRepleas(jsonsignMix));
    log.info("di111111111111111-------------------->" + JSON.stringify(diagnosticBody));
} else if (signMix.toString() == "sv") {
    log.info("dataObj.signMix----------------------------->" + dataObj.body.signMix);
    for (var key in signMix) {
        jsonsignMix[signMix[key]] = vars.get("sv");
    }
    log.info("dataObj.body----------------------------->" + JSON.stringify(dataObj.body));
    diagnosticBody = JSON.parse(JSON.stringify(dataObj.body).signMixRepleas(jsonsignMix));
    log.info("di111111111111111-------------------->" + JSON.stringify(diagnosticBody));
}else if (signMix.toString() == "refundId") {
    log.info("dataObj.signMix----------------------------->" + dataObj.body.signMix);
    for (var key in signMix) {
        jsonsignMix[signMix[key]] = vars.get(signMix[key]);
    }
    log.info("dataObj.body----------------------------->" + JSON.stringify(dataObj.body));
    diagnosticBody = JSON.parse(JSON.stringify(dataObj.body).signMixRepleas(jsonsignMix));
    log.info("di111111111111111-------------------->" + JSON.stringify(diagnosticBody));
} else if (signMix.toString() == "memberId") {
    log.info("dataObj.signMix----------------------------->" + dataObj.body.signMix);
    for (var key in signMix) {
        log.info("memberId: " + vars.get("generate_memberId"));
        jsonsignMix[signMix[key]] = vars.get("generate_memberId");
    }
    log.info("dataObj.body----------------------------->" + JSON.stringify(dataObj.body));
    diagnosticBody = JSON.parse(JSON.stringify(dataObj.body).signMixRepleas(jsonsignMix));
    log.info("di111111111111111-------------------->" + JSON.stringify(diagnosticBody));
} else if (signMix.toString() == "token") {
    for (var key in signMix) {
        jsonsignMix[signMix[key]] = vars.get("token");
    }
    log.info("dataObj.body----------------------------->" + JSON.stringify(dataObj.body));

    diagnosticBody = JSON.parse(JSON.stringify(dataObj.body).signMixRepleas(jsonsignMix));
    log.info("di111111111111111-------------------->" + JSON.stringify(diagnosticBody));
} else if (signMix.toString() == "refundRefNum") {
    for (var key in signMix) {
        jsonsignMix[signMix[key]] = vars.get("refundRefNum");
    }
    log.info("dataObj.body----------------------------->" + JSON.stringify(dataObj.body));

    diagnosticBody = JSON.parse(JSON.stringify(dataObj.body).signMixRepleas(jsonsignMix));
    log.info("di111111111111111-------------------->" + JSON.stringify(diagnosticBody));
} else if (signMix.toString() == "threeDSServerTransID") {
    for (var key in signMix) {
        jsonsignMix[signMix[key]] = vars.get("threeDSServerTransID");
    }
    log.info("dataObj.body----------------------------->" + JSON.stringify(dataObj.body));
    diagnosticBody = JSON.parse(JSON.stringify(dataObj.body).signMixRepleas(jsonsignMix));
    log.info("threeDSServerTransID 111-------------------->" + JSON.stringify(diagnosticBody));
} else if (signMix.toString() == "CardTokenReferenceNo") {
    log.info("dataObj.signMix_CardTokenReferenceNo----------------------------->" + dataObj.body.signMix);
    for (var key in signMix) {
        jsonsignMix[signMix[key]] = vars.get("CardTokenReferenceNo");
    }
    log.info("dataObj.body----------------------------->" + JSON.stringify(dataObj.body));
    diagnosticBody = JSON.parse(JSON.stringify(dataObj.body).signMixRepleas(jsonsignMix));
    log.info("CardTokenReferenceNo 111-------------------->" + JSON.stringify(diagnosticBody));
} else if (signMix.toString() == "tokenId") {
    log.info("dataObj.signMix_tokenId----------------------------->" + dataObj.body.signMix);
    for (var key in signMix) {
        jsonsignMix[signMix[key]] = vars.get("tokenId");
    }
    log.info("dataObj.body----------------------------->" + JSON.stringify(dataObj.body));
    diagnosticBody = JSON.parse(JSON.stringify(dataObj.body).signMixRepleas(jsonsignMix));
    log.info("tokenId 111-------------------->" + JSON.stringify(diagnosticBody));
}else if (signMix.toString() == "hptoken") {
    log.info("dataObj.signMix_hptoken----------------------------->" + dataObj.body.signMix);
    for (var key in signMix) {
        jsonsignMix[signMix[key]] = vars.get("hptoken");
    }
    log.info("dataObj.body----------------------------->" + JSON.stringify(dataObj.body));
    diagnosticBody = JSON.parse(JSON.stringify(dataObj.body).signMixRepleas(jsonsignMix));
    log.info("hptoken 111-------------------->" + JSON.stringify(diagnosticBody));
} else if (signMix.toString().indexOf("nttrefid") >= 0 && signMix.toString().indexOf("authorizationCode1") >= 0) {
    log.info("XQY get in the path")
    jsonsignMix[signMix[0]] = vars.get("nttrefid");
    jsonsignMix[signMix[1]] = vars.get("authorizationCode1");
    log.info("dataObj.body----------------------------->" + JSON.stringify(dataObj.body));
    diagnosticBody = JSON.parse(JSON.stringify(dataObj.body).signMixRepleas(jsonsignMix));
    log.info("authorizationCode 111-------------------->" + JSON.stringify(diagnosticBody));
} else if (signMix.toString().indexOf("nttrefid") >= 0 && signMix.toString().indexOf("rnttrefid") >= 0) {
    log.info("XQY get in the rnttrefid path")
    jsonsignMix[signMix[0]] = vars.get("nttrefid");
    rnttrefid1 = Number(vars.get("nttrefid")) + 7;
    rnttrefid =  String (rnttrefid1);
    jsonsignMix[signMix[1]] = rnttrefid;
    log.info("dataObj.body----------------------------->" + JSON.stringify(dataObj.body));
    diagnosticBody = JSON.parse(JSON.stringify(dataObj.body).signMixRepleas(jsonsignMix));
    log.info("Double query for hase Cash dollar 111-------------------->" + JSON.stringify(diagnosticBody));
}else if (vars.get("generate_txnid") != null) {
    for (var key in signMix) {
        jsonsignMix[signMix[key]] = vars.get("generate_txnid");
    }
    log.info("dataObj.body----------------------------->" + JSON.stringify(dataObj.body));

    diagnosticBody = JSON.parse(JSON.stringify(dataObj.body).signMixRepleas(jsonsignMix));
    log.info("booking_id for v1-------------------->" + JSON.stringify(diagnosticBody));
} else {
    for (var key in signMix) {
        jsonsignMix[signMix[key]] = vars.get("generate_transactionId");
    }
    log.info("dataObj.body----------------------------->" + JSON.stringify(dataObj.body));

    diagnosticBody = JSON.parse(JSON.stringify(dataObj.body).signMixRepleas(jsonsignMix));
    log.info("booking_id for v2-------------------->" + JSON.stringify(diagnosticBody));
}
var env = props.get("envirnoment").toLowerCase();
log.info("di1env------------------->" + env + "DB");
diagnosticBody = JSON.parse(JSON.stringify(diagnosticBody).replace("uatDB", env + "DB"));
delete diagnosticBody.signMix;

vars.putObject("diagnosticBody", diagnosticBody);
log.info("diagnosticBody----------------------------->" + JSON.stringify(diagnosticBody));
var login = dataObj.body.login;

var dbqstring = JSON.stringify(diagnosticBody.databaseQueries);
dbqstring = (dbqstring === undefined) ? "" : dbqstring;

log.info("xqy dbsting" + dbqstring);

var slqstring = JSON.stringify(diagnosticBody.systemLogQueries);

slqstring = (slqstring === undefined) ? "" : slqstring;
log.info("dbqstring------------------->" + dbqstring);
log.info("slqstring------------------->" + slqstring);
vars.put("signatureData", login + dbqstring + slqstring);
