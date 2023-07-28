var jsonData = JSON.parse(vars.get("jsonData"));
var testFlow = jsonData.testFlow;
var currenctTestFlow = testFlow.shift();
var home_path;
vars.putObject("testFlow", testFlow);
vars.put("requestType", currenctTestFlow.split("-")[0]);
vars.put("currenctDataObjSet", currenctTestFlow.split("-")[1]);
vars.put("testDataId", jsonData.testDataId);
vars.put("skip", jsonData.Skip);



vars.put("SkipDB", props.get("SkipDB"));
vars.put("SkipLog", props.get("SkipLog"));
vars.put("browser",props.get("browser"));
vars.put("browsers",jsonData.browsers);
vars.put("chromeDriver",props.get("chromeDriver"));
vars.put("geckoDriver",props.get("geckoDriver"));
vars.put("environment",props.get("environment"));
vars.put("remoteUrl",props.get("remoteUrl"));
vars.put("home_path",props.get("homeDirectory"));
log.info("XQY home path" + vars.get("home_path"));
log.info("see value -----------------------chromeDriver--->"+props.get("chromeDriver"));