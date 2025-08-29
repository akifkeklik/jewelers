const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema({
    key: { type: String, required: true, unique: true },   // Örn: usd_try, eur_try
    value: { type: mongoose.Schema.Types.Mixed, required: true }, // sayı, string vs.
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Setting", settingSchema);
