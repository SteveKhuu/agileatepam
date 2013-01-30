StatusPage = function() {
	var poller;
	
	function start() {
		
		$("#statusPage").show();
		
		$('#statusPage #status').empty();

		pollForComments();
		poller = setInterval(pollForComments, 1000);
		
		$('#statusPage #addStatus').on('keyup',
			function (e) {
		    	if (e.keyCode == 13) {
		    		var request_url = "/api/add_status/";
		    		 $.ajax({
		    	        	type: "POST",
		    	        	contentType : 'application/json',
		    	        	url: request_url,
		    	        	data: JSON.stringify({message: $('#statusPage #addStatus').val()}),
		    	        });
		    		$('#statusPage #addStatus').val("");
		    	}
		});
	}
	this.start = start;
	
	var lastTimeStamp;
	function pollForComments() {
		if(lastTimeStamp) {
			request_url = "/api/get_comments/?lastDate="+lastTimeStamp
		} else {
			request_url = "/api/get_comments/"
		}
		
		$.ajax({
			type: "GET",
			url: request_url
		}).done(function(response) {
			var comments = response.comments;
			var startPos = comments.length - 20;
			if(startPos < 0) {
				startPos = 0;
			}
			for (var i=startPos ;i<comments.length;i++)
			{ 
				var commentItem = comments[i];
				var commentTime = commentItem.posted_datetime;
				var commentDate = formatPostedDatetime(commentTime);
				
				if(lastTimeStamp){
					var lastTimeStampDate = formatPostedDatetime(lastTimeStamp);
					if((commentDate - lastTimeStampDate) > 0){
						appendNewMessage(commentItem.comment);
					}
				}else{	
					appendNewMessage(commentItem.comment);
				}
				
			}
			if(comments.length > 0) {
				lastTimeStamp = comments[comments.length-1].posted_datetime;
			}
		});
	}
	
	function formatPostedDatetime(dateString){
		var datetimeTokens = dateString.split("T");
		var dateTokens = datetimeTokens[0].split("-");
		var timeTokens = datetimeTokens[1].split(":");
		return new Date(dateTokens[0], dateTokens[1], dateTokens[2], timeTokens[0], timeTokens[1], timeTokens[2]);
	}
	
	function appendNewMessage(message) {
		$("#status").append("<ul data-role=\"listview\">" +
				"<li data-role=\"divider\">Name</li>" +
				"<li>" + message + "</li></ul>")

		XF.UIElements.enhanceView($("#statusPage"));
		
		window.scrollTo(0, document.body.scrollHeight);
	} 
	
	function destroy () {
		clearInterval(poller);
		$("#statusPage").hide();
	}
	this.destroy = destroy;
}