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
	activity_counts_sorted = [];
	logged_activities = [];
	for(var i = 0; i < tweet_array.length; i++){
		if(tweet_array[i].source == 'completed_event'){
			if(!logged_activities.includes(tweet_array[i].activityType)) {
				activity_counts_sorted.push({"Activity": tweet_array[i].activityType, "Count" : 1});
				logged_activities.push(tweet_array[i].activityType);
			} else {
				for(var k = 0; k < activity_counts_sorted.length; k++)
					if(activity_counts_sorted[k]["Activity"]==tweet_array[i].activityType)
						activity_counts_sorted[k]["Count"]+=1;
			}
		}
	}
	activity_counts_sorted = activity_counts_sorted.sort((a, b) => b["Count"]-a["Count"]);
	activity_counts_sorted.forEach(item => console.log(item));

	//changing to DOM to update values
	document.getElementById('numberActivities').innerText = logged_activities.length;
	document.getElementById('firstMost').innerText = activity_counts_sorted[0]["Activity"];
	document.getElementById('secondMost').innerText = activity_counts_sorted[1]["Activity"];
	document.getElementById('thirdMost').innerText = activity_counts_sorted[2]["Activity"];

	activity_vis_spec = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
	  "description": "A graph of the number of Tweets containing each type of activity.",
	  "data": {
	    "values": activity_counts_sorted
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
	let top_activities_tweets = [];
	for(var i = 0; i < tweet_array.length; i++){
		var activity = tweet_array[i].activityType;
		if(activity == activity_counts_sorted[0]["Activity"] || activity == activity_counts_sorted[1]["Activity"] || activity == activity_counts_sorted[2]["Activity"]){
			top_activities_tweets.push({"Activity":activity, "distance":tweet_array[i].distance, "time (day)":tweet_array[i].time.toLocaleDateString('en-US', {"weekday":"short"})});
		}
	}
	top_activities_tweets.forEach(item => console.log(item));

	distance_vis_spec = {
		"$schema": "https://vega.github.io/schema/vega-lite/v5.json",
		"description": "A graph of the distances reported in tweets with the 3 most popular activities and the day of the week they were performed.",
		"width":200,
		"height":250,
		"data": {
	    	"values": top_activities_tweets
	  	} ,
		"mark" : {"type":"point"},
		"encoding" : {
			"x" : {
				"field" : "time (day)",
				"type" : "nominal",
				"sort" : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
				"axis" : {"labelAngle" : 0}
			},
			"y" : {
				"field" : "distance",
				"type" : "quantitative"
			},
			"color" : {
				"field" : "Activity",
				"type" : "nominal"
			}
		}
	};

	vegaEmbed('#distanceVis', distance_vis_spec);

	document.getElementById("aggregate").addEventListener('click', function(){
		if(!distance_vis_spec.encoding.y.aggregate){
			distance_vis_spec.encoding.y.aggregate = "mean";
			document.getElementById("aggregate").innerText = 'Show all activities';
		} else {
			delete distance_vis_spec.encoding.y.aggregate;
			document.getElementById("aggregate").innerText = 'Show means';
		}
		vegaEmbed('#distanceVis', distance_vis_spec)});
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});