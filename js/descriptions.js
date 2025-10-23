function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	//TODO: Filter to just the written tweets
	let written_tweets = [];
	for(var i = 0; i < runkeeper_tweets.length; i++){
		if(runkeeper_tweets[i].written){
			written_tweets.push(runkeeper_tweets[i]);
		}
	}
}

function addEventHandlerForSearch() {
	//TODO: Search the written tweets as text is entered into the search box, and add them to the table
	//every time user types:
	table = document.getElementById('tweetTable');
	table.innerHTML = "";
	function search_and_update(input){
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