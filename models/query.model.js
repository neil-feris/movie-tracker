// setup a model for previously searched movies
import mongoose from "mongoose";

const querySchema = new mongoose.Schema({
  query: { type: String, required: true },
  timestamp: { type: Date, required: true },
});

const Query = mongoose.model("Query", querySchema);

export default Query;