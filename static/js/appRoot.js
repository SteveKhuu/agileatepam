$(function(){
	
	
	 
 XF.defineComponent(
  'appRoot',
  XF.Component.extend({}, {}));
 
 var navigationExtended = {
	viewClass: XF.View.extend({
		postRender : function() {
			
			$("#app_nav").append("<li id='magic-line'></li>");
		    
			animateNavBar();
			
		    $(".nav-wrap li").live('click', function(){
		    	$(".current_page_item").removeClass("current_page_item");
		    	$(this).addClass("current_page_item");
		    	animateNavBar();
		    });
		    
		    function animateNavBar(){
		    	var $el, leftPos, newWidth,
		        $mainNav = $("#app_nav");
			    var $magicLine = $("#magic-line");
			    
			    $magicLine
			        .width($(".current_page_item").width())
			        .css("left", $(".current_page_item a").position().left)
			        .data("origLeft", $magicLine.position().left)
			        .data("origWidth", $magicLine.width());
			        
			    $("#app_nav li a").hover(function() {
			        $el = $(this);
			        leftPos = $el.position().left;
			        newWidth = $el.parent().width();
			        $magicLine.stop().animate({
			            left: leftPos,
			            width: newWidth
			        });
			    }, function() {
			        $magicLine.stop().animate({
			            left: $magicLine.data("origLeft"),
			            width: $magicLine.data("origWidth")
			        });    
			    });
		    }
	    }
	})
};

 
 XF.defineComponent(
  'navigationPage',
  XF.Component.extend(navigationExtended, {}));
 

 var statusPageExtended = {
	        viewClass: XF.View.extend({
	        	postRender : function() {
	        		$('#statusPage').hide();
	        		
	        	}
	        })
	    };

XF.defineComponent(
		  'statusPage',
		  XF.Component.extend(statusPageExtended, {}));
 

var stickyBoardExtended = {
        viewClass: XF.View.extend({
        	postRender : function() {
        		var stickyBoard = new StickyBoard();
        		window.stickyBoardApplication = stickyBoard;
        		var editableTitles = new EditableTitles($(".titles"));
        		$('#stickyBoard').hide();
        		
        	}
        })
    };

XF.defineComponent(
	  'stickyBoard',
	  XF.Component.extend(stickyBoardExtended, {}));


var jiraCreateExtended = {
        viewClass: XF.View.extend({
        	postRender : function() {
        		$('#jiraStoryCreate').hide();
        		
        	}
        })
    };

XF.defineComponent(
	  'jiraStoryCreate',
	  XF.Component.extend(jiraCreateExtended, {}));


var allOpenIssuesExtending = {
        viewClass: XF.View.extend({
        	postRender : function() {
        		$('#allOpenIssues').hide();
        	}
        })
    };

XF.defineComponent(
	  'allOpenIssues',
	  XF.Component.extend(allOpenIssuesExtending, {}));

var allOpenIssuesExtending = {
        viewClass: XF.View.extend({
        	postRender : function() {
        		$('#visitExistingIssue').hide();
        	}
        })
    };

XF.defineComponent(
	  'visitExistingIssue',
	  XF.Component.extend(allOpenIssuesExtending, {}));

});



