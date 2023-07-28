log.info("XQY Check Process");
var xfullstring = prev.getResponseDataAsString();
log.info("XQYJT" + xfullstring);
var LogResponseData = JSON.parse(prev.getResponseDataAsString());
var data1 = LogResponseData.systemLogQueries.systemQuery1;
var xdata;
var xdata1;
var xdata2;
var xdata3;
var ydata1;
var ydata2;
var ydata3;
var odata;
var odata1;
var odata2;
var odata3;
var zdata1;
var zdata2;
var zdata3;
var wdata1;
var wdata2;
var wdata3;
var pdata1;
var pdata2;
var pdata3;
var hdata;
var hdata1;
var hdata2;
var hdata3;
var hdata4;
var hdata5;
var hdata6;
var hdata7;
var verificationValue;
var dsTxnId;
var acsTransID;
var CardTokenReferenceNo;
var hptoken;
var rdata;
var rdata1;
var rdata2;
var rdata3;
var rdata4;
var rdata5;
var rdata6;
var rdata7;
var rdata8;
var rdata9;



for (i in data1) {
    var stringdata = JSON.stringify(data1[i]);
    if (stringdata.indexOf("acsTransID") > -1 && stringdata.indexOf("dsTxnId") > -1) {
        log.info("XQYHT" + stringdata);
        log.info("XQYHT1");
        odata = stringdata.split(",");
        odata1 = odata[8];
        odata2 = odata[9];
        odata3 = odata[12];
        log.info("XQYHT11" + "verificationValue origin" + odata1);
        log.info("XQYHT12" + "dsTxnId origin" + odata2);
        log.info("XQYHT13" + "acsTransID origin" + odata3);
        zdata1 = odata1.split(":");
        zdata2 = odata2.split(":");
        zdata3 = odata3.split(":");
        log.info("XQYHT111" + "verificationValue modify1" + zdata1[1]);
        log.info("XQYHT112" + "dsTxnId modify2" + zdata2[1]);
        log.info("XQYHT113" + "acsTransID modify3" + zdata3[1]);
        wdata1 = zdata1[1].split("\"");
        wdata2 = zdata2[1].split("\"");
        wdata3 = zdata3[1].split("\"");
        log.info("XQYHT1111" + "verificationValue modify1" + wdata1[1]);
        log.info("XQYHT1112" + "dsTxnId modify2" + wdata2[1]);
        log.info("XQYHT1113" + "acsTransID modify3" + wdata3[1]);
        pdata1 = wdata1[1].split("\\");
        pdata2 = wdata2[1].split("\\");
        pdata3 = wdata3[1].split("\\");
        log.info("XQYHT11111" + "verificationValue modify1" + pdata1[0]);
        log.info("XQYHT11112" + "dsTxnId modify2" + pdata2[0]);
        log.info("XQYHT11113" + "acsTransID modify3" + pdata3[0]);
        vars.put("dsTxnId", pdata2[0]);
        vars.put("acsTransID", pdata3[0]);
        vars.put("verificationValue", pdata1[0]);

    };
    if (stringdata.indexOf("CardTokenReferenceNo") > -1) {
        log.info("XQYLY" + stringdata);
        log.info("XQYLY1");
        xdata = stringdata.split(",");
        xdata1 = xdata[18];
        log.info("XQY33" + xdata1);
        log.info("XQY22");
        ydata1 = xdata1.split("=");
        ydata2 = ydata1[1];
        log.info("XQY11" + ydata2);
        vars.put("CardTokenReferenceNo", ydata2);
    }
    if ((stringdata.indexOf("Callback Json") > -1) && (stringdata.indexOf("tokenization") > -1) && (stringdata.indexOf("token") > -1)) {
        log.info("XQYHPtoken" + stringdata);
        hdata = stringdata.split(",");
        hdata1 = hdata[20];
        log.info("XQYHPtoken1" + hdata1);
        hdata2 = hdata1.split(":");
        hdata3 = hdata2[1];
        log.info("XQYHPtoken2" + hdata3);
        hdata4 = hdata3.split("\"");
        hdata5 = hdata4[1];
        log.info("XQYHPtoken3" + hdata5);
        hdata6 = hdata5.split("\\");
        hdata7 = hdata6[0];
        log.info("XQYHPtoken4" + hdata7);
        vars.put("hptoken", hdata7);
    }
    if ((stringdata.indexOf("nttRequest with") > -1)) {
        log.info("XQYHPfailedrefid" + stringdata);
        rdata = stringdata.split(",");
        rdata1 = rdata[1];
        log.info("XQYHPfailedrefid1" + rdata1);
        rdata2 = rdata1.split("]");
        rdata3 = rdata2[2];
        log.info("XQYHPfailedrefid2" + rdata3);
        rdata4 =rdata3.split(":");
        rdata5 = rdata4[1];
        log.info("XQYHPfailedrefid3" + rdata5);
        rdata6 = rdata5.split("-"); 
        rdata7 = rdata6[0];
        log.info("XQYHPfailedrefid4" + rdata7);
        rdata8 = rdata7.split(" ");
        rdata9 = rdata8[3];
        log.info("XQYHPfailedrefid5" + rdata9);
        vars.put("nttrefid",rdata9)
    }

}

