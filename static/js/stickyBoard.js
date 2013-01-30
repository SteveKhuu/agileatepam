EditableTitles = function($list){
	var titles = [];
	
	function buildEditor($title){
		$title.addClass("editable");
		var editForm = $('<div class="editForm"></div>');
		var textarea = $('<textarea class="edittitleField"></textarea>');
		var saveButton = $('<button class="editTitleSave">Save</button>');
		editForm.append(textarea);
		editForm.append(saveButton);
		$title.append(editForm);
	}
	
	function bindEvents(){
		$('.editable h2').live('click', function(){
			var self = $(this).parent();
			var currentTitle = self.find("h2").text();
			var editForm = self.find(".editForm");
			var textarea = editForm.find("textarea");
			textarea.val(currentTitle);
			
			editForm.show();
		});
		
		$('.editTitleSave').live('click', function(){
			var self = $(this);
			var textarea = self.siblings("textarea")
			var editForm = self.parent();
			var title = editForm.parent().find("h2");
			
			editForm.css({'display':'none'});
			
			title.text(textarea.val());
			
			
		});
	}
	
	function init(){
		titles = $list.find("li");
		titles.each(function(){
			buildEditor($(this));
		});
		
		bindEvents();
	}
	
	
	init();
}

function sticky_node(sticky_note){
	this.id = sticky_note.attr("data-index");
	this.text = sticky_note.text();
	this.colour = sticky_note.attr("data-colour");
	this.x = sticky_note.attr("data-col");
	this.y = sticky_note.attr("data-row");
	this.size_x = sticky_note.attr("data-sizex");
	this.size_y = sticky_note.attr("data-sizey");

	return this;
}


