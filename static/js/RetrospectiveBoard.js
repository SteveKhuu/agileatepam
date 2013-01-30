RetrospectiveBoard = function() {
	function start() {
		$('#stickyBoard').show();
	}
	this.start = start;
	
	function destroy() {
		$('#stickyBoard').hide();
	}
	this.destroy = destroy;
}