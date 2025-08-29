const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },     // Yüzük, Kolye, Bilezik, Yatırımlık
    description: { type: String }
});

module.exports = mongoose.model("Category", categorySchema);
