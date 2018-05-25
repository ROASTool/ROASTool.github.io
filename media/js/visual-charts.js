var VisualCharts = function () {

	return {

		initCharts: function() {

			Chart.defaults.global.defaultFontFamily = "Arial";
			Chart.defaults.global.defaultFontSize = 12;
			Chart.defaults.global.defaultFontColor = "#777";

			let costReleaseChart = new Chart($("canvas[name='costReleaseChart']"), {
				type: "barError",
				data: {
					labels: [],
					datasets: [],
					error: []
				},
				options: {
					responsive: true,
					maintainAspectRatio: false,
					title: {
						display: true,
						text: "Nothing to show, please create new project",
						fontSize: 19
					},
					legend: {
						position: "bottom"
					},
					scales: {
						yAxes: [{
							ticks: {
								userCallback: function(value, index, values) {
									if (value <= 1 && value >= -1) {
										value = Math.round(value * 100000);
									}
									if (value % 1 == 0) {
										if (value < 0) {
											value = value.toString();
											operator = value.substr(0, 1);
											value = value.substr(1, value.length - 1);
											value = value.split(/(?=(?:...)*$)/);
											value = value.join(",");
											return (operator + value);
										} else {
											value = value.toString();
											value = value.split(/(?=(?:...)*$)/);
											value = value.join(",");
											return value;
										}
									}
								},
								beginAtZero: true
							},
						}]
					},
					tooltips: {
						callbacks: {
							label: function(tooltipItem, data) {
								var value = data.datasets[0].data[tooltipItem.index];
								if (value < 0) {
									value = value.toString();
									operator = value.substr(0, 1);
									value = value.substr(1, value.length - 1);
									value = value.split(/(?=(?:...)*$)/);
									value = value.join(",");
									return (operator + value);
								} else {
									value = value.toString();
									value = value.split(/(?=(?:...)*$)/);
									value = value.join(",");
									return value;
								}
							}
						},
						enabled: true
					}
				},
			});

			let complexityRiskChart1 = new Chart($("canvas[name='complexityRiskChart1']"), {
				type: "polarArea",
				data: {
					labels: [],
					datasets: []
				},
				options: {
					responsive: true,
					maintainAspectRatio: false,
					title: {
						display: true,
						text: "Nothing to show, please create new project",
						fontSize: 19
					},
					legend: {
						position: "bottom"
					},
					scale: {
						ticks: {
							max: 5.0,
							min: 0.0
						}
					},
					tooltips: {
						enabled: true
					}
				}
			});

			let complexityRiskChart2 = new Chart($("canvas[name='complexityRiskChart2']"), {
				type: "polarArea",
				data: {
					labels: [],
					datasets: []
				},
				options: {
					responsive: true,
					maintainAspectRatio: false,
					title: {
						display: true,
						text: "Nothing to show, please create new project",
						fontSize: 19
					},
					legend:{
						position: "bottom"
					},
					scale: {
						ticks: {
							max: 5.0,
							min: 0.0
						}
					},
					tooltips: {
						enabled: true
					}
				}
			});

			function displayCharts() {
				if($("#selectProject1").val() != null) {
					let projects = JSON.parse(window.localStorage.getItem("projects"));
					let project1 = projects[$("#selectProject1").val()];

					// fetch data from project1 for cost and release graph
					let project1QuaterNumberPhase1 = parseInt(project1.costRelease.quaterNumberPhase1);
					let project1QuaterNumberPhase2 = parseInt(project1.costRelease.quaterNumberPhase2);
					let project1QuaterNumberPhase3 = parseInt(project1.costRelease.quaterNumberPhase3);
					let project1TotalQuaterNumber = project1QuaterNumberPhase1 + project1QuaterNumberPhase2 + project1QuaterNumberPhase3;

					// fetch data from project1 for complexity and risk graph
					let project1Factor1 = parseInt(project1.complexityRisk.cost);
					let project1Factor2 = parseInt(project1.complexityRisk.novelty);
					let project1Factor3 = parseInt(project1.complexityRisk.duration);
					let project1Factor4 = parseInt(project1.complexityRisk.reach);
					let project1Factor5 = parseInt(project1.complexityRisk.agencyExperience);
					let project1Factor6 = parseInt(project1.complexityRisk.dependence);
					let project1Factor7 = parseInt(project1.complexityRisk.procurement);
					let project1Factor8 = parseInt(project1.complexityRisk.peakHR);
					let project1Factor9 = parseInt(project1.complexityRisk.HRAvailability);

					let project1Uncertainty = project1Factor1 + project1Factor2 + project1Factor3
					+ project1Factor4 + project1Factor5 + project1Factor6 + project1Factor7
					+ project1Factor8 + project1Factor9;

					let project1CostData = [];
					let project1ReleaseData = [];
					let project1Error = [];

					let project1CostPhase1 = -(parseInt(project1.costRelease.fteNumberCostPhase1) * 100000 + parseInt(project1.costRelease.operatingMoneyCostPhase1));
					let project1ReleasePhase1 = 0;
					let project1ErrorPhase1 = null;

					for (let i = 1; i <= project1QuaterNumberPhase1; i++) {
						project1CostData.push(project1CostPhase1);
						project1ReleaseData.push(project1ReleasePhase1);
						project1Error.push(project1ErrorPhase1);
					}

					let project1CostPhase2 = -(parseInt(project1.costRelease.fteNumberCostPhase2) * 100000 + parseInt(project1.costRelease.operatingMoneyCostPhase2));
					let project1ReleasePhase2 = parseInt(project1.costRelease.fteNumberReleasePhase2) * 100000 + parseInt(project1.costRelease.operatingMoneyReleasePhase2);
					let project1ErrorPhase2 = project1Uncertainty / 45 * project1ReleasePhase2;

					for (let i = 1; i <= project1QuaterNumberPhase2; i++) {
						project1CostData.push(project1CostPhase2);
						project1ReleaseData.push(project1ReleasePhase2);
						project1Error.push(project1ErrorPhase2);
					}

					let project1CostPhase3 = -(parseInt(project1.costRelease.fteNumberCostPhase3) * 100000 + parseInt(project1.costRelease.operatingMoneyCostPhase3));
					let project1ReleasePhase3 = parseInt(project1.costRelease.fteNumberReleasePhase3) * 100000 + parseInt(project1.costRelease.operatingMoneyReleasePhase3);
					let project1ErrorPhase3 = project1Uncertainty / 45 * project1ReleasePhase3;

					for (let i = 1; i <= project1QuaterNumberPhase3; i++) {
						project1CostData.push(project1CostPhase3);
						project1ReleaseData.push(project1ReleasePhase3);
						project1Error.push(project1ErrorPhase3);
					}

					// for project1 only, the total quater number is its duration
					let projectTotalQuaterNumber = project1TotalQuaterNumber;

					// write data from project1 to cost and release graph
					let project1Cost = {
						label: "Cost of " + project1.title,
						data: project1CostData,
						backgroundColor: "rgba(238, 59, 59, 0.8)"
					};
					costReleaseChart.data.datasets.push(project1Cost);

					let project1Release = {
						label: "Release of " + project1.title,
						data: project1ReleaseData,
						error: project1Error,
						backgroundColor: "rgba(30, 144, 255, 0.8)"
					};
					costReleaseChart.data.datasets.push(project1Release);

					// give title and labels to complexity and risk graph for project1
					complexityRiskChart1.options.title.text = "Uncertainty of " + project1.title + ", Total Score: " + project1Uncertainty;

					let factorLabels = [
						"Cost",
						"Novelty",
						"Duration",
						"Reach",
						"Agency Experience",
						"Dependence",
						"Procurement",
						"Peak HR",
						"HR Availability"
					];
					complexityRiskChart1.data.labels = factorLabels;

					// write data from project1 to complexity and risk graph
					let project1Factors = {
						data: [
						project1Factor1,
						project1Factor2,
						project1Factor3,
						project1Factor4,
						project1Factor5,
						project1Factor6,
						project1Factor7,
						project1Factor8,
						project1Factor9
						],
						backgroundColor: [
						"rgba(244, 96, 108, 0.6)",
						"rgba(236, 173, 158, 0.6)",
						"rgba(230, 206, 172, 0.6)",
						"rgba(209, 186, 116, 0.6)",
						"rgba(214, 213, 183, 0.6)",
						"rgba(190, 237, 199, 0.6)",
						"rgba(190, 231, 233, 0.6)",
						"rgba(160, 238, 225, 0.6)",
						"rgba(140, 199, 181, 0.6)",
						]
					};
					complexityRiskChart1.data.datasets.push(project1Factors);

					if ($("#selectProject2").val() != null) {
						let project2 = projects[$("#selectProject2").val()];

						// fetch data from project1 for cost and release graph
						let project2QuaterNumberPhase1 = parseInt(project2.costRelease.quaterNumberPhase1);
						let project2QuaterNumberPhase2 = parseInt(project2.costRelease.quaterNumberPhase2);
						let project2QuaterNumberPhase3 = parseInt(project2.costRelease.quaterNumberPhase3);
						let project2TotalQuaterNumber = project2QuaterNumberPhase1 + project2QuaterNumberPhase2 + project2QuaterNumberPhase3;

						// fetch data from project2 for complexity and risk graph
						let project2Factor1 = parseInt(project2.complexityRisk.cost);
						let project2Factor2 = parseInt(project2.complexityRisk.novelty);
						let project2Factor3 = parseInt(project2.complexityRisk.duration);
						let project2Factor4 = parseInt(project2.complexityRisk.reach);
						let project2Factor5 = parseInt(project2.complexityRisk.agencyExperience);
						let project2Factor6 = parseInt(project2.complexityRisk.dependence);
						let project2Factor7 = parseInt(project2.complexityRisk.procurement);
						let project2Factor8 = parseInt(project2.complexityRisk.peakHR);
						let project2Factor9 = parseInt(project2.complexityRisk.HRAvailability);

						let project2Uncertainty = project2Factor1 + project2Factor2 + project2Factor3
						+ project2Factor4 + project2Factor5 + project2Factor6 + project2Factor7
						+ project2Factor8 + project2Factor9;

						let project2CostData = [];
						let project2ReleaseData = [];
						let project2Error = [];

						let project2CostPhase1 = -(parseInt(project2.costRelease.fteNumberCostPhase1) * 100000 + parseInt(project2.costRelease.operatingMoneyCostPhase1));
						let project2ReleasePhase1 = 0;
						let project2ErrorPhase1 = null;

						for (let i = 1; i <= project2QuaterNumberPhase1; i++) {
							project2CostData.push(project2CostPhase1);
							project2ReleaseData.push(project2ReleasePhase1);
							project2Error.push(project2ErrorPhase1);
						}

						let project2CostPhase2 = -(parseInt(project2.costRelease.fteNumberCostPhase2) * 100000 + parseInt(project2.costRelease.operatingMoneyCostPhase2));
						let project2ReleasePhase2 = parseInt(project2.costRelease.fteNumberReleasePhase2) * 100000 + parseInt(project2.costRelease.operatingMoneyReleasePhase2);
						let project2ErrorPhase2 = project2Uncertainty / 45 * project2ReleasePhase2;

						for (let i = 1; i <= project2QuaterNumberPhase2; i++) {
							project2CostData.push(project2CostPhase2);
							project2ReleaseData.push(project2ReleasePhase2);
							project2Error.push(project2ErrorPhase2);
						}

						let project2CostPhase3 = -(parseInt(project2.costRelease.fteNumberCostPhase3) * 100000 + parseInt(project2.costRelease.operatingMoneyCostPhase3));
						let project2ReleasePhase3 = parseInt(project2.costRelease.fteNumberReleasePhase3) * 100000 + parseInt(project2.costRelease.operatingMoneyReleasePhase3);
						let project2ErrorPhase3 = project2Uncertainty / 45 * project2ReleasePhase3;

						for (let i = 1; i <= project2QuaterNumberPhase3; i++) {
							project2CostData.push(project2CostPhase3);
							project2ReleaseData.push(project2ReleasePhase3);
							project2Error.push(project2ErrorPhase3);
						}

						// use the larger quater number of the two projects to make full data being displayed
						projectTotalQuaterNumber = project1TotalQuaterNumber >= project2TotalQuaterNumber ? project1TotalQuaterNumber : project2TotalQuaterNumber;

						// write data from project2 to cost and release graph
						let project2Cost = {
							label: "Cost of " + project2.title,
							data: project2CostData,
							backgroundColor: "rgba(238, 59, 59, 0.4)"
						};
						costReleaseChart.data.datasets.push(project2Cost);

						let project2Release = {
							label: "Release of " + project2.title,
							data: project2ReleaseData,
							error: project2Error,
							backgroundColor: "rgba(30, 144, 255, 0.4)"
						};
						costReleaseChart.data.datasets.push(project2Release);

						// give title and labels to complexity and risk graph for project2
						complexityRiskChart2.options.title.text = "Uncertainty of " + project2.title + ", Total Score: " + project2Uncertainty;

						complexityRiskChart2.data.labels = factorLabels;

						// write data from project2 to complexity and risk graph
						let project2Factors = {
							data: [
							project2Factor1,
							project2Factor2,
							project2Factor3,
							project2Factor4,
							project2Factor5,
							project2Factor6,
							project2Factor7,
							project2Factor8,
							project2Factor9
							],
							backgroundColor: [
							"rgba(244, 96, 108, 0.6)",
							"rgba(236, 173, 158, 0.6)",
							"rgba(230, 206, 172, 0.6)",
							"rgba(209, 186, 116, 0.6)",
							"rgba(214, 213, 183, 0.6)",
							"rgba(190, 237, 199, 0.6)",
							"rgba(190, 231, 233, 0.6)",
							"rgba(160, 238, 225, 0.6)",
							"rgba(140, 199, 181, 0.6)",
							]
						};
						complexityRiskChart2.data.datasets.push(project2Factors);

					}

					// give title and labels to cost and release graph
					costReleaseChart.options.title.text = "Cost & Release Time Horizon";

					let projectQuaters = [];
					for (let i = 1; i <=  projectTotalQuaterNumber; i++) {
						projectQuaters.push("Quater " + i);
					}
					costReleaseChart.data.labels = projectQuaters;

					costReleaseChart.update();
					costReleaseChart.render();
					complexityRiskChart1.update();
					complexityRiskChart1.render();
					complexityRiskChart2.update();
					complexityRiskChart2.render();
					
				}
			}

			$("button[name='select']").click(function() {
				costReleaseChart.data.datasets = [];
				complexityRiskChart1.data.datasets = [];
				complexityRiskChart2.data.datasets = [];

				displayCharts();
				
			});

			displayCharts();

		}

	};

}();
