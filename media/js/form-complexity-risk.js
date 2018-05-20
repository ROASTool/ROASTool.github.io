var FormComplexityRisk = function () {

	return {

		init: function () {

			var form = $('#submit_form');
			var error = $('.alert-error', form);
			var success = $('.alert-success', form);

			form.validate({
				doNotHideMessage: true,
				errorElement: 'span',
				errorClass: 'help-inline',
				focusInvalid: false,
				rules: {
					cost: {
						required: true
					},
					novelty: {
						required: true
					},
					duration: {
						required: true
					},
					reach: {
						required: true
					},
					agencyExperience: {
						required: true
					},
					dependence: {
						required: true
					},
					procurement: {
						required: true
					},
					peakHR: {
						required: true
					},
					HRAvailability: {
						required: true
					}
				},

				errorPlacement: function (error, element) {
					if (element.attr("name") == "cost") {
						error.addClass("no-left-padding").insertAfter("#cost_error");
					} else if (element.attr("name") == "novelty") {
						error.addClass("no-left-padding").insertAfter("#novelty_error");
					} else if (element.attr("name") == "duration") {
						error.addClass("no-left-padding").insertAfter("#duration_error");
					} else if (element.attr("name") == "reach") {
						error.addClass("no-left-padding").insertAfter("#reach_error");
					} else if (element.attr("name") == "agencyExperience") {
						error.addClass("no-left-padding").insertAfter("#agencyExperience_error");
					} else if (element.attr("name") == "dependence") {
						error.addClass("no-left-padding").insertAfter("#dependence_error");
					} else if (element.attr("name") == "procurement") {
						error.addClass("no-left-padding").insertAfter("#procurement_error");
					} else if (element.attr("name") == "peakHR") {
						error.addClass("no-left-padding").insertAfter("#peakHR_error");
					} else if (element.attr("name") == "HRAvailability") {
						error.addClass("no-left-padding").insertAfter("#HRAvailability_error");
					} else {
						error.insertAfter(element);
					}
				},

				invalidHandler: function (event, validator) {  
					success.hide();
					error.show();
					App.scrollTo(error, -200);
				},

				highlight: function (element) {
					$(element).closest('.help-inline').removeClass('ok');
					$(element).closest('.control-group').removeClass('success').addClass('error');
				},

				unhighlight: function (element) {
					$(element).closest('.control-group').removeClass('error');
				},

				success: function (label) {
					label.addClass('valid ok').closest('.control-group').removeClass('error').addClass('success');
				},

				submitHandler: function (form) {
					success.show();
					error.hide();

					let projects = JSON.parse(window.localStorage.getItem("projects"));
					let current_project = parseInt(window.localStorage.getItem("current_project"));

					projects[current_project].complexityRisk.cost = $("input[name='cost']:checked").val();
					projects[current_project].complexityRisk.novelty = $("input[name='novelty']:checked").val();
					projects[current_project].complexityRisk.duration = $("input[name='duration']:checked").val();
					projects[current_project].complexityRisk.reach = $("input[name='reach']:checked").val();
					projects[current_project].complexityRisk.agencyExperience = $("input[name='agencyExperience']:checked").val();
					projects[current_project].complexityRisk.dependence = $("input[name='dependence']:checked").val();
					projects[current_project].complexityRisk.procurement = $("input[name='procurement']:checked").val();
					projects[current_project].complexityRisk.peakHR = $("input[name='peakHR']:checked").val();
					projects[current_project].complexityRisk.HRAvailability = $("input[name='HRAvailability']:checked").val();

					window.localStorage.setItem("projects", JSON.stringify(projects));

					alert("Data updated!");
				}

			});

		}

	};

}();
