var caserefs;
var summary;
var casebook;
var viewmode = 0;
var response;
var c_case_id;
var c_stage_id;
var video_links;
var survey;

$(document).ready(function()
{

	if(getCookie("COURSERA_SUBMISSION_TOKEN") == "")
	{
		//create a dummy cookie
		setCookie("COURSERA_SUBMISSION_TOKEN", generateRandomString(32), 1);
		console.log("Dummy cookie:" + getCookie("COURSERA_SUBMISSION_TOKEN"));
	}

	$.get('/api/session/',function(data){
		console.log("session data");
		console.log(data);
	})

	$("#pageContent").append('<image class="loader" src="assets/ajax-loader.gif">');
	$('#home').hide();

	$.post("/api/login/",	function(data)
	{
		console.log("logged in " + data);
		viewmode = 0;
		getSummary()

		.then(_=>{
			return getSurvey();
		})

		.then(_=>
		{
			if(survey.offer_consent)
			{
				//present the consent form
				$('.consent.modal').modal();
				var d = $('<div style="margin:10px" class="control-group"></div>')
				d.append(getConsent())
				$('.modal-body.improveSleuth').append(d);
			}
			else if(survey.offer_rookie_survey)
			{
				var surveyMessage = "Hey kid, before we go any further I'd like to know a bit more about you; what floats your boat etc. <BR></BR>"
				surveyMessage += "Your resume was a bit thin on details and we're doing a study about how to improve Sleuth. <BR></BR>"
				surveyMessage += "You can find out more about our study <a href='https://docs.google.com/document/d/1BbdHhGZq2aHdHrLEqPznYpI71TSxoOAF3DqaMiNO9zA/edit?usp=sharing' target='_blank'>here</a>"
				chiefMessage(surveyMessage);
				viewmode = 3;
			}
			else if(survey.offer_pro_survey)
			{
				var surveyMessage = "Hey kid, Now that you're nearly done with Sleuth, would you mind answering a few more questions ? <BR></BR>";
				surveyMessage += "We're interested in how you found solving code crimes to help us with our study about how to improve Sleuth. <BR></BR>"
				surveyMessage += "You can find out more about our study <a href='https://docs.google.com/document/d/1BbdHhGZq2aHdHrLEqPznYpI71TSxoOAF3DqaMiNO9zA/edit?usp=sharing' target='_blank'>here</a>"
				chiefMessage(surveyMessage);
				viewmode = 4;
			}
			else
			{
				createLoginSummary();
			}
		});
	})

	.fail(function(error)
	{
		alert( "error: " + error);
	})


	// $('#banner').click(function(e)
	// {
	// 	if(summary != undefined)
	// 	{
	// 		viewmode = 0;
	// 		updateViewMode();
	// 	}
	// })

	$('#home').click(function(e)
	{
		if(summary != undefined)
		{
			viewmode = 0;
			updateViewMode();
		}
	})

	$('.caseReport.modal').on('hidden.bs.modal', function (e)
	{
		if(response.chiefMessage != undefined)
		{
			chiefMessage(response.chiefMessage);
		}
		else
		{
			$.get('/api/casebook/', function(data)
			{
				casebook = data;
				createCrimePage(c_case_id, c_stage_id);
				response = null;
			});
		}
	})

	$('.chiefMessage.modal').on('hidden.bs.modal', function (e)
	{

		if(response)
		{
			var stage = casebook[c_case_id * 4 + c_stage_id];

			if(response.grade == 1.0 || stage.status == "suspended")
			{
				viewmode = 2;
			}

			response = null;
			updateViewMode();
		}
		else if(viewmode == 0 || viewmode >= 3)
		{
			updateViewMode();
		}


	})

	$('.consent.modal').on('hidden.bs.modal', function (e)
	{
		var a = $('#agreeConsent').prop("checked");
		$.post('/api/updatesurvey/', {consent: a, consent_offered: true});
		createLoginSummary();
	})

	//shouldn't need this
	// $.getJSON('video_links.json', function(data)
	// {
	// 		video_links = data;
	// });



});







