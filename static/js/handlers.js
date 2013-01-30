Handlers = {}; 
(function () {
	var currentPage;
	
	function leaveTo(newPage) {
		newPage.start();
		if (currentPage) {
			currentPage.destroy();
		}
		currentPage = newPage;
	}
	
	Handlers.status = function () {
				var page = new StatusPage();
				leaveTo(page);
			};
			
	Handlers.createJiraIssue = function () {
				var page = new JiraCreatePage();
				leaveTo(page);
			};
			
	Handlers.retrospectiveBoard = function () {
				var page = new RetrospectiveBoard();
				leaveTo(page);
			};
	Handlers.allOpenIssues = function () {
				var page = new AllOpenIssuesPage();
				leaveTo(page);
			};
			
	Handlers.visitSpecificIssue = function (issue) {
		var page = new VisistSpecificIssue(issue);
		leaveTo(page);
		XF.Router.navigate("visitSpecifcIssue", true );
	};
})()