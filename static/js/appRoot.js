$(function(){
	
	
	 
 XF.defineComponent(
  'appRoot',
  XF.Component.extend({}, {}));
 
 XF.defineComponent(
  'navigationPage',
  XF.Component.extend({}, {}));
 

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


});