/////////////////////////////////////////HELPERS////////////////////////////////

function updateViewMode()
{

	console.log("updateViewMode");

	if(summary.status != "rookie" && summary.status != "pro" && summary.status != "pro-over")
	{
		console.log(summary.status);
		return;
	}

	if(viewmode == 0)
	{
		createFrontPage();
	}
	else if(viewmode == 1)
	{
		createSummary();
	}
	else if(viewmode == 2)
	{
		createCasebook();
	}
	else if(viewmode == 3)
	{
		$('#back').hide();
		createSurvey("rookie");
	}
	else if(viewmode == 4)
	{
		$('#back').hide();
		createSurvey("pro");
	}
	else
	{
		createAbout();
	}
}

function createFrontPage()
{
	$('#home').hide();
	$("#pageContent").empty();
	$("#pageContent").css("background", "none");
	$("#pageContent").css("text-align", "center");
	var d = $("<div style='margin-top:2.5em'></div>");
	var a = $("<div style='margin-top:1.5em'><button class='btn btn-lg btn-secondary' id='summary'>How am I doing ?</button></div>");
	var b = $("<div style='margin-top:1.5em'><button class='btn btn-lg btn-secondary' id='casebook'>Lets solve some crimes ... </button></div>");
	var c = $("<div style='margin-top:1.5em'><button class='btn btn-lg btn-secondary' id='about'>About Sleuth</button></div>");
	d.append(a);
	d.append(b);
	d.append(c);
	$("#pageContent").append(d);

	$('#summary').click(function(){
		viewmode = 1;
		updateViewMode();
	});

	$('#casebook').click(function(){
		viewmode = 2;
		updateViewMode();
	});

	$('#about').click(function(){
		viewmode = 5;
		updateViewMode();
	});

}

function createSummary()
{
	getSummary()

	.then(_=>
	{
		$("#pageContent").empty();
		$('#home').show();
		updateSummary();
	})

}

function createLoginSummary()
{
	getSummary()
	.then(_=>
	{
		var s = "Hey there kiddo,<br>";

		if(summary.status == "rookie")
		{
			s += "Your rookie score is currently " + Math.round(summary.rookie_score) + "%<br>";
			s +=  "You have " + Math.floor(summary.rookie_remaining) + " days remaining till you turn pro.<br>";
			s += summary.feedback;
		}
		else if(summary.status == "rookie-over")
		{
			s += "It looks like you're still accessing Sleuth from the rookie assignment.<br>";
			s += "The rookie stage is now over. Please access Sleuth from the pro assignment."
		}
		else if(summary.status == "pro-early")
		{
			s += "It looks like you're accessing Sleuth from the pro assignment.<br>";
			s += "The pro stage doesn't start for another " + Math.ceil(Math.abs(summary.pro_remaining)) + " days.<br>";
			s += "Until then, please access Sleuth from the rookie assignment."
		}
		else if(summary.status == "pro")
		{
			s += "Your pro score is currently " + Math.round(summary.pro_score) + "%<br>";
			s += "You have " + Math.floor(summary.pro_remaining) + " days remaining till Sleuth ends.<br>";
			s += summary.feedback;
		}
		else if(summary.status == "pro-over")
		{
			s += "Sleuth is now finished, but you can still check your grades here.";

		}
		chiefMessage(s);
	})



}

function createCasebook()
{
	$('#home').show();
	$("#pageContent").empty();
	$("#pageContent").css("background", "none");
	$("#pageContent").css("text-align", "center");
	var promises = [];

	//load the student summary
	promises.push(getSummary());

	//load the casedetails
	promises.push(
	new Promise(function(resolve, reject)
	{
		$.get('/api/caserefs/', function(data)
		{
			caserefs = data;
			resolve();
		});
	})
	);

	//load the casedata
	promises.push(
	new Promise(function(resolve, reject)
	{
		$.get('/api/casebook/', function(data)
		{
			casebook = data;
			console.log("casebook updated")
			resolve();
		});
	})
	);

	Promise.all(promises).then(updateCasebook);


}

