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
	tweet_array_sorted = new Object();
	for(var i = 0; i < tweet_array.length; i++){
		if(tweet_array[i].source == 'completed_event'){
			if(!Object.keys(tweet_array_sorted).includes(tweet_array[i].activityType)){
				tweet_array_sorted[tweet_array[i].activityType] = 1;
			} else {
				tweet_array_sorted[tweet_array[i].activityType] += 1;
			}
		}
	}
	tweet_array_sorted = Object.entries(tweet_array_sorted).sort((a, b) => b[1]-a[1]);
	tweet_array_sorted.forEach(pair => console.log(pair[0]+": "+pair[1]));

	//changing to DOM to update values
	document.getElementById('numberActivities').innerText = tweet_array_sorted.length;
	document.getElementById('firstMost').innerText = tweet_array_sorted[0][0];
	document.getElementById('secondMost').innerText = tweet_array_sorted[1][0];
	document.getElementById('thirdMost').innerText = tweet_array_sorted[2][0];

	activity_vis_spec = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
	  "description": "A graph of the number of Tweets containing each type of activity.",
	  "data": {
	    "values": tweet_array_sorted
	  } ,
	  //TODO: Add mark and encoding
	  "mark" : "point"
	};
	vegaEmbed('#activityVis', activity_vis_spec, {actions:false});

	//TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
	//Use those visualizations to answer the questions about which activities tended to be longest and when.
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});