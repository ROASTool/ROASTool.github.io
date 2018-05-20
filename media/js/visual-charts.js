var VisualCharts = function () {

	return {

		initCharts: function() {

			Chart.defaults.global.defaultFontFamily = "Arial";
			Chart.defaults.global.defaultFontSize = 12;
			Chart.defaults.global.defaultFontColor = "#777";

			let barChart = new Chart($("canvas[name='barChart']"), {
				type:'bar',
				data:{
					labels:[],
					datasets:[]
				},
				options:{
					responsive: true,
					maintainAspectRatio: false,
					title:{
						display:true,
						text:'Nothing to show, please create new project',
						fontSize:19
					},
					legend:{
						display:true,
						position:'right',
						labels:{
							fontColor:'#000'
						}
					},
					layout:{
						padding:{
							left:0,
							right:0,
							bottom:0,
							top:0
						}
					},
					tooltips:{
						enabled:true
					}
				}
			});

			let pieChart1 = new Chart($("canvas[name='pieChart1']"), {
				type:'pie',
				data:{
					labels:[],
					datasets:[]
				},
				options:{
					responsive: true,
					maintainAspectRatio: false,
					title:{
						display:true,
						text:'Nothing to show, please create new project',
						fontSize:19
					},
					legend:{
						display:true,
						position:'right',
						labels:{
							fontColor:'#000'
						}
					},
					layout:{
						padding:{
							left:0,
							right:0,
							bottom:0,
							top:0
						}
					},
					tooltips:{
						enabled:true
					}
				}
			});

			let pieChart2 = new Chart($("canvas[name='pieChart2']"), {
				type:'pie',
				data:{
					labels:[],
					datasets:[]
				},
				options:{
					responsive: true,
					maintainAspectRatio: false,
					title:{
						display:true,
						text:'Nothing to show, please create new project',
						fontSize:19
					},
					legend:{
						display:true,
						position:'right',
						labels:{
							fontColor:'#000'
						}
					},
					layout:{
						padding:{
							left:0,
							right:0,
							bottom:0,
							top:0
						}
					},
					tooltips:{
						enabled:true
					}
				}
			});

			function displayCharts() {
				if($("#selectProject1").val() != null) {
					if (window.localStorage.getItem("projects") != null) {
						let projects = JSON.parse(window.localStorage.getItem("projects"));
						let project1 = projects[$("#selectProject1").val()];

						let project1QuaterNumberPhase1 = parseInt(project1.costRelease.quaterNumberPhase1);
						let project1QuaterNumberPhase2 = parseInt(project1.costRelease.quaterNumberPhase2);
						let project1QuaterNumberPhase3 = parseInt(project1.costRelease.quaterNumberPhase3);
						let project1TotalQuaterNumber = project1QuaterNumberPhase1 + project1QuaterNumberPhase2 + project1QuaterNumberPhase3;

						let project1CostData = [];
						let project1CostPhase1 = -(parseInt(project1.costRelease.fteNumberCostPhase1) * 100000 + parseInt(project1.costRelease.operatingMoneyCostPhase1))
						for (let i = 1; i <= project1QuaterNumberPhase1; i++) {
							project1CostData.push(project1CostPhase1);
						}
						let project1CostPhase2 = -(parseInt(project1.costRelease.fteNumberCostPhase2) * 100000 + parseInt(project1.costRelease.operatingMoneyCostPhase2))
						for (let i = 1; i <= project1QuaterNumberPhase2; i++) {
							project1CostData.push(project1CostPhase2);
						}
						let project1CostPhase3 = -(parseInt(project1.costRelease.fteNumberCostPhase3) * 100000 + parseInt(project1.costRelease.operatingMoneyCostPhase3))
						for (let i = 1; i <= project1QuaterNumberPhase3; i++) {
							project1CostData.push(project1CostPhase3);
						}

						let project1ReleaseData = [];
						let project1ReleasePhase1 = 0;
						for (let i = 1; i <= project1QuaterNumberPhase1; i++) {
							project1ReleaseData.push(project1ReleasePhase1);
						}
						let project1ReleasePhase2 = parseInt(project1.costRelease.fteNumberReleasePhase2) * 100000 + parseInt(project1.costRelease.operatingMoneyReleasePhase2);
						for (let i = 1; i <= project1QuaterNumberPhase2; i++) {
							project1ReleaseData.push(project1ReleasePhase2);
						}
						let project1ReleasePhase3 = parseInt(project1.costRelease.fteNumberReleasePhase3) * 100000 + parseInt(project1.costRelease.operatingMoneyReleasePhase3);
						for (let i = 1; i <= project1QuaterNumberPhase3; i++) {
							project1ReleaseData.push(project1ReleasePhase3);
						}

						let projectTotalQuaterNumber = project1TotalQuaterNumber;

						project1Cost = {
							label: "Cost of " + project1.title,
							data: project1CostData,
							backgroundColor:'rgba(238, 59, 59, 0.8)'
						};
						barChart.data.datasets.push(project1Cost);

						project1Release = {
							label: "Release of " + project1.title,
							data: project1ReleaseData,
							backgroundColor: 'rgba(30, 144, 255, 0.8)'
						};
						barChart.data.datasets.push(project1Release);

						if ($("#selectProject2").val() != null) {
							let project2 = projects[$("#selectProject2").val()];

							let project2QuaterNumberPhase1 = parseInt(project2.costRelease.quaterNumberPhase1);
							let project2QuaterNumberPhase2 = parseInt(project2.costRelease.quaterNumberPhase2);
							let project2QuaterNumberPhase3 = parseInt(project2.costRelease.quaterNumberPhase3);
							let project2TotalQuaterNumber = project2QuaterNumberPhase1 + project2QuaterNumberPhase2 + project2QuaterNumberPhase3;

							let project2CostData = [];
							let project2CostPhase1 = -(parseInt(project2.costRelease.fteNumberCostPhase1) * 100000 + parseInt(project2.costRelease.operatingMoneyCostPhase1))
							for (let i = 1; i <= project2QuaterNumberPhase1; i++) {
								project2CostData.push(project2CostPhase1);
							}
							let project2CostPhase2 = -(parseInt(project2.costRelease.fteNumberCostPhase2) * 100000 + parseInt(project2.costRelease.operatingMoneyCostPhase2))
							for (let i = 1; i <= project2QuaterNumberPhase2; i++) {
								project2CostData.push(project2CostPhase2);
							}
							let project2CostPhase3 = -(parseInt(project2.costRelease.fteNumberCostPhase3) * 100000 + parseInt(project2.costRelease.operatingMoneyCostPhase3))
							for (let i = 1; i <= project2QuaterNumberPhase3; i++) {
								project2CostData.push(project2CostPhase3);
							}

							let project2ReleaseData = [];
							let project2ReleasePhase1 = 0;
							for (let i = 1; i <= project2QuaterNumberPhase1; i++) {
								project2ReleaseData.push(project2ReleasePhase1);
							}
							let project2ReleasePhase2 = parseInt(project2.costRelease.fteNumberReleasePhase2) * 100000 + parseInt(project2.costRelease.operatingMoneyReleasePhase2);
							for (let i = 1; i <= project2QuaterNumberPhase2; i++) {
								project2ReleaseData.push(project2ReleasePhase2);
							}
							let project2ReleasePhase3 = parseInt(project2.costRelease.fteNumberReleasePhase3) * 100000 + parseInt(project2.costRelease.operatingMoneyReleasePhase3);
							for (let i = 1; i <= project2QuaterNumberPhase3; i++) {
								project2ReleaseData.push(project2ReleasePhase3);
							}

							if (project1TotalQuaterNumber > project2TotalQuaterNumber) {
								projectTotalQuaterNumber = project1TotalQuaterNumber;
								let diff = project1TotalQuaterNumber - project2TotalQuaterNumber
								for (let i = 1; i <= diff; i++) {
									project2CostData.push(0);
									project2ReleaseData.push(0);
								}
							} else if (project1TotalQuaterNumber < project2TotalQuaterNumber) {
								projectTotalQuaterNumber = project2TotalQuaterNumber;
								let diff = project2TotalQuaterNumber - project1TotalQuaterNumber
								for (let i = 1; i <= diff; i++) {
									project1CostData.push(0);
									project1ReleaseData.push(0);
								}
							}

							project1Cost = {
								label: "Cost of " + project1.title,
								data: project1CostData,
								backgroundColor:'rgba(238, 59, 59, 0.8)'
							};
							barChart.data.datasets[0] = project1Cost;

							project1Release = {
								label: "Release of " + project1.title,
								data: project1ReleaseData,
								backgroundColor: 'rgba(30, 144, 255, 0.8)'
							};
							barChart.data.datasets[1] = project1Release;

							project2Cost = {
								label: "Cost of " + project2.title,
								data: project2CostData,
								backgroundColor:'rgba(238, 59, 59, 0.4)'
							};
							barChart.data.datasets.push(project2Cost);

							project2Release = {
								label: "Release of " + project2.title,
								data: project2ReleaseData,
								backgroundColor: 'rgba(30, 144, 255, 0.4)'
							};
							barChart.data.datasets.push(project2Release);

						}

						let projectQuaters = [];
						for (let i = 1; i <=  projectTotalQuaterNumber; i++) {
							projectQuaters.push("Quater " + i);
						}
						barChart.data.labels = projectQuaters;

						barChart.options.title.text = "Cost & Release Time Horizon";

						barChart.update();

					}
					
				}
			}

			$("button[name='select']").click(function() {
				barChart.data.datasets = [];
				displayCharts();
				
			});

			displayCharts();

		}

	};

}();