function createCrimePage(case_id, stage_id)
{

	$('#home').show();
	$("#pageContent").empty();
	$("#pageContent").css("background", "none");
	$("#pageContent").css("text-align", "center");

	stage_id = Number(stage_id);
	case_id = Number(case_id);
	c_case_id = case_id; //globals
	c_stage_id = stage_id;

	var _case = caserefs[case_id];
	var stage = casebook[case_id * 4 + stage_id];

	if(stage.status == "solved")
	{
		$("#pageContent").css("background", 'url("assets/solvedDiag.png") 50% 50%');
		$("#pageContent").css("background-repeat", 'no-repeat');
	}
	else if(stage.status == "suspended")
	{
		$("#pageContent").css("background", 'url("assets/suspendedDiag.png") 50% 50%');
		$("#pageContent").css("background-repeat", 'no-repeat');
	}

	var r = $("<div class='row' style ='margin-top: 2em'></div>");

	var d = $("<div class='col-sm' style='text-align: left'></div>");
	var caseString = "Case: " +  _case.idx  + " - " + _case.description;
	d.append($("<p class='casetitle'>" + caseString +"</p>"));
	var stageString = "Stage: " + (stage_id+1) + " - " + _case.stages[stage_id];
	d.append($("<p class='casetitle'>" + stageString +"</p>"));

	d.append($("<p class='casetitle'>Status: " + stage.status +"</p>"));
	var c = (stage.high_score) ? Number(stage.high_score) * 100 : 0;
	d.append($("<p class='casetitle'>Complete: " + c +" %</p>"));
	var remaining = Math.max(0,5 - Number(stage.current_uploads));
	d.append($("<p class='casetitle'>Remaining attempts: " + remaining + "</p>"));
	d.append($("<p class='casetitle'>Current CaseNum: " + stage.current_job_ref + "</p>"));

	d.append($("<p class='casetitle'>Required skills: </p>"));
	d.append($("<ul><ul>"));
	for(var i = 0; i < _case.topics.length; i++)
	{
		d.append($("<li>" + _case.topics[i] +"</li>"));
	}



	r.append(d);

	d = $("<div  class='col-sm' style ='margin-top: 2em'></div>");
	d.append("<div style ='margin-top: 3em'><button class='btn btn-lg btn-secondary download' id='download_" +
	case_id + "_" + stage_id + "'>download crime</button></div>");


	// var s = `
	// <div class="input-group" style ='margin-top: 4em'>
	// 	<div class="custom-file">
	// 		<input type="file" class="custom-file-input" id="file-input">
	// 		<label class="custom-file-label" for="file-input" id="file-label">select the sketch.js file</label>
	// 	</div>
	// </div>
	// `

//custom file input not working on Docker deploy ??
	var s = `
	<div class="input-group" style ='margin-top: 4em'>
		<div class="custom-file">
			<input type="file" id="file-input">
			<label class="custom-file-label" for="file-input" id="file-label">select the sketch.js file</label>
		</div>
	</div>
	`



	d.append(s);
	d.append("<div style ='margin-top: 2em'><button class='btn btn-secondary upload' id='upload_" +
	case_id + "_" + stage_id +"' disabled>submit solution</button></div>");

	// if(stage_id == 0 && video_links[_case.idx] != undefined)
	// {
	// 	d.append($("<p class='casetitle'></p>")); // some padding
	// 	d.append($("<p class='casetitle'>Video help: </p>"));
	// 	d.append("<a href='" + video_links[_case.idx] + "'>watch here</a>")
	// }

	if(stage.current_job_ref)
	{
		d.append("<div style ='margin-top: 1em'><button class='btn btn-sm btn-secondary feedback' id='feedback_" +
		case_id + "_" + stage_id + "'>read feedback</button></div>");
	}

	r.append(d);
	$("#pageContent").append(r);


	if(stage.status == "suspended")
	{
		$(".download").prop("disabled", true);
		$("#file-input").prop("disabled", true);
	}

	//event handlers
	$(".download").click(function(e)
	{
		var r = /download_(\d)_(\d)/;
		var m = r.exec(e.target.id);

		//TODO add a method to check if a case is available first (could be client-side or not)
		window.location.href = "/api/gencase/?case_idx=" + _case.idx + "&stage_id=" + stage_id + "&uuid=" + summary.uuid;

	})

	$("#file-input").change(function(e){

		var fInput = $('#file-input')[0];

		if(fInput.files.length == 0)
		{
			$(".upload").prop("disabled", true);
			return;
		}
		else
		{
			if(fInput.files[0].name != "sketch.js")
			{
				chiefMessage("Hey ! You need to select the sketch.js file");
				$(".upload").prop("disabled", true);
			}
			//REMOVED THIS DUE TO CROSS PLATFORM ISSUES
			// else if(fInput.files[0].type != "application/javascript")
			// {
			// 	//won't actually fire
			// 	chiefMessage("Hey ! This is the wrong type of file.\n It needs to be sketch.js.");
			// 	$(".upload").prop("disabled", true);
			// }
			else
			{
				//lets get the case number
				var fr = new FileReader();
				fr.onload = function()
				{
					var pat = /CaseNum:\s?(\d{3})-(\d{1})-(\d{8})-(\d{4,6})/g;
					var m = pat.exec(fr.result);
					if(m == null)
					{
						chiefMessage("There is no valid case number in this file.");
						$(".upload").prop("disabled", true);
					}
					else
					{
						$('#file-label').html(m[0]);
						$(".upload").prop("disabled", false);
					}
				}

				fr.readAsText(fInput.files[0]);
			}



		}
	})

	$(".upload").click(function(e)
	{
		var r = /upload_(\d)_(\d)/;
		var m = r.exec(e.target.id);
		//console.log(m[1], m[2]);

		var fInput = $('#file-input')[0];

		if(fInput.files.length == 0)
		{
			chiefMessage("You need to choose a file to submit.");
			return;
		}
		else
		{

			$(".upload").prop("disabled", true);
			$("#pageContent").append('<image class="loader" src="assets/ajax-loader.gif">');

			var file = fInput.files[0];

			//TODO check extension is correct

			var fr = new FileReader();
			fr.onload = function()
			{
				response = null;
				$.ajax({
					url: '/api/gradecase/*',
					type: 'POST',
					contentType: 'application/json',
					cache: false,
					data: JSON.stringify({
						'case_num': _case.idx,
						'stage_id': stage_id,
						'sketchStr': fr.result,
						'uuid': summary.uuid
					}),
					success: function(r)
					{
						$(".upload").prop("disabled", false);
						if(typeof(r) == "string")
						{
							chiefMessage(r);
						}
						else
						{
							response = r;
							caseReport();
						}

					},
					statusCode:
					{
						400: function(jqXHR, textStatus, errorThrown)
						{
							console.log("400 message");
							chiefMessage(jqXHR.responseText);
							$.get('/api/casebook/', function(data)
							{
								casebook = data;
								createCrimePage(case_id, stage_id);
							});
						}
					}
				});
			}

			fr.readAsText(file);

		}

	})

	$('.feedback').click(function(e)
	{
		var r = /feedback_(\d)_(\d)/;
		var m = r.exec(e.target.id);
		console.log(m[1], m[2]);
		$.get("/api/attempt/", {caseref: stage.current_job_ref}, function(data)
		{
			if(typeof(r) == "string")
			{
				chiefMessage(r);
			}
			else
			{
				response = data;
				caseReport();
			}

		});
	})

}

