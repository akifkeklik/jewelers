<template>
  <v-container fluid>
    <h2 class="mb-4">Müşteriler </h2>
    <!-- KPI Kartları -->
    <v-row class="mb-4">
      <v-col cols="12" md="3" v-for="card in kpiCards" :key="card.title">
        <v-card class="pa-4 text-center">
          <v-icon large class="mb-2" color="primary">{{ card.icon }}</v-icon>
          <h3>{{ card.value }}</h3>
          <p class="grey--text">{{ card.title }}</p>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <!-- Sol Panel: Müşteri Listesi -->
      <v-col cols="12" md="4">
        <v-card class="pa-3">
          <v-text-field
              v-model="search"
              label="Müşteri Ara"
              prepend-icon="mdi-magnify"
              outlined dense
          ></v-text-field>

          <v-data-table
              :headers="headers"
              :items="filteredMusteriler"
              dense
              :items-per-page="5"
              @click:row="selectMusteri"
          >
            <template v-slot:[`item.etiket`]="{ item }">
              <v-chip small :color="getEtiketRenk(item.etiket)" dark>
                {{ item.etiket }}
              </v-chip>
            </template>

            <template v-slot:[`item.islemler`]="{ item }">
              <v-btn icon small color="primary" @click.stop="selectMusteri(item)">
                <v-icon>mdi-eye</v-icon>
              </v-btn>
              <v-btn icon small color="error" @click.stop="onDelete(item)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-data-table>

          <!-- Yeni Müşteri Butonu -->
          <v-btn color="primary" block class="mt-3" @click="dialog = true">
            <v-icon left>mdi-account-plus</v-icon> Yeni Müşteri
          </v-btn>
        </v-card>
      </v-col>

      <!-- Sağ Panel: Müşteri Detayı -->
      <v-col cols="12" md="8" v-if="selectedMusteri">
        <v-card class="pa-4">
          <v-row>
            <v-col cols="8">
              <h3>{{ selectedMusteri.ad }} {{ selectedMusteri.soyad }}</h3>
              <p><v-icon small>mdi-phone</v-icon> {{ selectedMusteri.telefon }}</p>
              <p><v-icon small>mdi-email</v-icon> {{ selectedMusteri.email }}</p>
              <v-chip small :color="getEtiketRenk(selectedMusteri.etiket)" dark>
                {{ selectedMusteri.etiket }}
              </v-chip>
            </v-col>
            <v-col cols="4" class="text-right">
              <v-btn icon color="primary"><v-icon>mdi-pencil</v-icon></v-btn>
              <v-btn icon color="error" @click="onDelete(selectedMusteri)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-col>
          </v-row>

          <v-divider class="my-3"></v-divider>

          <!-- Satış Geçmişi -->
          <h4>Satış Geçmişi</h4>
          <v-simple-table dense>
            <thead>
            <tr><th>Ürün</th><th>Tutar</th><th>Tarih</th></tr>
            </thead>
            <tbody>
            <tr v-for="s in selectedMusteri.satislar" :key="s.id">
              <td>{{ s.urun }}</td>
              <td>{{ s.tutar }} ₺</td>
              <td>{{ s.tarih }}</td>
            </tr>
            </tbody>
          </v-simple-table>

          <v-divider class="my-3"></v-divider>

          <!-- Notlar -->
          <h4>Notlar</h4>
          <v-textarea
              v-model="selectedMusteri.notlar"
              label="Müşteri Notları"
              outlined
              rows="3"
          ></v-textarea>
        </v-card>
      </v-col>
    </v-row>

    <!-- Yeni Müşteri Dialog -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>Müşteri Ekle</v-card-title>
        <v-card-text>
          <CustomerForm @ekle="musteriEkle" @close="dialog=false"/>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Silme Onayı -->
    <v-dialog v-model="deleteDialog" max-width="400px">
      <v-card>
        <v-card-title class="headline">Silmek istediğinize emin misiniz?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" text @click="deleteDialog=false">Vazgeç</v-btn>
          <v-btn color="red" text @click="confirmDelete">Sil</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Bildirim -->
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000">
      {{ snackbar.text }}
    </v-snackbar>
  </v-container>
</template>

<script>
import CustomerForm from "./CustomerForm.vue";

export default {
  components: { CustomerForm },
  data() {
    return {
      search: "",
      selectedMusteri: null,
      dialog: false,
      deleteDialog: false,
      deleteTarget: null,
      snackbar: { show: false, text: "", color: "success" },
      headers: [
        { text: "Ad", value: "ad" },
        { text: "Soyad", value: "soyad" },
        { text: "Telefon", value: "telefon" },
        { text: "E-posta", value: "email" },
        { text: "Etiket", value: "etiket" },
        { text: "İşlemler", value: "islemler", sortable: false },
      ],
      musteriler: [
        {
          id: 1,
          ad: "Ahmet",
          soyad: "Yılmaz",
          telefon: "05001234567",
          email: "ahmet@test.com",
          etiket: "VIP",
          notlar: "VIP müşteri",
          satislar: [
            { id: 1, urun: "Altın Yüzük", tutar: 1200, tarih: "2025-08-01" },
            { id: 2, urun: "Kolye", tutar: 500, tarih: "2025-08-15" }
          ]
        },
        {
          id: 2,
          ad: "Ayşe",
          soyad: "Demir",
          telefon: "05007654321",
          email: "ayse@test.com",
          etiket: "Yeni",
          notlar: "Yeni müşteri",
          satislar: []
        }
      ],
      kpiCards: [
        { title: "Toplam Müşteri", value: 120, icon: "mdi-account-group" },
        { title: "Aktif Müşteri", value: 80, icon: "mdi-account-check" },
        { title: "VIP Müşteri", value: 15, icon: "mdi-crown" },
        { title: "Toplam Satış Hacmi", value: "₺ 350K", icon: "mdi-currency-try" }
      ]
    };
  },
  computed: {
    filteredMusteriler() {
      return this.musteriler.filter(m =>
          (m.ad + " " + m.soyad).toLowerCase().includes(this.search.toLowerCase())
      );
    }
  },
  methods: {
    selectMusteri(m) {
      this.selectedMusteri = m;
    },
    musteriEkle(yeniMusteri) {
      this.musteriler.push(yeniMusteri);
      this.dialog = false;
      this.showSnackbar("Müşteri başarıyla eklendi", "success");
    },
    onDelete(musteri) {
      this.deleteDialog = true;
      this.deleteTarget = musteri;
    },
    confirmDelete() {
      this.musteriler = this.musteriler.filter(m => m.id !== this.deleteTarget.id);
      if (this.selectedMusteri?.id === this.deleteTarget.id) {
        this.selectedMusteri = null;
      }
      this.showSnackbar("Müşteri silindi", "error");
      this.deleteDialog = false;
    },
    showSnackbar(text, color) {
      this.snackbar = { show: true, text, color };
    },
    getEtiketRenk(etiket) {
      switch (etiket) {
        case "VIP": return "purple";
        case "Yeni": return "blue";
        case "Aktif": return "green";
        default: return "grey";
      }
    }
  }
};
</script>
