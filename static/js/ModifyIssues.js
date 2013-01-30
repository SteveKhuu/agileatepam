ModifyIssue = function(issueNumber, storyPoints) {
	
	var request_url = '/api/modify_storypoints/';
		
	$.ajax({
    	type: "POST",
    	contentType : 'application/json',
    	url: request_url,
    	data: JSON.stringify({issueNumber: issueNumber, storyPoints: storyPoints}),
    }).done(function(responseStr) {
    	XF.UIElements.showDialog("Issue modified", "Issue " + issueNumber + " was modified.");
    });
}