AllOpenIssuesPage = function () {
	function start() {
		$('#allOpenIssues').show();
		defaultContent();
		getJiraIssue();
	}
	this.start = start;
	
	function getJiraIssue() {
		var request_url = "/api/get_all_open_issues/";
		$.ajax({
        	type: "GET",
        	url: request_url,
		}).done(function(response) {
			var issues = $.parseJSON(response).issues;
			for(var i = 0; i < issues.length; i++) {
				addAsOpenIssue(issues[i]);
			}
		});
	}
	
	function addAsOpenIssue(openIssue) {
		var storyPoint = "";
		if (openIssue.fields.customfield_10004) {
			storyPoint = "<div class='storyPoints'>" + openIssue.fields.customfield_10004+ "</div>";
		}
		
		$("#openIssues").append("<div class='jiraItem' data-key='" + openIssue.key +"'>" +
				"<div class='key'>" + openIssue.key + "</div>" +
				"<div class='summary'>" + openIssue.fields.summary + "</div>" + storyPoint +
				  "</div>");
				
		$("#openIssues [data-key="+ openIssue.key +"] .key").click(function() {
			Handlers.visitSpecificIssue(openIssue);
		});
	}
	
	function defaultContent() {
		$('#openIssues').empty();
	}
	
	function destroy() {
		defaultContent();
		$('#allOpenIssues').hide();
	}
	this.destroy = destroy;
}