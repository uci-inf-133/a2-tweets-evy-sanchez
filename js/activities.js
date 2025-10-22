function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
	
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	//TODO: create a new array or manipulate tweet_array to create a graph of the number of tweets containing each type of activity.
	tweet_array_sorted = [];
	logged_activities = [];
	for(var i = 0; i < tweet_array.length; i++){
		if(tweet_array[i].source == 'completed_event'){
			if(!logged_activities.includes(tweet_array[i].activityType)) {
				tweet_array_sorted.push({"Activity": tweet_array[i].activityType, "Count" : 1});
				logged_activities.push(tweet_array[i].activityType);
			} else {
				for(var k = 0; k < tweet_array_sorted.length; k++)
					if(tweet_array_sorted[k]["Activity"]==tweet_array[i].activityType)
						tweet_array_sorted[k]["Count"]+=1;
			}
		}
	}
	tweet_array_sorted = tweet_array_sorted.sort((a, b) => b["Count"]-a["Count"]);
	tweet_array_sorted.forEach(item => console.log(item));

	//changing to DOM to update values
	document.getElementById('numberActivities').innerText = logged_activities.length;
	document.getElementById('firstMost').innerText = tweet_array_sorted[0]["Activity"];
	document.getElementById('secondMost').innerText = tweet_array_sorted[1]["Activity"];
	document.getElementById('thirdMost').innerText = tweet_array_sorted[2]["Activity"];

	activity_vis_spec = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
	  "description": "A graph of the number of Tweets containing each type of activity.",
	  "data": {
	    "values": tweet_array_sorted
	  } ,
	  //TODO: Add mark and encoding
	  "mark" : "bar",
	  "encoding" : {
		"x" : {
			"field": "Activity",
			"type" : "nominal",
			"axis" : {"labelAngle": -45}
		},
		"y" : {
			"field": "Count",
			"type" : "quantitative"
		}
	  }
	};
	vegaEmbed('#activityVis', activity_vis_spec, {actions:false});

	//TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
	//Use those visualizations to answer the questions about which activities tended to be longest and when.
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});