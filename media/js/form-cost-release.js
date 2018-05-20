var FormCostRelease = function () {

	return {

		init: function () {
			if (!jQuery().bootstrapWizard) {
				return;
			}

			var form = $('#submit_form');
			var error = $('.alert-error', form);
			var success = $('.alert-success', form);

			form.validate({
				doNotHideMessage: true,
				errorElement: 'span',
				errorClass: 'validate-inline',
				focusInvalid: false,
				rules: {
					quaterNumber: {
						digits: true,
						required: true,
						range: [1, 5]
					},
					fteNumberCost: {
						digits: true,
						required: true
					},
					operatingMoneyCost: {
						digits: true,
						required: true
					},
					fteNumberRelease: {
						digits: true,
						required: true
					},
					operatingMoneyRelease: {
						digits: true,
						required: true
					}
				},

				errorPlacement: function (error, element) {
					error.insertAfter(element);
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

					projects[current_project].costRelease.quaterNumberPhase1 = $("#quaterNumberPhase1").val();
					projects[current_project].costRelease.fteNumberCostPhase1 = $("#fteNumberCostPhase1").val();
					projects[current_project].costRelease.operatingMoneyCostPhase1 = $("#operatingMoneyCostPhase1").val();

					projects[current_project].costRelease.quaterNumberPhase2 = $("#quaterNumberPhase2").val();
					projects[current_project].costRelease.fteNumberCostPhase2 = $("#fteNumberCostPhase2").val();
					projects[current_project].costRelease.operatingMoneyCostPhase2 = $("#operatingMoneyCostPhase2").val();
					projects[current_project].costRelease.fteNumberReleasePhase2 = $("#fteNumberReleasePhase2").val();
					projects[current_project].costRelease.operatingMoneyReleasePhase2 = $("#operatingMoneyReleasePhase2").val();

					projects[current_project].costRelease.quaterNumberPhase3 = $("#quaterNumberPhase3").val();
					projects[current_project].costRelease.fteNumberCostPhase3 = $("#fteNumberCostPhase3").val();
					projects[current_project].costRelease.operatingMoneyCostPhase3 = $("#operatingMoneyCostPhase3").val();
					projects[current_project].costRelease.fteNumberReleasePhase3 = $("#fteNumberReleasePhase3").val();
					projects[current_project].costRelease.operatingMoneyReleasePhase3 = $("#operatingMoneyReleasePhase3").val();

					window.localStorage.setItem("projects", JSON.stringify(projects));

					alert("Data updated!");
				}

			});

			$('#form_cost_release').bootstrapWizard({
				'nextSelector': '.button-next',
				'previousSelector': '.button-previous',
				onTabClick: function (tab, navigation, index) {
					alert('on tab click disabled');
					return false;
				},
				onNext: function (tab, navigation, index) {
					success.hide();
					error.hide();

					if (form.valid() == false) {
						return false;
					}

					var total = navigation.find('li').length;
					var current = index + 1;

					$('.step-title', $('#form_cost_release')).text('Step ' + (index + 1) + ' of ' + total);

					jQuery('li', $('#form_cost_release')).removeClass("done");
					var li_list = navigation.find('li');
					for (var i = 0; i < index; i++) {
						jQuery(li_list[i]).addClass("done");
					}

					if (current == 1) {
						$('#form_cost_release').find('.button-previous').hide();
					} else {
						$('#form_cost_release').find('.button-previous').show();
					}

					if (current >= total) {
						$('#form_cost_release').find('.button-next').hide();
						$('#form_cost_release').find('button[name="submit"]').show();
					} else {
						$('#form_cost_release').find('.button-next').show();
						$('#form_cost_release').find('button[name="submit"]').hide();
					}
					App.scrollTo($('.page-title'));
				},
				onPrevious: function (tab, navigation, index) {
					success.hide();
					error.hide();

					var total = navigation.find('li').length;
					var current = index + 1;

					$('.step-title', $('#form_cost_release')).text('Step ' + (index + 1) + ' of ' + total);

					jQuery('li', $('#form_cost_release')).removeClass("done");
					var li_list = navigation.find('li');
					for (var i = 0; i < index; i++) {
						jQuery(li_list[i]).addClass("done");
					}

					if (current == 1) {
						$('#form_cost_release').find('.button-previous').hide();
					} else {
						$('#form_cost_release').find('.button-previous').show();
					}

					if (current >= total) {
						$('#form_cost_release').find('.button-next').hide();
						$('#form_cost_release').find('button[name="submit"]').show();
					} else {
						$('#form_cost_release').find('.button-next').show();
						$('#form_cost_release').find('button[name="submit"]').hide();
					}

					App.scrollTo($('.page-title'));
				},
				onTabShow: function (tab, navigation, index) {
					var total = navigation.find('li').length;
					var current = index + 1;
					var $percent = (current / total) * 100;
					$('#form_cost_release').find('.bar').css({
						width: $percent + '%'
					});
				}
			});

			$('#form_cost_release').find('.button-previous').hide();
			$('#form_cost_release button[name="submit"]').hide();
		}

	};

}();
