<template>
  <v-container>
    <h2 class="mb-4">Ürün & Stok Yönetimi</h2>

    <!-- Ana Kart -->
    <v-card class="pa-4">
      <!-- Arama Kutusu -->
      <v-text-field
          v-model="search"
          placeholder="Ürün Ara (Ad / ID / Barkod)"
          prepend-inner-icon="mdi-magnify"
          outlined
          dense
          hide-details
          clearable
          class="search-bar mb-4"
      />

      <!-- Kamera ile Barkod Tara -->
      <v-btn color="primary" class="mb-4" @click="kameraDialog = true">
        <v-icon left>mdi-camera</v-icon>
        Barkod Tara
      </v-btn>

      <!-- Ürün Listesi -->
      <ProductList
          :urunler="urunler"
          :search="search"
          @urunSil="urunSil"
          @urunDuzenle="duzenlemeBaslat"
      />
    </v-card>

    <!-- Ürün Düzenleme Dialogu -->
    <v-dialog v-model="duzenleDialog" max-width="600px" transition="dialog-bottom-transition">
      <v-card>
        <v-card-title class="headline dialog-header">
          <v-icon left color="blue">mdi-pencil</v-icon>
          Ürün Düzenle
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form ref="duzenleForm" v-model="duzenleFormValid">
            <v-text-field v-model="seciliUrun.ad" label="Ürün Adı" outlined dense />
            <v-select v-model="seciliUrun.kategori" :items="['Altın','Gümüş','Pırlanta','Gıda']" label="Kategori" outlined dense/>
            <v-text-field v-model="seciliUrun.gram" type="number" label="Gram" outlined dense/>
            <v-text-field v-model="seciliUrun.fiyat" type="number" label="Fiyat (₺)" outlined dense/>
            <v-text-field v-model="seciliUrun.barkod" label="Barkod" outlined dense/>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="duzenleDialog=false">İptal</v-btn>
          <v-btn color="primary" :disabled="!duzenleFormValid" @click="duzenlemeKaydet">Kaydet</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Yeni Ürün Ekleme Dialogu -->
    <v-dialog v-model="yeniDialog" max-width="600px" transition="dialog-top-transition">
      <v-card>
        <v-card-title class="headline dialog-header">
          <v-icon left color="primary">mdi-plus</v-icon>
          Yeni Ürün Ekle
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <ProductForm ref="productForm" @urunEklendi="urunEkleDialog" />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="grey" @click="yeniDialog=false">Kapat</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Kamera ile Barkod Okuma Dialogu -->
    <v-dialog v-model="kameraDialog" max-width="600px">
      <v-card>
        <v-card-title class="dialog-header">
          <v-icon left color="primary">mdi-camera</v-icon>
          Barkod Tara
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <StreamBarcodeReader @decode="onDecode" />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="grey" @click="kameraDialog=false">Kapat</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import ProductForm from "./ProductForm.vue";
import ProductList from "./ProductList.vue";
import { StreamBarcodeReader } from "vue-barcode-reader";

export default {
  components: { ProductForm, ProductList, StreamBarcodeReader },
  data() {
    return {
      search: "",
      kameraDialog: false,
      urunler: [
        { id: 1, ad: "Gram Altın", kategori: "Altın", gram: "1", fiyat: 2500, barkod: "123456" },
        { id: 2, ad: "Çeyrek Altın", kategori: "Altın", gram: "1.75", fiyat: 4200, barkod: "789101" },
        { id: 3, ad: "Gümüş Çeyrek", kategori: "Gümüş", gram: "0.25", fiyat: 500, barkod: "111213" },
        { id: 4, ad: "Coca-Cola 330ml", kategori: "Gıda", gram: "0.33", fiyat: 25, barkod: "5449000000996" },
        { id: 5, ad: "Ülker Çikolata", kategori: "Gıda", gram: "0.07", fiyat: 15, barkod: "8690504010019" },
        { id: 6, ad: "Nestlé Su 0.5L", kategori: "Gıda", gram: "0.5", fiyat: 8, barkod: "7613033560123" }
      ],
      duzenleDialog: false,
      yeniDialog: false,
      seciliUrun: {},
      duzenleFormValid: false
    };
  },
  methods: {
    urunEkleDialog(yeni) {
      this.urunler.push(yeni);
      this.yeniDialog = false;
    },
    urunSil(id) {
      if (confirm("Bu ürünü silmek istediğinize emin misiniz?")) {
        this.urunler = this.urunler.filter((u) => u.id !== id);
      }
    },
    duzenlemeBaslat(urun) {
      this.seciliUrun = { ...urun };
      this.duzenleDialog = true;
    },
    duzenlemeKaydet() {
      if (this.$refs.duzenleForm.validate()) {
        const index = this.urunler.findIndex(u => u.id === this.seciliUrun.id);
        if (index !== -1) {
          this.$set(this.urunler, index, { ...this.seciliUrun });
        }
        this.duzenleDialog = false;
      }
    },
    onDecode(result) {
      this.kameraDialog = false;
      const mevcutUrun = this.urunler.find(u => u.barkod === result);
      if (mevcutUrun) {
        this.search = result;
      } else {
        this.search = "";
        this.yeniDialog = true;
        this.$nextTick(() => {
          this.$refs.productForm.urun.barkod = result;
        });
      }
    }
  }
};
</script>

<style scoped>
.search-bar {
  background-color: #f1f3f4 !important; /* pastel gri */
  border-radius: 10px !important;
}
.search-bar input {
  font-size: 14px;
  color: #222;
}
/* Focus efekti */
.search-bar.v-input.v-input--is-focused .v-input__slot {
  border: 2px solid #90caf9 !important;
  box-shadow: 0 0 0 2px rgba(144, 202, 249, 0.2);
  border-radius: 10px;
}
/* Dialog başlık stili */
.dialog-header {
  font-size: 1.1rem;
  font-weight: 600;
  background: #f5f5f5;
  padding: 12px 16px;
  border-radius: 20px 20px 0 0;
}

/* Ürün kartı arka plan rengi */
</style>