function createSurvey(surveyType)
{

	$("#pageContent").empty();

	var fp = (surveyType == "rookie") ? 'rookie_survey.json' : 'pro_survey.json';

	$.getJSON(fp, function(data)
	{

		var f = $('<form id="surveyForm"></form>');

		var k = Object.keys(data);

		for(var i  = 0; i < k.length; i++)
		{
			var d = $('<div style="text-align:left; margin-top:25px" class="control-group"></div>')
			d.append('<p>Question ' + (i+1) +". " + data[k[i]].prompt + '</p>')

			if(data[k[i]].answers.type == "mc")
			{
				for(var j = 0; j < data[k[i]].answers.options.length; j++)
				{
					var r = $('<div class="form-check"></div>');
					r.append($('<input class="form-check-input" type="radio" name="'+k[i]+'" id="' + k[i] + '_' + j + '">'));
					r.append($('<label for="' + k[i] + '_' + j + '"> ' + data[k[i]].answers.options[j] + '</label>'));
					d.append(r);
				}
			}
			else if(data[k[i]].answers.type == "number")
			{
				var r = $('<div class="form-check"></div>');
				var input = $("<input type='number' id='" + k[i] + "'> " +  data[k[i]].answers.unit + "</input>");
				//input.attr("value", data[k[i]].answers.min);
				input.attr("min", data[k[i]].answers.min);
				input.attr("max", data[k[i]].answers.max);
				r.append(input);
				d.append(r);
			}
			else if(data[k[i]].answers.type == "freetext")
			{
				var r = $('<div class="form-check"></div>');
				var input = $("<textarea class='form-control' id='" + k[i] + "' rows='3'></textarea>");
				r.append(input);
				d.append(r);
			}

			f.append(d);

		}

		if(!survey.consent)
		{
			var d = $('<div style="text-align:left; margin-top:50px" class="control-group"></div>')
			d.append(getConsent())
			f.append(d);
		}

		var d = $('<div style="text-align: right; margin-top: 20px"><button class="btn btn-submit btn-secondary" id="submit">Submit & continue</button></div>')
		f.append(d);

		$('#pageContent').append(f);

		$('#submit').on('click',function(e)
		{
			var incomplete = [];
			var response = {};
			for(var i  = 0; i < k.length; i++)
			{
				if(data[k[i]].answers.type == "mc")
				{
					for(var j = 0; j < data[k[i]].answers.options.length; j++)
					{
						if($('#' + k[i] + "_" + j).prop("checked"))
						{
							response[k[i]] = Number(j);
							break;
						}

					}
				}
				else
				{
					response[k[i]] = $('#' + k[i]).val();
				}

				if((response[k[i]] == undefined || (response[k[i]] == "" && typeof(response[k[i]]) == "string")) && !data[k[i]].isoptional)
				{
					incomplete.push(i);
				}

			}

			if(incomplete.length > 0)
			{
				var s = "You still have to answer questions ";
				for(var i = 0; i < incomplete.length; i++)
				{
					s += (incomplete[i] + 1)
					if(i < incomplete.length - 2)
					{
						s += ", ";
					}
					else if(i < incomplete.length - 1)
					{
						s += " and ";
					}
				}
				alert(s);
			}
			else
			{

				if(surveyType == "rookie")
				{
					survey.rookie_survey_responses = response;
					survey.rookie_survey_completed = true;
				}
				else
				{
					survey.pro_survey_responses = response;
					survey.pro_survey_completed = true;
				}

				survey.consent = $('#agreeConsent').prop("checked");
				$.post('./api/updatesurvey/',survey);
				viewmode = 0;
				createLoginSummary();
			}

			e.preventDefault();
		})

	});



}

