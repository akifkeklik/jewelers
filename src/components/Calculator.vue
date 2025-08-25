<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card elevation="10" class="pa-6 calc-card">
          <!-- Başlık -->
          <v-card-title class="calc-header">
            <v-icon left color="#1E3A8A">mdi-calculator-variant</v-icon> <!-- Lacivert -->
            Kuyumculuk Hesap Makinesi
          </v-card-title>
          <v-divider class="mb-4"></v-divider>

          <!-- Girdi Alanları -->
          <v-row>
            <v-col cols="12" md="6">
              <v-card class="input-card pa-3" outlined>
                <v-text-field
                    v-model.number="amount"
                    label="Miktar"
                    type="number"
                    dense
                    outlined
                    hide-details
                    prepend-inner-icon="mdi-scale-balance"
                />
              </v-card>
            </v-col>

            <v-col cols="12" md="6">
              <v-card class="input-card pa-3" outlined>
                <v-select
                    v-model="selectedUnit"
                    :items="units"
                    item-text="text"
                    item-value="value"
                    label="Birim Seç"
                    dense
                    outlined
                    hide-details
                    prepend-inner-icon="mdi-diamond-stone"
                />
              </v-card>
            </v-col>
          </v-row>

          <!-- Hesaplama Sonucu -->
          <v-card outlined class="pa-5 mt-4 result-card text-center">
            <div class="text-h6 font-weight-medium result-text">Sonuç</div>
            <div class="text-h5 font-weight-bold mt-2 result-text">
              {{ formattedResult }}
            </div>
          </v-card>

          <!-- Tablo -->
          <v-card class="mt-6 table-card" outlined>
            <v-card-title class="text-subtitle-1 font-weight-bold result-text">
              Güncel Birim Fiyatları
            </v-card-title>
            <v-simple-table dense>
              <thead>
              <tr>
                <th>Birim</th>
                <th>Gram Karşılığı</th>
                <th>TL Fiyatı</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="u in units" :key="u.value">
                <td>{{ u.text }}</td>
                <td>{{ u.gram }} gr</td>
                <td>{{ (u.gram * pricePerGram).toLocaleString() }} ₺</td>
              </tr>
              </tbody>
            </v-simple-table>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Calculator",
  data() {
    return {
      amount: 1,
      selectedUnit: null,
      pricePerGram: 1000,
      units: [
        { text: "Gram Altın", value: "gram", gram: 1 },
        { text: "Çeyrek Altın", value: "ceyrek", gram: 1.75 },
        { text: "Yarım Altın", value: "yarim", gram: 3.5 },
        { text: "Tam Altın", value: "tam", gram: 7 },
        { text: "Ata Lira", value: "ata", gram: 7.216 },
      ],
    };
  },
  computed: {
    formattedResult() {
      if (!this.selectedUnit) return "Birim seçiniz";
      const unit = this.units.find((u) => u.value === this.selectedUnit);
      const totalGrams = this.amount * unit.gram;
      const totalPrice = totalGrams * this.pricePerGram;
      return `${this.amount} ${unit.text} ≈ ${totalGrams.toFixed(2)} gr | ${totalPrice.toLocaleString()} ₺`;
    },
  },
};
</script>

<style scoped>
/* Ana kart */
.calc-card {
  border-radius: 20px;
  background: linear-gradient(135deg, #1e293b, #2a3c5f);
  color: #fff;
  box-shadow: 0 8px 20px rgba(0,0,0,0.2);
}

/* Başlık */
.calc-header {
  font-size: 1.2rem;
  font-weight: bold;
  color: black;
}

/* Input kartları */
.input-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 14px;
  transition: 0.3s;
}
.input-card:hover {
  background: rgba(255, 255, 255, 0.12);
  box-shadow: 0 6px 16px rgba(0,0,0,0.25);
}

/* Sonuç kartı */
.result-card {
  border-radius: 16px;
  background: rgba(255, 215, 0, 0.08);
}
.result-text {
  color: black !important; /* Lacivert metin rengi */
}

/* Tablo */
.table-card {
  border-radius: 16px;
  background: #f9f9f9;
}
.v-simple-table thead {
  background: #f1f1f1;
}
.v-simple-table th {
  font-weight: 600;
  color: #444;
}
.v-simple-table td {
  font-weight: 500;
  color: #333;
}
.v-simple-table tbody tr:hover {
  background-color: #fffbe6;
}
</style>
