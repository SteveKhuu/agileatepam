JiraCreatePage = function () {
	function start() {
		defaultFields();
		$('#jiraCreate').submit(submitJiraIssue);
	}
	this.start = start;
	
	function submitJiraIssue(evt) {
		evt.preventDefault();
		var request_url = "/api/create_json_issue/";
		$.ajax({
        	type: "POST",
        	contentType : 'application/json',
        	url: request_url,
        	data: JSON.stringify({title: $('#jiraStoryCreate .title').val(),
        		description: $('#jiraStoryCreate .description').val()}),
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