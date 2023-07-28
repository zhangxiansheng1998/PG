var jsonData = JSON.parse(vars.get("jsonData"));
var requestType = vars.get("requestType");
var currenctDataObjSet = vars.get("currenctDataObjSet");
var dataObj = jsonData[currenctDataObjSet];
vars.putObject("dataObj", dataObj);
vars.putObject("dataPay", JSON.stringify(jsonData[vars.get("currenctDataObjSet")]));

log.info("see value  --------browser1----------->"+jsonData["payPage"]);