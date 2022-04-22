//get stage
var stage = casebook[c_case_id * 4 + c_stage_id];
$.get("/api/attempt/", { caseref: stage.current_job_ref }, function (data) {
    if (typeof (r) == "string") {
        chiefMessage(r);
    }
    else {
        response = data;
        caseReport();
    }

});