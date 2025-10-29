
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
}

function addEventHandlerForSearch() {
	//TODO: Search the written tweets as text is entered into the search box, and add them to the table
	//every time user types:
	let table = document.getElementById('tweetTable');
	table.innerHTML = "";
	var index;
	let htmlString = "";
	function search_and_update(input){
		htmlString = "";
		index = 0;
		if(input.trim().length>0){
			const loweredInput = input.toLowerCase();
			for(var i = 0; i < written_tweets.length; i++){
				if(written_tweets[i].writtenText.toLowerCase().includes(loweredInput)){
					console.log(written_tweets[i].text);
					console.log(loweredInput);
					index++;
					htmlString += (written_tweets[i].getHTMLTableRow(index));
				}
			}
		}
		table.innerHTML = htmlString;
		document.getElementById("searchCount").innerHTML = index;
		document.getElementById("searchText").innerHTML = input;
	}
	textFilter = document.getElementById("textFilter");
	textFilter.addEventListener('input', function(){search_and_update(textFilter.value)});
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	addEventHandlerForSearch();
	loadSavedRunkeeperTweets().then(parseTweets);
});