
var mongoose = require("mongoose");

var dbURL = "mongodb://localhost/naqssvotingdb";

mongoose.connect(dbURL,{ useUnifiedTopology: true, useNewUrlParser: true });

var settingsSchema = new mongoose.Schema({
    numberOfPresident: Number,
    numberOfVicePresident: Number,
    numberOfGenSec: Number,
    numberOfTreasurer: Number,
    numberOfFinSec: Number,
    numberOfAssGenSec: Number,
    numberOfDoso: Number,
    numberOfDosp: Number,
    numberOfLibrarian: Number,
    numberOfPro: Number
});
var studentSchema = new mongoose.Schema({
    matricNumber: String,
    password: String,
    salt: String,
    president: String,
    vicePresident: String,
    genSec: String,
    treasurer: String,
    finSec: String,
    assGenSec: String,
    doso: String,
    dosp: String,
    librarian: String,
    pro: String
});
var candidatesSchema = new mongoose.Schema({
    position: String,
    name: String,
    votes: {type: Number, default: 0},
    order: Number
});
var adminSchema = new mongoose.Schema({
    name: String,
    password: String
});

exports.Settings = mongoose.model("Setting", settingsSchema);
exports.Students = mongoose.model("Student", studentSchema);
exports.Candidates = mongoose.model("Candidate", candidatesSchema);
exports.Admin = mongoose.model("Admin", adminSchema);