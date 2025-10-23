class Tweet {
	private text:string;
	time:Date;

	constructor(tweet_text:string, tweet_time:string) {
        this.text = tweet_text;
		this.time = new Date(tweet_time);//, "ddd MMM D HH:mm:ss Z YYYY"
	}

	//returns either 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
    get source():string {
        if(this.text.startsWith("Just completed") || this.text.startsWith("Just posted")){
            return "completed_event";
        } else if (this.text.startsWith("Watch")){
            return "live_event";
        } else if (this.text.startsWith("Achieved")) {
            return "achievement";
        } else {
            return "miscellaneous";
        }
    }

    //returns a boolean, whether the text includes any content written by the person tweeting.
    get written():boolean {
        if(this.text.includes(' - ')){
            return true;
        }
        return false;
    }

    get writtenText():string {
        if(!this.written) {
            return "";
        } else {
            return this.text.substring(this.text.indexOf("- ")+2, this.text.indexOf("http"));
        }
    }
    //parse the activity type from the text of the tweet
    get activityType():string {
        if (this.source != 'completed_event') {
            return "unknown";
        }
        if (this.written) {
            if(this.text.includes(' km '))
                return this.text.substring(this.text.indexOf('km ')+3, this.text.indexOf(' - '));
            else if(this.text.includes(' mi '))
                return this.text.substring(this.text.indexOf('mi ')+3, this.text.indexOf(' - '));
        } else {
            if(this.text.includes(' km '))
                return this.text.substring(this.text.indexOf('km ')+3, this.text.indexOf(' with'));
            else if(this.text.includes(' mi '))
                return this.text.substring(this.text.indexOf('mi ')+3, this.text.indexOf(' with'));
        }
        //not a distance but time based activity
        return this.text.substring(this.text.indexOf(' a')+3, this.text.indexOf(' in')).trimStart();
    }

    get distance():number {
        if(this.source != 'completed_event') {
            return 0;
        }
        //TODO: prase the distance from the text of the tweet
        if(this.text.includes(' mi')){
            return Number(this.text.substring(this.text.indexOf(' a')+3, this.text.indexOf(' mi')));
        }
        else if(this.text.includes(' km')){
            return Number(this.text.substring(this.text.indexOf(' a')+3, this.text.indexOf(' km')))*.609;
        }
        else {
            return 0;
        }
    }

    getHTMLTableRow(rowNumber:number):string {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        var link = this.text.substring(this.text.indexOf("http"), this.text.indexOf(" #Runkeeper"));
        return '<tr><th scope = \"row\">'+rowNumber+'</th>' + '<td>'+this.activityType+'</td>' + '<td>'+
                            this.text.substring(0, this.text.indexOf("http"))+'<a href = '+link+'>'+
                            this.text.substring(this.text.indexOf("http"), this.text.indexOf(' #Run'))+'</a>'+
                            this.text.substring(this.text.indexOf(" #Run"))+'</td></tr>';
    }
}