JiraCreatePage = function () {
	function start() {
		defaultFields();
		$('#jiraCreate').submit(submitJiraIssue);
		$('#IssueType').change(function() {
			  if($('#IssueType').val() === "Story") {
				  $('#jiraStoryCreate .storyPoints').show();
			  } else {
				  $('#jiraStoryCreate .storyPoints').hide();
			  }
		});
	}
	this.start = start;
	
	function submitJiraIssue(evt) {
		evt.preventDefault();
		var request_url = "/api/create_json_issue/";
		var issueType = $('#IssueType').val();
		$.ajax({
        	type: "POST",
        	contentType : 'application/json',
        	url: request_url,
        	data: JSON.stringify({title: $('#jiraStoryCreate .title').val(),
        		description: $('#jiraStoryCreate .description').val(),
        		issueType : issueType,
        		storyPoints: $('#jiraStoryCreate .storyPoints').val()}),
        }).done(function(responseStr) {
        	var response = $.parseJSON(responseStr)
        	XF.UIElements.showDialog("Issue created", "Issue " + response.key + " was created.");
        });
	}
	function defaultFields() {
		$('#jiraStoryCreate').show();
		$('#jiraStoryCreate .description').val = ""; 
		$('#jiraStoryCreate .title').val = "";
	}
	
	function destroy() {
		defaultFields();
		$('#jiraStoryCreate').hide();
	}
	this.destroy = destroy;
}