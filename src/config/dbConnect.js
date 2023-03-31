import mongoose from "mongoose";

mongoose.connect("mongodb+srv://Menozet:685kf8j36f@cluster0.kjmi1pj.mongodb.net/node");

let db = mongoose.connection;

export default db;