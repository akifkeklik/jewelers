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
          <v-btn color="warning" text @click="deleteDialog=false">İptal</v-btn>
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
            <v-select :menu-props="{offsetY:true}" v-model="seciliUrun.kategori" :items="['Altın','Gümüş','Pırlanta','Gıda']" label="Kategori" outlined dense/>
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
          <!-- Video Akışı -->
          <video ref="video" width="100%" height="auto" autoplay></video>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="kameraDialog=false; stopCamera()">Kapat</v-btn>
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
import ProductForm from "./ProductForm.vue";
import ProductList from "./ProductList.vue";

export default {
  components: { ProductForm, ProductList },
  data() {
    return {
      search: "",
      kameraDialog: false,
      urunler: [
        { id: 1, ad: "Gram Altın", kategori: "Altın", gram: 1, fiyat: 2500, barkod: "100001" },
        { id: 2, ad: "Çeyrek Altın", kategori: "Altın", gram: 1.75, fiyat: 4200, barkod: "100002" },
        { id: 3, ad: "Yarım Altın", kategori: "Altın", gram: 3.5, fiyat: 8400, barkod: "100003" },
        { id: 4, ad: "Tam Altın (Cumhuriyet)", kategori: "Altın", gram: 7, fiyat: 16800, barkod: "100004" },
        { id: 5, ad: "Gümüş Gram", kategori: "Gümüş", gram: 1, fiyat: 35, barkod: "100005" },
        { id: 6, ad: "Gümüş Bileklik", kategori: "Gümüş", gram: 10, fiyat: 400, barkod: "100006" },
        { id: 7, ad: "22 Ayar Bilezik", kategori: "Altın", gram: 15, fiyat: 37500, barkod: "100007" }
      ],
      duzenleDialog: false,
      yeniDialog: false,
      deleteDialog: false,
      seciliUrun: {},
      duzenleFormValid: false,
      urunSilId: null,
      snackbar: false,
      videoStream: null,  // Video akışını tutacak değişken
    };
  },
  methods: {
    urunEkleDialog(yeni) {
      this.urunler.push(yeni);
      this.yeniDialog = false;
    },
    urunSil(id) {
      this.urunSilId = id;
      this.deleteDialog = true;
    },
    confirmDelete() {
      this.urunler = this.urunler.filter((u) => u.id !== this.urunSilId);
      this.deleteDialog = false;
      this.snackbar = true;
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

    // Kamera akışını başlat
    startCamera() {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
              this.$refs.video.srcObject = stream;
              this.videoStream = stream;
            })
            .catch((error) => {
              console.error('Kamera hatası:', error);
            });
      } else {
        alert('Tarayıcınız kamera akışını desteklemiyor!');
      }
    },

    // Kamera akışını durdur
    stopCamera() {
      if (this.videoStream) {
        let tracks = this.videoStream.getTracks();
        tracks.forEach(track => track.stop());
      }
    },
  },
  watch: {
    kameraDialog(newValue) {
      if (newValue) {
        this.startCamera();
      } else {
        this.stopCamera();
      }
    },
  },
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

video {
  width: 100%;
  height: auto;
}
</style>