function createAbout()
{
	$('#home').show();
	$("#pageContent").empty();
	$("#pageContent").css("background", "none");
	$("#pageContent").css("text-align", "left");

	$("#pageContent").append("<h2>About</h2>");
	$("#pageContent").append("<p>Sleuth is a film noir themed crime adventure which teaches you the fundamentals of programming.</p>");
	$("#pageContent").append("<p>In the adventure, you are a fledgling private investigator working for Sleuth and Co detective agency. Your job is to use your programming skills to solve code crimes which are arranged into cases.</p>");
	$("#pageContent").append("<p>In total there are sixteen code cases to crack. Initially you will be a rookie and you will only see nine cases. At the mid-point of this course you will turn pro and another seven cases will be released. You can't add to your rookie grade once you've gone pro so it's important to start work right away.</p>");
	$("#pageContent").append("<p>During your adventure the chief will keep you on track. We're all relying on you. Good luck kid.</p>");
	$("#pageContent").append("<h2>Credits</h2>");
	$("#pageContent").append("<p>Game design & lead dev: Simon Katan</p>");
	$("#pageContent").append("<p>Co-developer: Edward Anstead</p>");
	$("#pageContent").append("<p>Co-developer: Lior Ben-Gai</p>");
	$("#pageContent").append("<p>Illustration: Paris Selinas</p>");
	$("#pageContent").append("<p>Supported by Goldsmiths University, University of London, Coursera</p>");
}

