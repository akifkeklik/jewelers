const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, default: 1 },
    totalPrice: { type: Number, required: true },
    currency: { type: String, default: "TRY" },
    date: { type: Date, default: Date.now },
    paymentMethod: { type: String, enum: ["nakit", "kart", "havale"], default: "nakit" }
});

module.exports = mongoose.model("Sale", saleSchema);
