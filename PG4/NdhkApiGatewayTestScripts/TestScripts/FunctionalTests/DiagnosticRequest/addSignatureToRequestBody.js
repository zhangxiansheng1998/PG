var diagnosticBody = vars.getObject("diagnosticBody");
diagnosticBody["signature"] = vars.get("signature");
vars.put("diagnosticBody", JSON.stringify(diagnosticBody));