<template>
  <v-container fluid class="pa-6" style="background:#f5f5f5">
    <!-- KPI Cards -->
    <v-row dense>
      <v-col cols="12" md="3" v-for="(kpi, i) in kpis" :key="i">
        <v-card class="pa-4 d-flex align-center" :color="kpi.color" dark elevation="2" rounded="xl">
          <v-icon x-large class="mr-4">{{ kpi.icon }}</v-icon>
          <div>
            <div class="text-h6 font-weight-bold">{{ kpi.label }}</div>
            <div class="text-h5">{{ kpi.value }}</div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Filters -->
    <v-card class="mt-6 pa-4" outlined>
      <v-row dense>
        <v-col cols="12" md="4">
          <v-text-field v-model="search" label="Ara (Takip No / Müşteri)" prepend-icon="mdi-magnify" dense clearable />
        </v-col>
        <v-col cols="12" md="3">
          <v-select :items="statusOptions" v-model="selectedStatus" label="Durum Filtrele" dense clearable />
        </v-col>
        <v-col cols="12" md="5" class="d-flex">
          <v-menu
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                  v-model="dateRangeText"
                  label="Tarih Aralığı"
                  prepend-icon="mdi-calendar"
                  readonly
                  dense
                  v-bind="attrs"
                  v-on="on"
              />
            </template>
            <v-date-picker v-model="dates" range @change="menu = false" />
          </v-menu>
        </v-col>
      </v-row>
    </v-card>

    <!-- Table -->
    <v-card class="mt-6" outlined>
      <v-card-title class="text-h6 font-weight-bold">Kargo Gönderileri</v-card-title>
      <v-data-table
          :headers="headers"
          :items="filteredShipments"
          class="elevation-1"
          dense
      >
        <template v-slot:item.status="{ item }">
          <v-chip :color="statusColor(item.status)" dark small>
            {{ item.status }}
          </v-chip>
        </template>
      </v-data-table>
    </v-card>

    <!-- Charts & Map -->
    <v-row dense class="mt-6">
      <v-col cols="12" md="6">
        <v-card outlined class="pa-4">
          <v-card-title class="text-h6 font-weight-bold">Teslimat Trendleri</v-card-title>
          <canvas id="deliveryChart"></canvas>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card outlined class="pa-4">
          <v-card-title class="text-h6 font-weight-bold">Harita</v-card-title>
          <div class="text-center" style="height:300px; background:#e5e5e5; border-radius:8px;">
            <v-icon size="80" color="grey">mdi-map</v-icon>
            <div>Harita entegrasyonu buraya gelecek</div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { onMounted, ref, computed } from "vue";
import Chart from "chart.js/auto";

export default {
  name: "CargoDashboard",
  setup() {
    const kpis = ref([
      { label: "Toplam Gönderi", value: 245, color: "blue lighten-1", icon: "mdi-package-variant" },
      { label: "Teslim Edildi", value: 180, color: "green darken-1", icon: "mdi-check-circle" },
      { label: "Yolda", value: 50, color: "orange darken-1", icon: "mdi-truck-delivery" },
      { label: "Geciken", value: 15, color: "red darken-1", icon: "mdi-alert" },
    ]);

    const headers = [
      { text: "Takip No", value: "tracking", align: "start", sortable: true },
      { text: "Müşteri", value: "customer" },
      { text: "Kurye", value: "courier" },
      { text: "Gönderim Tarihi", value: "shipDate" },
      { text: "ETA", value: "eta" },
      { text: "Tip", value: "type" },
      { text: "Durum", value: "status" },
    ];

    const shipments = ref([
      { tracking: "TRX123", customer: "Ahmet Yılmaz", courier: "Murat K.", shipDate: "2025-08-15", eta: "2025-08-18", type: "Standart", status: "Yolda" },
      { tracking: "TRX124", customer: "Mehmet Kaya", courier: "Ali V.", shipDate: "2025-08-14", eta: "2025-08-17", type: "Express", status: "Teslim Edildi" },
      { tracking: "TRX125", customer: "Ayşe Demir", courier: "Zeynep T.", shipDate: "2025-08-13", eta: "2025-08-16", type: "Standart", status: "Depoda" },
      { tracking: "TRX126", customer: "Fatma Çelik", courier: "Kemal B.", shipDate: "2025-08-12", eta: "2025-08-15", type: "Express", status: "Geciken" },
    ]);

    const statusOptions = ["Teslim Edildi", "Yolda", "Depoda", "Geciken"];

    const search = ref("");
    const selectedStatus = ref(null);

    const menu = ref(false);
    const dates = ref([]);
    const dateRangeText = computed(() => dates.value.join(" ~ "));

    const filteredShipments = computed(() => {
      return shipments.value.filter((s) => {
        const matchesSearch =
            s.tracking.toLowerCase().includes(search.value.toLowerCase()) ||
            s.customer.toLowerCase().includes(search.value.toLowerCase());

        const matchesStatus = selectedStatus.value ? s.status === selectedStatus.value : true;

        return matchesSearch && matchesStatus;
      });
    });

    const statusColor = (status) => {
      switch (status) {
        case "Teslim Edildi": return "green";
        case "Yolda": return "orange";
        case "Depoda": return "blue";
        case "Geciken": return "red";
        default: return "grey";
      }
    };

    onMounted(() => {
      const ctx = document.getElementById("deliveryChart");
      new Chart(ctx, {
        type: "line",
        data: {
          labels: ["10 Ağu", "11 Ağu", "12 Ağu", "13 Ağu", "14 Ağu", "15 Ağu", "16 Ağu"],
          datasets: [
            {
              label: "Teslimatlar",
              data: [12, 19, 9, 15, 22, 18, 25],
              fill: false,
              borderColor: "blue",
              tension: 0.3,
            },
          ],
        },
      });
    });

    return {
      kpis,
      headers,
      shipments,
      statusOptions,
      search,
      selectedStatus,
      menu,
      dates,
      dateRangeText,
      filteredShipments,
      statusColor,
    };
  },
};
</script>
