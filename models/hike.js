const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const hikeSchema = new Schema({
  name: { type: String, required: true },
  distance: { type: String, required: false },
  comments: { type: String, required: false },
  img : { type: String, required: false},
  completed:  Boolean,
})

const Hike = mongoose.model("Hike", hikeSchema)

module.exports = Hike;