$('document').ready(function(){
	/*Detect changes on all*/
	$('#all').change(function(){
		if($(this).is(':checked')){
			$('input[type=checkbox]').each(function(){
				var self = $(this);
				self.prop('checked', true);
			})	
		}
		else{
			$('input[type=checkbox]').each(function(){
				var self = $(this);
				self.prop('checked', false);
			})	
		}
		
	});

	/**********************/ 
	$('#submit').click(function(){
		var options = {};
		var val = $('#since').val();

		/*Getting options*/
		$('.checkbox input').each(function(){
			var self = $(this);
			var name = self.attr('name');
			if(name !== 'all'){
				if(self.is(':checked')){ //If options checked
					options[name] = true;
				}
				else{
					options[name] = false;
				}
			}
		})
		console.log(options);

		// The function below call the function <clearCache>
		// from background.js
		chrome.extension.getBackgroundPage().clearCache(val, options);

		/*Message listener*/
		// listen to messages coming from <background.js>
		chrome.extension.onMessage.addListener(
			function(request, sender, sendResponse){
				if (request.response){
					response = request.response;
					console.log(request, sender);
					//Sending a response back
					sendResponse({success: 200}); 
				}
		}) 
	});
});
