
let written_tweets = [];

function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	//TODO: Filter to just the written tweets
	
	for(var i = 0; i < tweet_array.length; i++){
		//console.log(tweet_array[i].written);
		if(tweet_array[i].written){
			written_tweets.push(tweet_array[i]);
		}
	}
	//console.log(written_tweets);
}

function addEventHandlerForSearch() {
	//console.log(written_tweets);
	//TODO: Search the written tweets as text is entered into the search box, and add them to the table
	//every time user types:
	table = document.getElementById('tweetTable');
	console.log(table.innerHTML);
	table.innerHTML = "";
	function search_and_update(input){
		console.log(written_tweets);
		var index = 0;
		for(var i = 0; i < written_tweets.length; i++){
			if(written_tweets[i].text.toLowerCase().includes(input.toLowerCase())){
				index++;
				table.innerHTML += (written_tweets[i].getHTMLTableRow(index));
			}
		}
	}
	textFilter = document.getElementById("textFilter");
	textFilter.addEventListener('input', function(){search_and_update(textFilter.value.trim())});
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	addEventHandlerForSearch();
	loadSavedRunkeeperTweets().then(parseTweets);
});