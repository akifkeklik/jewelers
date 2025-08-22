<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card elevation="8" class="pa-6 rounded-xl">
          <!-- Başlık -->
          <v-card-title class="text-h6 font-weight-bold">
            <v-icon left color="amber darken-3">mdi-calculator-variant</v-icon>
            Kuyumculuk Hesap Makinesi
          </v-card-title>
          <v-divider class="my-3"></v-divider>

          <!-- Girdi Alanları -->
          <v-row>
            <v-col cols="12" md="6">
              <v-card class="input-card pa-3" outlined>
                <v-text-field
                    v-model.number="amount"
                    label="Miktar"
                    type="number"
                    dense
                    solo
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
                    label="Birim Seç"
                    dense
                    solo
                    hide-details
                    prepend-inner-icon="mdi-diamond-stone"
                />
              </v-card>
            </v-col>
          </v-row>

          <v-divider class="my-3"></v-divider>

          <!-- Hesaplama Sonucu -->
          <v-card outlined class="pa-4 text-center glass-result">
            <div class="text-h6">Sonuç</div>
            <div class="text-h5 font-weight-bold amber--text mt-2">
              {{ formattedResult }}
            </div>
          </v-card>

          <!-- Tablo -->
          <v-card class="mt-6" outlined>
            <v-card-title class="text-subtitle-1">
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
      return `${this.amount} ${unit.text} ≈ ${totalGrams.toFixed(
          2
      )} gr | ${totalPrice.toLocaleString()} ₺`;
    },
  },
};
</script>

<style scoped>
.v-card {
  background: linear-gradient(135deg, #4b5d70, #5a6f84);
  color: white;
  border-radius: 16px;
}

/* Input kartları daha modern */
.input-card {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  transition: all 0.3s ease;
}
.input-card:hover {
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.3);
}

/* Input içindeki ikonlar */
.v-input__prepend-inner .v-icon {
  color: #ffca28 !important;
}

/* Sonuç kartı */
.glass-result {
  background: rgba(0, 0, 0, 0.25);
  border-radius: 14px;
  color: white;
  padding: 16px;
}

/* Tablo */
.v-simple-table {
  background-color: #f3f3f3;
  border-radius: 10px;
}
.v-simple-table th {
  color: #ffca28;
  font-weight: bold;
}
.v-simple-table tbody tr:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>
