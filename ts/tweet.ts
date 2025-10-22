class Tweet {
	private text:string;
	time:Date;
    private _source:string = "";
    private _activity:string = "";
    private _distance:number = 0;

	constructor(tweet_text:string, tweet_time:string) {
        this.text = tweet_text;
		this.time = new Date(tweet_time);//, "ddd MMM D HH:mm:ss Z YYYY"
	}

	//returns either 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
    get source():string {
        if(this.text.startsWith("Just completed") || this.text.startsWith("Just posted")){
            this._source = "completed_event";
        } else if (this.text.startsWith("Watch")){
            this._source = "live_event";
        } else if (this.text.startsWith("Achieved")) {
            this._source = "achievement";
        } else {
            this._source = "miscellaneous";
        }
        return this._source;
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
            if(this.text.includes(' km'))
                this._activity = this.text.substring(this.text.indexOf('km ')+3, this.text.indexOf(' - '));
            else if(this.text.includes(' mi'))
                this._activity = this.text.substring(this.text.indexOf('mi ')+3, this.text.indexOf(' - '));
        } else {
            if(this.text.includes(' km'))
                this._activity = this.text.substring(this.text.indexOf('km ')+3, this.text.indexOf(' with'));
            else if(this.text.includes(' mi'))
                this._activity = this.text.substring(this.text.indexOf('mi ')+3, this.text.indexOf(' with'));
        }
        //not a distance but time based activity
        if(this._activity == ""){
            this._activity = this.text.substring(this.text.indexOf('a ')+2, this.text.indexOf(' in'));
        }
        return this._activity;
    }

    get distance():number {
        if(this.source != 'completed_event') {
            return 0;
        }
        //TODO: prase the distance from the text of the tweet
        if(this.text.includes(' mi')){
            this._distance = Number(this.text.substring(this.text.indexOf('a ')+2, this.text.indexOf(' mi')));
        }
        else if(this.text.includes(' km')){
            this._distance = Number(this.text.substring(this.text.indexOf('a ')+2, this.text.indexOf(' km')));
            this._distance = Number(this._distance)*.609;
        }
        return this._distance;
    }

    getHTMLTableRow(rowNumber:number):string {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        return "<tr></tr>";
    }
}