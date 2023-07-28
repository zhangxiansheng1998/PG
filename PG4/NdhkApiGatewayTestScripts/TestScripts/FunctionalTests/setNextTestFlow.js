var testFlow = vars.getObject("testFlow");
var currenctTestFlow = testFlow.shift();
vars.putObject("testFlow", testFlow);

if(currenctTestFlow != undefined){
	log.info("currenctTestFlow: " + currenctTestFlow);
	vars.put("requestType", currenctTestFlow.split("-")[0]);
	vars.put("currenctDataObjSet", currenctTestFlow.split("-")[1]);
} else {
	vars.put("requestType", currenctTestFlow);
	log.info("currenctTestFlow is undefined: ");
}

log.info("Set Next Test Flow");