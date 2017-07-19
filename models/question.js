var mongoose                    = require("mongoose"),
	random						= require("mongoose-simple-random");

var questionSchema = new mongoose.Schema({
	category: String,
	question: String,
	media: String,
	answer: [String],
	asked: Boolean,
	created: {type: Date, default: Date.now},
	author: {
        id: {
            	type: mongoose.Schema.Types.ObjectId,
            	ref: "User"
        	},
        username: String
    }

});

questionSchema.plugin(random);
module.exports = mongoose.model("Question", questionSchema);