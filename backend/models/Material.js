const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema({
    name: { type: String, required: true },     // Altın, Gümüş, Pırlanta
    purity: { type: String },                   // 24k, 22k, saf vs.
    unit: { type: String, default: "gram" },    // gram, adet vb.
    pricePerUnit: { type: Number, required: true },
    currency: { type: String, default: "TRY" },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Material", materialSchema);