function updateSummary()
{

	$("#pageContent").empty();
	$("#pageContent").css("background", "none");
	$("#pageContent").css("text-align", "left");


	// var k = Object.keys(summary);
	// for(var i = 0; i < k.length; i++)
	// {
	// 	$('#pageContent').append("<div>" + k[i] + ": " + summary[k[i]] + "</div>");
	// }

	//TODO: implement this as the officer number and store in DB ?

	$('#pageContent').append("<div class='casetitle'>Officer Number: " + summary.officer_num + "</div>");

	if(summary["status"] == "rookie" || summary["status"] == "pro")
	{
		$('#pageContent').append("<div class='casetitle'>Experience: " + summary["status"]+ "</div>");
	}

	$('#pageContent').append("<div class='casetitle'>Rookie score: " + Math.round(summary["rookie_score"]) + "%</div>");

	if(summary["status"] == "pro" || summary["status"] == "pro-over")
	{
		$('#pageContent').append("<div class='casetitle'>Pro score: " + Math.round(summary["pro_score"]) + "%</div>");
	}

	if(summary["status"] == "rookie")
	{
		$('#pageContent').append("<div class='casetitle'>Days remaining till pro: " + Math.floor(summary.rookie_remaining) + "</div>");
	}
	else if(summary["status"] == "pro")
	{
		$('#pageContent').append("<div class='casetitle'>Days remaining till Sleuth ends: " + Math.floor(summary.pro_remaining) + "</div>");
	}

	$('#pageContent').append("<div class='casetitle'>Number of case attempts: " + summary["num_uploads"] + "</div>");
	$('#pageContent').append("<div class='casetitle'>Highest case attempted: " + summary["highest_case_upload"] + "</div>");

	var t = Math.max(summary["last_download"], summary["last_upload"]);
	if(t == 0)
	{
		t = summary["last_login"];
	}
	var d = new Date();
	d.setTime(t);

	$('#pageContent').append("<div class='casetitle'>Last activity: " + d.toLocaleString() + "</div>");


	if(summary["status"] == "rookie" || summary["status"] == "pro")
	{
		$('#pageContent').append("<div class='casetitle'><br>Feedback from the chief:<br>" + summary["feedback"] + "</div>");
	}

}

