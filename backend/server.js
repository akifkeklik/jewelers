const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// -------------------- MIDDLEWARE --------------------
app.use(cors());
app.use(bodyParser.json());

// -------------------- MONGODB BAĞLANTISI --------------------
mongoose
    .connect("mongodb://127.0.0.1:27017/kuyumcu_pro", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("✅ MongoDB kuyumcu_pro veritabanına bağlandı"))
    .catch((err) => console.error("❌ MongoDB bağlantı hatası:", err));

// -------------------- MODELLER --------------------
const Material = require("./models/Material");
const Category = require("./models/Category");
const Product = require("./models/Product");
const Customer = require("./models/Customer");
const Sale = require("./models/Sale");
const Setting = require("./models/Setting");

// -------------------- ENDPOINTLER --------------------

// ===== MATERIALS =====
app.get("/api/materials", async (req, res) => {
    res.json(await Material.find());
});

app.post("/api/materials", async (req, res) => {
    try {
        const newMaterial = new Material(req.body);
        await newMaterial.save();
        res.json(newMaterial);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ===== CATEGORIES =====
app.get("/api/categories", async (req, res) => {
    res.json(await Category.find());
});

app.post("/api/categories", async (req, res) => {
    try {
        const newCategory = new Category(req.body);
        await newCategory.save();
        res.json(newCategory);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ===== PRODUCTS =====
app.get("/api/products", async (req, res) => {
    const products = await Product.find()
        .populate("categoryId")
        .populate("materialId");

    // FRONTEND’E UYUMLU ŞEKİLDE MAPLE
    const mapped = products.map(p => ({
        _id: p._id,
        ad: p.name,                  // ürün adı
        gram: p.weight,              // gram
        fiyat: p.price,              // fiyat
        barkod: p.barcode,           // barkod
        aciklama: p.description,     // açıklama
        kategori: p.categoryId ? p.categoryId.name : null,
        hammadde: p.materialId ? p.materialId.name : null,
        stok: p.stock
    }));

    res.json(mapped);
});

app.post("/api/products", async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.json(newProduct);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ===== CUSTOMERS =====
app.get("/api/customers", async (req, res) => {
    const customers = await Customer.find();

    // FRONTEND’E UYUMLU
    const mapped = customers.map(c => ({
        _id: c._id,
        ad: c.name,
        telefon: c.phone,
        email: c.email,
        adres: c.address,
        tur: c.customerType,
        createdAt: c.createdAt
    }));

    res.json(mapped);
});

app.post("/api/customers", async (req, res) => {
    try {
        const newCustomer = new Customer(req.body);
        await newCustomer.save();
        res.json(newCustomer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ===== SALES =====
app.get("/api/sales", async (req, res) => {
    const sales = await Sale.find()
        .populate("customerId")
        .populate("productId");

    // FRONTEND’E UYUMLU
    const mapped = sales.map(s => ({
        _id: s._id,
        musteri: s.customerId ? s.customerId.name : null,
        urun: s.productId ? s.productId.name : null,
        miktar: s.quantity,
        toplam: s.totalPrice,
        odeme: s.paymentMethod,
        tarih: s.date
    }));

    res.json(mapped);
});

app.post("/api/sales", async (req, res) => {
    try {
        const newSale = new Sale(req.body);
        await newSale.save();
        res.json(newSale);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ===== SETTINGS =====
app.get("/api/settings", async (req, res) => {
    res.json(await Setting.find());
});

app.post("/api/settings", async (req, res) => {
    try {
        const newSetting = new Setting(req.body);
        await newSetting.save();
        res.json(newSetting);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// -------------------- TEST --------------------
app.get("/", (req, res) => {
    res.send("Backend kuyumcu_pro veritabanı ile çalışıyor 🚀");
});

// -------------------- SUNUCU --------------------
app.listen(PORT, () => {
    console.log(`✅ Backend http://localhost:${PORT} adresinde çalışıyor`);
});
