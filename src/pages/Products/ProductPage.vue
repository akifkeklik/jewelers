<template>
  <v-container fluid>
    <h2 class="mb-4">Ürün & Stok Yönetimi</h2>

    <!-- Ana Kart -->
    <v-card class="pa-6">
      <!-- Arama Kutusu -->
      <v-text-field
          v-model="search"
          placeholder="Ürün Ara (Ad / ID / Barkod)"
          prepend-inner-icon="mdi-magnify"
          outlined
          dense
          hide-details
          clearable
          class="search-bar mb-5"
      />

      <!-- Kamera ile Barkod Tara -->
      <v-btn color="primary" class="mb-5" @click="kameraDialog = true" block>
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

    <!-- Silme Onayı -->
    <v-dialog v-model="deleteDialog" max-width="500px">
      <v-card>
        <v-card-title class="headline delete-title">
          <span class="delete-text">Silmek istediğinize emin misiniz?</span>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <!-- İptal Butonu (Sarı) -->
          <v-btn color="warning" text @click="deleteDialog=false">İptal</v-btn>
          <!-- Sil Butonu (Kırmızı) -->
          <v-btn color="red" text @click="confirmDelete">Sil</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Ürün Düzenleme Dialogu -->
    <v-dialog v-model="duzenleDialog" max-width="700px" transition="dialog-bottom-transition">
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
    <v-dialog v-model="yeniDialog" max-width="700px" transition="dialog-top-transition">
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
    <v-dialog v-model="kameraDialog" max-width="700px">
      <v-card>
        <v-card-title class="dialog-header">
          <v-icon left color="primary">mdi-camera</v-icon>
          Barkod Tara
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <StreamBarcodeReader @decode="onDecode" @error="onDecodeError" />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="kameraDialog=false">Kapat</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Silme İptali ve Onayı için Snackbar -->
    <v-snackbar v-model="snackbar" color="error" timeout="3000">
      <span class="white--text">Ürün başarıyla silindi!</span>
      <v-btn color="pink" text @click="snackbar = false">Kapat</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import { StreamBarcodeReader } from 'vue-barcode-reader';  // Burada import ediyorsunuz
import ProductForm from "./ProductForm.vue";
import ProductList from "./ProductList.vue";

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
      deleteDialog: false, // Yeni silme onayı dialogu state
      seciliUrun: {},
      duzenleFormValid: false,
      urunSilId: null, // Silinecek ürünün ID'si
      snackbar: false, // Silme başarılı olduğunda gösterilecek snackbar
    };
  },
  methods: {
    urunEkleDialog(yeni) {
      this.urunler.push(yeni);
      this.yeniDialog = false;
    },
    urunSil(id) {
      this.urunSilId = id;  // Silinecek ürün ID'sini kaydediyoruz
      this.deleteDialog = true; // Yeni silme onay dialogunu gösteriyoruz
    },
    confirmDelete() {
      this.urunler = this.urunler.filter((u) => u.id !== this.urunSilId);
      this.deleteDialog = false; // Dialogu kapat
      this.snackbar = true; // Silme başarılı olduğunda snackbar'ı göster
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
    },
    onDecodeError(error) {
      console.error("Barkod okuma hatası:", error);
    }
  }
};
</script>

<style scoped>
.search-bar {
  background-color: #f1f3f4 !important;
  border-radius: 10px !important;
  font-size: 18px !important;
  padding: 10px !important;
}

.search-bar input {
  font-size: 18px !important;
  color: #222;
}

.v-btn {
  font-size: 18px;
  padding: 12px 20px;
}

.v-card {
  background-color: #f5f6fa !important;
}

.dialog-header {
  font-size: 22px;
}

.dialog-header v-icon {
  font-size: 24px;
}

.v-form .v-input {
  margin-bottom: 15px;
}

.v-btn {
  font-size: 18px;
}

.v-dialog .v-card {
  padding: 15px;
}

/* Silme Onay Dialogunun Sağ Alt Köşeye Hizalanması */
.v-dialog {
  position: fixed;
  bottom: 20px;
  right: 20px;
}

.delete-text {
  font-size: 18px;
  font-weight: 500;
  color: #222;
}

.delete-title {
  font-size: 20px;
}
</style>
