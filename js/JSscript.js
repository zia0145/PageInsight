	var API_KEY = 'AIzaSyCWmxMVe_KuFX6wYC5-m3Y-oaAgnhwRJKw';
	
	var API_URL = 'https://www.googleapis.com/pagespeedonline/v2/runPagespeed?';
	
	var callbacks = {}
	var url="";
	function runPagespeed(url) {
		var s = document.createElement('script');
		s.type = 'text/javascript';
		s.async = true;
		var query = [
			'url=' + url,
			'callback=runPagespeedCallbacks',
			'screenshot=true',
			'key=' + API_KEY,
		].join('&');
		s.src = API_URL + query;
		document.head.insertBefore(s, null);
	}
	// Our JSONP callback. Checks for errors, then invokes our callback handlers.
function runPagespeedCallbacks(result) {
document.getElementById("page-two").style.display="none";
document.getElementById("page-three").style.display="block";
  if (result.error) {
    var errors = result.error.errors;
    for (var i = 0, len = errors.length; i < len; ++i) {
      if (errors[i].reason == 'badRequest' && API_KEY == 'yourAPIKey') {
        alert('Please specify your Google API key in the API_KEY variable.');
      } else {
        // NOTE: your real production app should use a better
        // mechanism than alert() to communicate the error to the user.
        alert(errors[i].message);
        alert(errors[i].reason);
      }
    }
    return;
  }

  // Dispatch to each function on the callbacks object.
  for (var fn in callbacks) {
    var f = callbacks[fn];
    if (typeof f == 'function') {
      callbacks[fn](result);
    }
  }
}

	function RunURL()
	{
		document.getElementById("error-msg").style.visibility="hidden";
		url=document.getElementById("input-url").value;
		url=addhttp(url);
		if(!validateUrl(url))
		{
			document.getElementById("error-msg").style.visibility="visible";
		}
		else
		{
			document.getElementById("page-three").style.display="none";
			document.getElementById("testing-url").textContent=url;
			document.getElementById("page-two").style.display="block";
			runPagespeed(url);
		}
	}
	var highResults = 0;
	var lowResults = 0;
	var passedResults = 0;
	callbacks.displayTopPageSpeedSuggestions = function(result) {
				highResults = 0;
				lowResults = 0;
				passedResults = 0;
				document.getElementById("score").textContent=result.ruleGroups.SPEED.score + "/100";
				
				var oStr=result.screenshot.data;
				//Format screen shot data
				var nStr=oStr.replace(/-/g , "+");
				var cStr=nStr.replace(/_/g , "/");
				document.getElementById("screen-shot").src="data:image/png;base64,"+cStr;
				var str = JSON.stringify(result, undefined, 4);

				var ruleResults = result.formattedResults.ruleResults;
				for (var i in ruleResults) {
					var ruleResult = ruleResults[i];
					if (ruleResult.ruleImpact == 0) 
					{
						passedResults++;
					}
					else if (ruleResult.ruleImpact < 3.0) 
					{
						lowResults++;
					}
					else
					{
						highResults++;
					}
				}
				document.getElementById("strong").textContent=highResults+" areas";
				document.getElementById("average").textContent=lowResults+" areas"
				document.getElementById("passed").textContent=passedResults+" areas"
			};
	function validateUrl(value){
      return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
    }
	function addhttp(url) {
				console.log("1");
			   if (!/^(f|ht)tps?:\/\//i.test(url)) {
				  url = "http://" + url;
				  console.log("2");
			   }
			   console.log(url);
			   return url;
			}