StickyBoard = function(){
	
	//Gridster class instance
	var gridObject;
    
	//DOM objects
	var body = $("body");
	var add_button = $("#add_sticky");
    var edit_button = $("#edit_sticky");
    var delete_button = $("#delete_sticky");
    var replay_button = $("#replay_stickies");
    var modal = $(".gridster_modal");
    var modal_title = modal.find(".modal-header h3");
    var current_colour = $('#current_colour');
    var colour_list = $('.colour_list');
    var colours = colour_list.find('li');
    var save_button = $("#save_sticky_text");
    
    //Constants
    var labels = {
            'add' : {
              'title' : 'Add another sticky',
              'action_button' : 'Add sticky note'
            },
            'edit' : {
              'title' : 'Edit sticky',
              'action_button' : 'Save sticky note'
            }
        };
    
    //Flags
    var isEditing = false;
    
    //Custom values
    var lastUpdateDate = new Date();
    var lastAction;
    
    /** Handling sticky data **/
    function add_new_sticky(data){
    	lastAction = {
    		'type' : 'add',
    		'config' : data
    	};
    	alert('Hi Frank: ' + window.location.host);
		
    	post_ajax_request("/add_sticky_note/", JSON.stringify(data), function( assigned_id ) {
            gridObject.add_widget('<li class="sticky_post ' + data.colour + '" data-index="' + assigned_id + '" data-colour="' + data.colour + '">' + data.text + '</li>', 1, 1);
            hideModal();
        });
    }
    
    function edit_sticky(data){
    	lastAction = {
    		'type' : 'edit',
    		'config' : data
    	};
    	post_ajax_request("/edit_sticky_note/", JSON.stringify(data), function( assigned_id ) {
            hideModal();
        });
    }
    
    function delete_sticky(data){
    	lastAction = {
    		'type' : 'delete',
    		'config' : data
    	};
    	
    	post_ajax_request("/delete_sticky_note/", JSON.stringify(data), function( msg ) {
            gridObject.remove_widget($(".selected_sticky_post"), function(){
            });
        });
    }
    
    this.move_sticky = move_sticky;
    function move_sticky(data){
    	lastAction = {
    		'type' : 'move',
    		'config' : data
    	};
    	
    	post_ajax_request("/move_sticky_note/", JSON.stringify(data), function( msg ) {
    		console.log(msg);
        });
    }
    
    function post_ajax_request(request_url, request_data, success_callback, fail_callback){
        $.ajax({
        	type: "POST",
        	contentType : 'application/json',
        	url: request_url,
        	data: request_data,
        }).done(success_callback);
    }
    
    function formatPostedDatetime(dateString){
		var datetimeTokens = dateString.split("T");
		var dateTokens = datetimeTokens[0].split("-");
		var timeTokens = datetimeTokens[1].split(":");
		return new Date(dateTokens[0], dateTokens[1], dateTokens[2], timeTokens[0], timeTokens[1], timeTokens[2]);
	}
    
    var update_timer;
    function get_updates(){
    	$.ajax({
        	type: "GET",
        	contentType : 'application/json',
        	url: '/api/get_activities/',
        }).done(function(data){
        	var activities = data.activities;
        	for(var i = 0; i < activities.length; i++){
        		var activityItem = activities[i];
        		var activityDate = formatPostedDatetime(activityItem.event_time);
        		
        		if((activityDate - lastUpdateDate) > 0){
        			lastUpdateDate = activityDate;
        			if(notOwnAction(activityItem)){
        				determineAction(activityItem);
        			}
        		}
        	}
        });
    }
    
    function notOwnAction(activity){
    	var changed = false;
    	if(lastAction.type == activity.type){
    		if(lastAction.type == 'delete'){
    			if(lastAction['config']['assigned_id'] != activity.sticky_id){
    				changed = true;
    			}
    		}else{
    			for(var key in activity.configuration){
        			if(lastAction['config'][key] != activity.configuration[key]){
        				changed = true;
        			};
        		}
    		}
    		
    	}else{
    		changed = true;
    	}
    	
    	return changed;
    }
    
    /** Replay function **/ 
    function clearBoard(){
    	$(".sticky_post").each(function(){
    		var self = $(this);
    		gridObject.remove_widget(self, function(){});
    	});
    }
    
    var activity_feed_queue;
    var replay_timer;
    function replay_activities(){
    	clearBoard();
		$.ajax({
			type: "GET",
			contentType : 'application/json',
			url: "/api/get_activities/",
		}).done(function( data ) {
			activity_feed_queue = data.activities;
			playNextActivity();
		});
    }
    
    function playNextActivity(){
    	clearTimeout(replay_timer);
    	var activity_item = activity_feed_queue.shift();
    	determineAction(activity_item);
    	
    	if(activity_feed_queue.length > 0){
    		replay_timer = setTimeout(function(){
    			playNextActivity();
    		}, 2000);
    	}
    }
    
    function determineAction(activity_item){
    	if(activity_item.type == "add"){
			showAddSticky(activity_item.sticky_id, activity_item.configuration);
		}else if(activity_item.type == "delete"){
			showDeleteSticky(activity_item.sticky_id);
		}else if(activity_item.type == "edit"){
			showEditSticky(activity_item.sticky_id, activity_item.configuration);
		}else if(activity_item.type == "move"){
			showMoveSticky(activity_item.sticky_id, activity_item.configuration);
		}
    }
    
    function showAddSticky(id, config){
    	gridObject.add_widget('<li class="sticky_post ' + config.colour + '" data-index="' + id + '" data-colour="' + config.colour + '">' + config.text + '</li>', config.size_x, config.size_y, config.position_x, config.position_y);
    }
    
    function showDeleteSticky(id){
    	var sticky = $("li[data-index='"+ id +"']");
    	gridObject.remove_widget(sticky, function(){});
    }
    
    function showEditSticky(id, config){
    	var sticky = $("li[data-index='"+ id +"']");
    	var default_classes = "sticky_post gs_w ";
    	
    	if(sticky.hasClass("selected_sticky_post")){
    		default_classes += "selected_sticky_post ";
    	}
    	
    	sticky.attr("class", default_classes);
        sticky.attr("data-colour", config.colour);
        sticky.addClass(config.colour);
        sticky.text(config.text);
         
    }
    
    function showMoveSticky(id, config){
    	var sticky = $("li[data-index='"+ id +"']");
    	var sticky_classes = sticky.attr("class");
    	var sticky_metadata = new sticky_node(sticky);
    	gridObject.remove_widget(sticky, function(){
    		gridObject.add_widget('<li class="' + sticky_classes + '" data-index="' + id + '" data-colour="' + sticky_metadata.colour + '">' + sticky_metadata.text + '</li>', sticky_metadata.size_x, sticky_metadata.size_y, config.position_x, config.position_y);
    	});
    }
    
    /** Modal controls **/
    function showModal(mode){
    	
    	if (mode === "edit"){
    		var selected_sticky = $(".selected_sticky_post");
    		$("#sticky_text").val(selected_sticky.text());
    		current_colour.attr("class", selected_sticky.attr("data-colour"));
    		isEditing = true;
        
    		currently_opened_note = new sticky_node(selected_sticky);
    	}else{
        
    		var sticky_textarea = $("#sticky_text");
        
    		//Reset Modal
    		current_colour.attr("class", "default_sticky");
    		sticky_textarea.val("");
    
    		isEditing = false;
    
    		currently_opened_note = null;
    	}
      
        modal_title.text(labels[mode]['title']);
        save_button.text(labels[mode]['action_button']);
          
    	body.addClass("dialogIsOpen");
    }
    
    function hideModal(){
    	body.removeClass("dialogIsOpen");
    }

    /** Initialization functions **/
    
    function generateGridster(){
    	$(".gridster ul").gridster({
	        widget_margins: [30, 10],
	        widget_base_dimensions: [140, 140]
	    });
    	
    	gridObject = $(".gridster ul").gridster().data('gridster');
    }

    
    function bindEvents(){
    	/* Control panel binding */
    	add_button.live('click', function(){
    		showModal("add");
    	});
    	
    	edit_button.live('click', function(){
    		showModal("edit");
    	});
    	
    	delete_button.live('click', function(){
  	      var deleted_sticky = $(".selected_sticky_post");
  	      var deleted_sticky_metadata = new sticky_node(deleted_sticky);
  	      
  	      delete_sticky({
  	    	'assigned_id' : deleted_sticky_metadata.id
  	      });
  	      
  	    });
    	
    	replay_button.live('click', function(){
    		replay_activities();
    	});
    	
    	/* Modal UI binding */
    	current_colour.click(function(){
    		colour_list.show();
    	});
  
    	colours.live('click', function(){
    		current_colour.attr("class", $(this).attr("class"));
    		colour_list.hide();
    	});
    	
    	$(".close, .cancel_button").live('click', function(){
    		hideModal();
    	});
    	
    	save_button.live('click', function(){
    		var sticky_textarea = $("#sticky_text");
            var selected_colour = current_colour.attr("class");
            var mode = "edit";
            var updated_sticky, updated_sticky_metadata;
            
            if (!isEditing){
                add_new_sticky({
                    'text' : sticky_textarea.val(),
                    'colour' : selected_colour
                });
            }else{
              var selected_sticky = $(".selected_sticky_post");
              selected_sticky.attr("class", "sticky_post gs_w selected_sticky_post");
              selected_sticky.attr("data-colour", selected_colour);
              selected_sticky.addClass(selected_colour);
              selected_sticky.text(sticky_textarea.val());
              updated_sticky = $(".selected_sticky_post"); //refresh jQuery selector after node updates
              
              var new_metadata = new sticky_node(updated_sticky);
              
              edit_sticky({
            	'assigned_id' : new_metadata.id,
                'colour': new_metadata.colour,
                'text': new_metadata.text
              });
            }
    	});
    	
    	$(".sticky_post").live('click', function(){
	    	$(".selected_sticky_post").removeClass("selected_sticky_post");
	    	$(this).addClass("selected_sticky_post");
	    	delete_button.removeAttr('disabled');
	    	edit_button.removeAttr('disabled');
	    });
    }
    
    function load_stickies(){
		$.ajax({
			type: "GET",
			contentType : 'application/json',
			url: "/api/get_stickies/",
		}).done(function( data ) {
			var stickies = data.stickies;
			for(var i = 0; i < stickies.length; i++){
				gridObject.add_widget('<li class="sticky_post ' + stickies[i].colour + '" data-index="' + stickies[i].id + '" data-colour="' + stickies[i].colour + '">' + stickies[i].text + '</li>', stickies[i].size_x, stickies[i].size_y, stickies[i].position_x, stickies[i].position_y);
			}
			
			lastUpdateDate = formatPostedDatetime(data.update_since);
		});
    }
    
    function init(){
    	generateGridster();
    	bindEvents();
    	load_stickies();
    	
    	update_timer = setInterval(get_updates, 1000);
    }
    
    init();
}