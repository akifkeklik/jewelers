const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    weight: Number,
    price: Number,
    barcode: String,
    description: String,
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    materialId: { type: mongoose.Schema.Types.ObjectId, ref: "Material" },
    stock: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
