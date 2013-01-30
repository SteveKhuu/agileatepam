VisistSpecificIssue = function (specificIssue) {
	function start() {
		$('#editExistingIssue .keyValue').text(specificIssue.key);
		$('#editExistingIssue .title').val(specificIssue.fields.summary);
		$('#editExistingIssue .description').val(specificIssue.fields.description);
		if(specificIssue.fields.issuetype.name == "Story") {
			$('#editExistingIssue .storyPoints').val(specificIssue.fields.customfield_10004);
		}
		$('#visitExistingIssue').show();
		
	}
	this.start = start;
	
	
	
	function destroy() {
		$('#visitExistingIssue').hide();
	}
	this.destroy = destroy;
}