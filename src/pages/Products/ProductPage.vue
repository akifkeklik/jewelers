<template>
  <v-container>
    <h2 class="mb-4">Ürün & Stok Yönetimi</h2>

    <!-- Mevcut Ekleme Formu -->
    <ProductForm @urunEklendi="urunEkle" />

    <!-- Yeni Ürün Ekle Butonu -->
    <v-btn
        color="primary"
        dark
        large
        class="mb-4"
        @click="yeniDialog = true"
    >
      <v-icon left>mdi-plus</v-icon>
      Yeni Ürün Ekle
    </v-btn>

    <!-- Ürün Listesi -->
    <ProductList
        :urunler="urunler"
        @urunSil="urunSil"
        @urunDuzenle="duzenlemeBaslat"
    />

    <!-- Toplam Değer -->
    <div class="mt-4 pa-3" style="background:#f5f5f5; border-radius:8px;">
      <strong>Toplam Stok Değeri:</strong> {{ toplamDeger }} ₺
    </div>

    <!-- Ürün Düzenleme Dialogu -->
    <v-dialog v-model="duzenleDialog" max-width="600px" transition="dialog-bottom-transition">
      <v-card>
        <v-card-title class="headline">
          <v-icon left color="blue">mdi-pencil</v-icon>
          Ürün Düzenle
        </v-card-title>

        <v-card-text>
          <v-form ref="duzenleForm" v-model="duzenleFormValid">
            <v-text-field
                v-model="seciliUrun.ad"
                label="Ürün Adı"
                outlined dense
                :rules="[v => !!v || 'Ürün adı zorunlu']"
            />
            <v-select
                v-model="seciliUrun.kategori"
                :items="['Altın','Gümüş','Pırlanta']"
                label="Kategori"
                outlined dense
                :rules="[v => !!v || 'Kategori seçiniz']"
            />
            <v-text-field
                v-model="seciliUrun.gram"
                type="number"
                label="Gram"
                outlined dense
                :rules="[v => v > 0 || 'Gram > 0 olmalı']"
            />
            <v-text-field
                v-model="seciliUrun.fiyat"
                type="number"
                label="Fiyat (₺)"
                outlined dense
                :rules="[v => v > 0 || 'Fiyat > 0 olmalı']"
            />
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="grey" @click="duzenleDialog=false">İptal</v-btn>
          <v-btn color="primary" :disabled="!duzenleFormValid" @click="duzenlemeKaydet">
            Kaydet
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Yeni Ürün Ekleme Dialogu -->
    <v-dialog v-model="yeniDialog" max-width="600px" transition="dialog-top-transition">
      <v-card>
        <v-card-title class="headline">
          <v-icon left color="green">mdi-plus</v-icon>
          Yeni Ürün Ekle
        </v-card-title>
        <v-card-text>
          <ProductForm @urunEklendi="urunEkleDialog" />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="grey" @click="yeniDialog=false">Kapat</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import ProductForm from "./ProductForm.vue";
import ProductList from "./ProductList.vue";

export default {
  components: { ProductForm, ProductList },
  data() {
    return {
      urunler: [
        { id: 1, ad: "Gram Altın", kategori: "Altın", gram: "1", fiyat: 2500 },
        { id: 2, ad: "Çeyrek Altın", kategori: "Altın", gram: "1.75", fiyat: 4200 },
        { id: 3, ad: "Gümüş Çeyrek", kategori: "Gümüş", gram: "0.25", fiyat: 500 },
        { id: 4, ad: "Altın Yarım", kategori: "Altın", gram: "2.5", fiyat: 6250 },
        { id: 5, ad: "Tam Altın", kategori: "Altın", gram: "5", fiyat: 12500 },
        { id: 6, ad: "Gümüş Yarım", kategori: "Gümüş", gram: "1", fiyat: 150 }
      ],
      duzenleDialog: false,
      yeniDialog: false,
      seciliUrun: {},
      duzenleFormValid: false
    };
  },
  computed: {
    toplamDeger() {
      return this.urunler.reduce((sum, u) => sum + Number(u.fiyat), 0);
    }
  },
  methods: {
    urunEkle(yeni) {
      this.urunler.push(yeni);
    },
    urunEkleDialog(yeni) {
      this.urunler.push(yeni);
      this.yeniDialog = false;
    },
    urunSil(id) {
      this.urunler = this.urunler.filter((u) => u.id !== id);
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
    }
  }
};
</script>
