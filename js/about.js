function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	//finding the earliest and latest tweets
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

	//getting amount of each kind of tweet
	completedCount = 0;
	liveCount = 0;
	achievementsCount = 0;
	miscellaneousCount = 0;
	for(var i = 0; i < tweet_array.length; i++){
		if(tweet_array[i].source == "completed_event"){
			completedCount++;
		} else if (tweet_array[i].source == "live_event"){
			liveCount++;
		} else if (tweet_array[i].source == "achievement"){
			achievementsCount++;
		} else {
			miscellaneousCount++;
		}
	}

	//getting amount of tweets that are written by the user
	writtenCount = 0;
	for(var i = 0; i < tweet_array.length; i++){
		if(tweet_array[i].written){
			writtenCount++;
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

	//kinda of events and their numbers
	completedEvents = document.getElementsByClassName('completedEvents');
	liveEvents = document.getElementsByClassName('liveEvents');
	achievements = document.getElementsByClassName('achievements');
	miscellaneous = document.getElementsByClassName('miscellaneous');
	completedEventsPct = document.getElementsByClassName('completedEventsPct');
	liveEventsPct = document.getElementsByClassName('liveEventsPct');
	achievementsPct = document.getElementsByClassName('achievementsPct');
	miscellaneousPct = document.getElementsByClassName('miscellaneousPct');

	for(var i = 0; i < completedEvents.length; i++){
		completedEvents[i].innerText = completedCount;}
	for(var i = 0; i < completedEventsPct.length; i++){
		completedEventsPct[i].innerText = math.format(completedCount/tweet_array.length, {notation:'fixed', precision: 2})+"%";
	}

	for(var i = 0; i < liveEvents.length; i++){ 
		liveEvents[i].innerText = liveCount;}
	for(var i = 0; i < liveEventsPct.length; i++){
		liveEventsPct[i].innerText = math.format(liveCount/tweet_array.length, {notation:'fixed', precision: 2})+"%";
	}

	for(var i = 0; i < achievements.length; i++){
		achievements[i].innerText = achievementsCount;}
	for(var i = 0; i < achievementsPct.length; i++){
		achievementsPct[i].innerText = math.format(achievementsCount/tweet_array.length, {notation:'fixed', precision: 2})+"%";
	}

	for(var i = 0; i < miscellaneous.length; i++){
		miscellaneous[i].innerText = miscellaneousCount;}
	for(var i = 0; i < miscellaneousPct.length; i++){
		miscellaneousPct[i].innerText = math.format(miscellaneousCount/tweet_array.length, {notation:'fixed', precision: 2})+"%";
	}

	//written tweets
	written = document.getElementsByClassName('written');
	writtenPct = document.getElementsByClassName('writtenPct');
	for(var i = 0; i < written.length; i++){
		written[i].innerText = writtenCount; }
	for(var i = 0; i < writtenPct.length; i++){ 
		writtenPct[i].innerText = math.format(writtenCount/completedCount, {notation:'fixed', precision: 2})+"%";
	};
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});