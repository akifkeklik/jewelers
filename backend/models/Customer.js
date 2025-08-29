const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String },
    email: { type: String },
    address: { type: String },
    customerType: { type: String, enum: ["bireysel", "kurumsal"], default: "bireysel" },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Customer", customerSchema);
