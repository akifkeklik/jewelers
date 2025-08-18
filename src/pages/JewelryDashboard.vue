<template>
  <v-app>
    <!-- APP BAR -->
    <v-app-bar app color="deep-purple" dark dense>
      <v-app-bar-nav-icon @click="drawer = true"/>
      <v-toolbar-title>Kuyumcu Pro</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- 🌙 Gece Modu -->
      <v-switch
          v-model="$vuetify.theme.dark"
          inset
          hide-details
          label="🌙"
      />
    </v-app-bar>

    <!-- DRAWER -->
    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list nav dense>
        <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
          <v-list-item v-for="(item, i) in menuItems" :key="i" :to="item.to">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <!-- MAIN -->
    <v-main>
      <v-container fluid>
        <!-- Hoşgeldiniz -->
        <v-row class="mb-4 align-center">
          <v-col>
            <h2 class="font-weight-bold">KUYUMCU PRO'ya HOŞGELDİNİZ !</h2>
          </v-col>
        </v-row>

        <!-- KPI Kartları -->
        <v-row dense class="mb-6">
          <v-col cols="12" sm="6" md="3" v-for="kpi in kpis" :key="kpi.title">
            <v-card class="pa-4 text-center kpi-card" outlined>
              <v-icon x-large class="mb-2" :color="kpi.color">{{ kpi.icon }}</v-icon>
              <div class="subtitle-2 grey--text">{{ kpi.title }}</div>
              <div class="text-h5 font-weight-bold">{{ kpi.value }}</div>
            </v-card>
          </v-col>
        </v-row>

        <!-- Orta Alan -->
        <v-row dense>
          <!-- Sol: Altın & Gümüş -->
          <v-col cols="12" md="6">
            <v-card elevation="2" class="pa-3 rounded-lg fill-height" outlined>
              <div class="d-flex align-center justify-space-between mb-2">
                <div class="d-flex align-center">
                  <v-icon class="mr-2" color="amber darken-3">mdi-gold</v-icon>
                  <span class="subtitle-1 font-weight-medium">Altın Piyasası</span>
                </div>
                <v-chip small outlined>{{ lastUpdate }}</v-chip>
              </div>

              <v-divider></v-divider>

              <v-row class="mt-2" dense>
                <v-col cols="6" sm="3" v-for="(p, i) in gold" :key="'gold-'+i">
                  <v-sheet class="pa-3 rounded-lg price-tile" outlined>
                    <div class="caption text--secondary">{{ p.name }}</div>
                    <div class="headline font-weight-bold">
                      {{ p.buy }} ₺
                    </div>
                    <v-chip small :color="p.change>0 ? 'green lighten-4' : 'red lighten-4'" text-color="black">
                      <v-icon left small>
                        {{ p.change > 0 ? 'mdi-trending-up' : 'mdi-trending-down' }}
                      </v-icon>
                      {{ p.change }}%
                    </v-chip>
                  </v-sheet>
                </v-col>
              </v-row>

              <div class="d-flex align-center justify-space-between mt-4">
                <div class="d-flex align-center">
                  <v-icon class="mr-2" color="blue-grey">mdi-silverware</v-icon>
                  <span class="subtitle-1 font-weight-medium">Gümüş Piyasası</span>
                </div>
              </div>

              <v-divider class="my-2"></v-divider>

              <v-row dense>
                <v-col cols="6" sm="3" v-for="(p, i) in silver" :key="'silver-'+i">
                  <v-sheet class="pa-3 rounded-lg price-tile" outlined>
                    <div class="caption text--secondary">{{ p.name }}</div>
                    <div class="headline font-weight-bold">
                      {{ p.buy }} ₺
                    </div>
                    <v-chip small :color="p.change>0 ? 'green lighten-4' : 'red lighten-4'" text-color="black">
                      <v-icon left small>
                        {{ p.change > 0 ? 'mdi-trending-up' : 'mdi-trending-down' }}
                      </v-icon>
                      {{ p.change }}%
                    </v-chip>
                  </v-sheet>
                </v-col>
              </v-row>
            </v-card>
          </v-col>

          <!-- Sağ: Döviz + Hesap -->
          <v-col cols="12" md="6" class="d-flex flex-column">
            <v-card elevation="2" class="pa-3 rounded-lg mb-4" outlined>
              <div class="d-flex align-center justify-space-between mb-2">
                <div class="d-flex align-center">
                  <v-icon class="mr-2" color="green darken-2">mdi-currency-usd</v-icon>
                  <span class="subtitle-1 font-weight-medium">TRY / USD</span>
                </div>
                <v-chip small outlined>{{ lastUpdate }}</v-chip>
              </div>

              <v-divider></v-divider>

              <v-row class="mt-2" dense>
                <v-col cols="6" v-for="(p, i) in trusd" :key="'usd-'+i">
                  <v-sheet class="pa-3 rounded-lg price-tile" outlined>
                    <div class="caption text--secondary">{{ p.name }}</div>
                    <div class="headline font-weight-bold">{{ p.buy }} ₺</div>
                    <v-chip small :color="p.change>0 ? 'green lighten-4' : 'red lighten-4'" text-color="black">
                      <v-icon left small>
                        {{ p.change > 0 ? 'mdi-trending-up' : 'mdi-trending-down' }}
                      </v-icon>
                      {{ p.change }}%
                    </v-chip>
                  </v-sheet>
                </v-col>
              </v-row>
            </v-card>

            <!-- Hesap Makinesi -->
            <v-card elevation="2" class="pa-4 rounded-lg flex-grow-1" outlined>
              <v-card-title class="subtitle-1 font-weight-bold">Hesap Makinesi</v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="6">
                    <v-select v-model="hesap.from" :items="birimler" label="Dönüştür" dense />
                  </v-col>
                  <v-col cols="6">
                    <v-select v-model="hesap.to" :items="birimler" label="TL veya Diğer" dense />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model.number="hesap.miktar" label="Miktar" type="number" dense />
                  </v-col>
                </v-row>
                <div class="text-subtitle-1 font-weight-bold green--text mt-2">
                  {{ hesapSonuc }}
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Hızlı İşlemler -->
        <v-row class="pt-4" dense>
          <v-col cols="12">
            <v-card elevation="2" class="pa-3 rounded-lg" outlined>
              <div class="d-flex align-center">
                <v-icon class="mr-2" color="orange darken-2">mdi-lightning-bolt</v-icon>
                <span class="title font-weight-medium">Hızlı İşlemler</span>
              </div>

              <v-divider class="my-2"></v-divider>

              <v-row dense>
                <v-col v-for="(m, i) in modules" :key="'mod-'+i" cols="12" sm="6" md="3">
                  <v-card class="d-flex align-center justify-center pa-6 text-center fast-action-card"
                          :color="m.color" dark height="120" :to="m.to">
                    <div>
                      <v-icon large class="mb-2">{{ m.icon }}</v-icon>
                      <div class="font-weight-bold">{{ m.title }}</div>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'JewelryDashboard',
  data: () => ({
    drawer: false,
    group: 0,
    lastUpdate: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
    kpis: [
      { title: "Toplam Satış", value: "₺1.200.000", icon: "mdi-cash", color: "green" },
      { title: "Stok Değeri", value: "₺850.000", icon: "mdi-archive", color: "blue" },
      { title: "Kâr", value: "₺320.000", icon: "mdi-trending-up", color: "orange" },
      { title: "Müşteri", value: "1450", icon: "mdi-account", color: "purple" },
    ],
    menuItems: [
      { title: "Dashboard", icon: "mdi-view-dashboard", to: "/dashboard" },
      { title: "Satış", icon: "mdi-cash-register", to: "/satis" },
      { title: "Raporlar", icon: "mdi-chart-bar", to: "/raporlar" },
      { title: "Stok", icon: "mdi-warehouse", to: "/stok" },
      { title: "Müşteri", icon: "mdi-account", to: "/musteriBilgi" },
      { title: "Kargo", icon: "mdi-truck", to: "/kargo" },
      { title: "Ürünler", icon: "mdi-diamond-stone", to: "/urunler" },
      { title: "Kategoriler", icon: "mdi-shape", to: "/kategoriler" },
      { title: "Toptancılar", icon: "mdi-domain", to: "/toptancilar" }
    ],
    gold: [
      {name: 'Gram Altın', buy: '2.585', change: 0.8},
      {name: 'Çeyrek', buy: '4.250', change: -0.4},
      {name: 'Yarım', buy: '8.450', change: 0.2},
      {name: 'Cumhuriyet', buy: '16.900', change: -0.1},
    ],
    silver: [
      {name: 'Gram Gümüş', buy: '585', change: 0.8},
      {name: 'Çeyrek', buy: '1.250', change: -0.4},
      {name: 'Yarım', buy: '2.450', change: 0.2},
      {name: 'Kilo', buy: '5.023', change: -0.1},
    ],
    trusd: [
      {name: 'Alış', buy: '42', change: 0.8},
      {name: 'Satış', buy: '43', change: -0.49},
    ],
    treuro: [
      {name: 'Alış', buy: '46', change: 0.12},
      {name: 'Satış', buy: '47', change: -0.21},
    ],
    birimler: ["Gram Altın", "USD", "EUR", "GBP", "TL"],
    hesap: { from: "USD", to: "TL", miktar: 1 },
    modules: [
      { title: "Yeni Satış", icon: "mdi-cart-plus", color: "indigo darken-1", to: { name: "satis" } },
      { title: "Stok Ekle", icon: "mdi-database-plus", color: "green darken-1", to: { name: "stok" } },
      { title: "Müşteri Bilgisi", icon: "mdi-account-group", color: "deep-purple darken-1", to: { name: "musteriBilgi" } },
      { title: "Raporlar", icon: "mdi-chart-bar", color: "orange darken-2", to: { name: "raporlar" } },
      { title: "Kargo", icon: "mdi-truck", color: "blue darken-2", to: { name: "kargo" } },
      { title: "Ürünler", icon: "mdi-diamond-stone", color: "pink darken-1", to: { name: "urunler" } },
      { title: "Kategoriler", icon: "mdi-shape", color: "cyan darken-2", to: { name: "kategoriler" } },
      { title: "Toptancılar", icon: "mdi-domain", color: "brown darken-2", to: { name: "toptancilar" } }
    ],
  }),
  computed: {
    hesapSonuc() {
      const rates = { "USD": 32.45, "EUR": 35.12, "GBP": 41.25, "Gram Altın": 2450, "TL": 1 };
      const fromRate = rates[this.hesap.from];
      const toRate = rates[this.hesap.to];
      if (!fromRate || !toRate) return "Seçim yapınız";
      const sonuc = (this.hesap.miktar * fromRate) / toRate;
      return `${this.hesap.miktar} ${this.hesap.from} = ${sonuc.toFixed(2)} ${this.hesap.to}`;
    },
  },
  mounted() {
    setInterval(() => {
      this.lastUpdate = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    }, 60000)
  }
}
</script>

<style scoped>
.kpi-card {
  transition: transform .15s ease, box-shadow .15s ease;
}
.kpi-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.15);
}
.price-tile {
  transition: transform .15s ease, box-shadow .15s ease;
}
.price-tile:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
.fast-action-card {
  transition: transform .15s ease, box-shadow .15s ease;
  border-radius: 12px;
}
.fast-action-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.2);
}
</style>
