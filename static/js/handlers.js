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
})()