function updateCasebook()
{
	//fill the DOM
	var table = $('<table class="table table-borderless" style="text-align: left; min-width: 850px"></table>');
	var body = $('<tbody></tbody>');
	for(var i = 0; i < caserefs.length; i++)
	{

		if(caserefs[i].pro && summary.status == "rookie")continue;

		let row = $("<tr class='d-flex' style='margin-bottom: 30px'></tr>");
		row.append("<th class='col-3 casebooktitle' scope='row'>Case " + caserefs[i].idx + ":<br>" + caserefs[i].description + "</th>");


		for(var j = 0; j < caserefs[i].stages.length; j++)
		{
			let d = $("<td class='col-2' style='position: relative; top: 0; left: 0'></td>");
			let b = $('<button type="button" style="white-space: normal; position: relative; top: 0; left: 0; z-index: 1" class="btn btn-block crime" id="crime_' + i + '_' + j + '">' + caserefs[i].stages[j] +'</button>');

			if(casebook[i * 4 + j].status == "hidden")
			{
				b.prop("disabled", true);
				b.addClass("btn-outline-secondary");
			}
			else if(casebook[i * 4 + j].status == "open")
			{
				b.addClass("btn-secondary");

			}
			else if(casebook[i * 4 + j].status == "solved")
			{
				b.addClass("btn-secondary");
				d.append("<img src='assets/solvedDiag2.png' style='position: absolute; z-index: 2; left:0px; top: -20px; width: 75px '>");
			}
			else if(casebook[i * 4 + j].status == "suspended")
			{
				b.addClass("btn-secondary");
				b.prop("disabled", true);
				d.append("<img src='assets/suspendedDiag2.png' style='position: absolute; z-index: 2; left:0px; top: -20px; width: 100px '>");
			}


			d.append(b);
			row.append(d);
		}

		body.append(row);
	}

	table.append(body);
	$('#pageContent').append(table);

	$('.crime').click(function(e){

		if(summary.status == "pro-over")
		{
			chiefMessage("Hey kiddo, Sleuth is now closed.");
		}
		else
		{
			var r = /crime_(\d{1,2})_(\d)/;
			var m = r.exec(e.target.id);
			createCrimePage(m[1], m[2]);
		}
	})


}

function chiefMessage(text)
{
	$('.chiefMessage.modal-body').html("<p style='text-align:left'>" + text + "</p>");
	$('.chiefMessage.modal').modal();
}

function caseReport()
{

	if(!response)return;

	var s = "<p>";

	s += "Case: " + response.caseNum + "</br>";
	s += "Stage: " + (Number(response.stage) + 1) + "</br>";
	s += "Crime solved: " + response.success + "</br>";
	s += "Complete: " + response.grade * 100 + " %</br>";
	s += "</p>"

	if(response.achievements.length > 0 )
	{
		s += "<p>Achievements:<br>";

		for(var i = 0; i < response.achievements.length; i++)
		{
			s += response.achievements[i] + "</br>"
		}

		s += "</p>";
	}

	if(response.improvements.length > 0 )
	{
		s += "<p>Improvements:<br>";

		for(var i = 0; i < response.improvements.length; i++)
		{
			s += response.improvements[i] + "</br>"
		}

		s += "</p>";
	}

	$('.caseReport.modal-body').html(s);
	$('.caseReport.modal').modal();

}

function generateRandomString(numchars)
{
	var s = "";
	var alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890";

	for(var i = 0; i < numchars; i++)
	{
		s += alpha[Math.floor(Math.random() * alpha.length)];
	}

	return s;
}

function setCookie(cname, cvalue, exdays)
{
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires="+d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname)
{
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i <ca.length; i++)
	{
		var c = ca[i];
		while (c.charAt(0) == ' ')
		{
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function getSummary()
{
	return new Promise(function(resolve, reject)
	{
		$.get('/api/summary/', function(data)
		{
			summary = data;
			resolve();
		});
	})
}

function getSurvey()
{
	return new Promise(function(resolve, reject)
	{
		$.get('/api/survey/', function(data)
		{
			survey = data;
			console.log("survey data found");
			resolve();
		})

		.fail(function()
		{
			console.log("survey data not found");
			resolve();
		})

	})
}

function dropData()
{
	$.post('/api/dropdbs/');
}

function getConsent()
{
	var d = $('<div></div>');
	d.append('<p>Allow us to use your anonymised data to improve Sleuth and publish research.</p>');
	d.append('<input type="checkbox" class="form-check-input" id="agreeConsent" checked>');
	d.append('<label class="form-check-label" for="agreeConsent">I agree that my data can be used according to<a href="https://docs.google.com/document/d/1vnju4hG9W4R4ieDUW_C00ZwH8ax8lUqYp9NZHoW8fR0/edit?usp=sharing"> these conditions</a></label>');
	return d;
}
