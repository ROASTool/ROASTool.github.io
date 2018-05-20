var FormRenameProject = function () {

	return {

		init: function () {

			var form = $('#rename_form');
			var error = $('.alert-error', form);
			var success = $('.alert-success', form);

			form.validate({
				doNotHideMessage: true,
				errorElement: 'span',
				errorClass: 'help-inline',
				focusInvalid: false,
				rules: {
					newTitle: {
						required: true,
						maxlength: 20
					},
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

					projects[current_project].title = $("#newTitle").val();
					window.localStorage.setItem("projects", JSON.stringify(projects));
					
					window.reload();
				}

			});

		}

	};

}();
