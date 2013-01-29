$(function(){
    XF.start({
    settings: {
		componentUrlPrefix: '{% get_static_prefix %}js/',
		templateUrlPrefix: '{% get_static_prefix %}tmpl/',
	},
    router: {
        routes: {
		'':         'home',
		'/':        'home',
		'home':     'home',
		'about':    'about',
		'news/:id': 'news'
		},
        handlers: {
			news: function(id) {
				var home = XF.getComponentByID('app-home-component');
				home.selectedNewsID = id;
				var newsDetailsComponent =
				XF.getComponentByID('app-news-details-component');
				if(newsDetailsComponent) {
					newsDetailsComponent.refresh();			
				}
			}
		}
	}
    });
    
    $(".triggerChat").live("click",function(evt) {
        evt.preventDefault();
        
        var url = window.location.href;
        var arr = url.split("/");
        var host = arr[2].split(":")[0]
        var port = 8888;
        var uri = "chat";

        ws = new WebSocket("ws://localhost:8888/chat");

        ws.onmessage = function(evt) {alert("message received: " + evt.data)};

        ws.onclose = function(evt) { alert("Connection close"); };
      });
    
});