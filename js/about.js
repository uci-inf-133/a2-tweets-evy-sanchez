function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	earliest_tweet = tweet_array[0];
	latest_tweet = tweet_array[0];
	for(var i = 0; i < tweet_array.length; i++){
		if(tweet_array[i].time < earliest_tweet.time){
			earliest_tweet = tweet_array[i];
		}
		if(tweet_array[i].time > latest_tweet.time){
			latest_tweet = tweet_array[i];
		}
	}

	const options = {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	};
	
	//This line modifies the DOM, searching for the tag with the numberTweets ID and updating the text.
	//It works correctly, your task is to update the text of the other tags in the HTML file!
	document.getElementById('numberTweets').innerText = tweet_array.length;	
	document.getElementById('firstDate').innerText = earliest_tweet.time.toLocaleDateString('en-US', options);
	document.getElementById('lastDate').innerText = latest_tweet.time.toLocaleDateString('en-US', options);
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});