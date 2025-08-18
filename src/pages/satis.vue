<template>
  <v-container fluid class="pa-4">
    <!-- Başlık -->
    <v-row>
      <v-col cols="12">
        <h1 class="title-text">SATIŞ EKRANI</h1>
      </v-col>
    </v-row>

    <!-- Kartlar -->
    <v-row dense>
      <v-col cols="12" md="3">
        <v-card class="pa-4">
          <div class="title-text">Toplam Satış</div>
          <div class="money">₺1.200.000</div>
        </v-card>
      </v-col>

      <v-col cols="12" md="3">
        <v-card class="pa-4">
          <div class="title-text">Kâr</div>
          <div class="money">₺320.000</div>
        </v-card>
      </v-col>

      <v-col cols="12" md="3">
        <v-card class="pa-4">
          <div class="title-text">Müşteri</div>
          <div class="money">1450</div>
        </v-card>
      </v-col>

      <v-col cols="12" md="3">
        <v-card class="pa-4">
          <div class="title-text">Stok Değeri</div>
          <div class="money">₺850.000</div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Ürün Tablosu -->
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-data-table
              :headers="headers"
              :items="items"
              class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Satış Listesi</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn color="info" dark @click="yeniUrunEkle">
                  Ürün Ekle
                </v-btn>
              </v-toolbar>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <!-- Fiş Alanı -->
    <v-row>
      <v-col cols="12" md="6">
        <v-card id="fisPrint" class="receipt-card pa-4">
          <h3 class="title-text">Satış Fişi</h3>
          <div v-for="(urun, i) in items" :key="i">
            {{ urun.ad }} - {{ urun.fiyat }} ₺ x {{ urun.adet }}
          </div>
          <hr />
          <div class="money">TOPLAM: ₺{{ toplamTutar }}</div>
        </v-card>
      </v-col>

      <!-- İşlem Butonları -->
      <v-col cols="12" md="6" class="d-flex flex-column gap-3">
        <v-btn class="success mb-2" dark @click="satisiOnayla">
          Satışı Onayla
        </v-btn>
        <v-btn class="error mb-2" dark @click="temizle">
          Temizle
        </v-btn>
        <v-btn class="info" dark @click="yazdir">
          Yazdır
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "SatisEkrani",
  data() {
    return {
      headers: [
        { text: "Ürün Adı", value: "ad" },
        { text: "Fiyat", value: "fiyat" },
        { text: "Adet", value: "adet" },
        { text: "Toplam", value: "toplam" },
      ],
      items: [
        { ad: "Altın Bilezik", fiyat: 5000, adet: 2, toplam: 10000 },
        { ad: "Gümüş Kolye", fiyat: 1200, adet: 1, toplam: 1200 },
      ],
    };
  },
  computed: {
    toplamTutar() {
      return this.items.reduce((acc, urun) => acc + urun.toplam, 0);
    },
  },
  methods: {
    yeniUrunEkle() {
      this.items.push({
        ad: "Yeni Ürün",
        fiyat: 1000,
        adet: 1,
        toplam: 1000,
      });
    },
    satisiOnayla() {
      alert("Satış onaylandı!");
    },
    temizle() {
      this.items = [];
    },
    yazdir() {
      window.print();
    },
  },
};
</script>

<style scoped>
/* Başlıklar */
.title-text {
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: #333;
}

/* Rakam fontu */
.money {
  font-family: "Roboto Mono", monospace;
  font-size: 1.1rem;
}

/* Kart tasarımları */
.v-card {
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

/* Tablo başlıkları */
.v-data-table th {
  background-color: #fafafa;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.85rem;
}

/* Zebra tablo */
.v-data-table tbody tr:nth-child(odd) {
  background-color: #fcfcfc;
}

/* Fiş alanı */
.receipt-card {
  border: 1px dashed #ccc;
  background: #fffef9;
}

/* Dashboard uyumlu butonlar */
.v-btn.success {
  background-color: #4caf50 !important;
}
.v-btn.error {
  background-color: #f44336 !important;
}
.v-btn.info {
  background-color: #2196f3 !important;
}

/* Yazdırma */
@media print {
  body * {
    visibility: hidden !important;
  }
  #fisPrint,
  #fisPrint * {
    visibility: visible !important;
  }
  #fisPrint {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
}
</style>
