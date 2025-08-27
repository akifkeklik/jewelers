    <template>
      <v-container fluid>
        <h2 class="mb-4">Müşteriler</h2>

        <!-- KPI Kartları -->
        <v-row class="mb-4">
          <v-col cols="12" md="3" v-for="card in kpiCards" :key="card.title">
            <v-card class="pa-5 text-center" elevation="10">
              <v-icon large class="mb-3" color="primary">{{ card.icon }}</v-icon>
              <h3 class="kpi-card-value">{{ card.value }}</h3>
              <p class="grey--text kpi-card-title">{{ card.title }}</p>
            </v-card>
          </v-col>
        </v-row>

        <!-- Müşteri Listesi -->
        <v-row>
          <v-col cols="12">
            <v-card class="pa-3">
              <v-text-field
                  v-model="search"
                  placeholder="Müşteri Ara (Ad / Soyad / Telefon / E-posta)"
                  prepend-inner-icon="mdi-magnify"
                  outlined
                  dense
                  hide-details
                  clearable
                  class="search-bar mb-5"
              ></v-text-field>

              <v-data-table
                  :headers="headers"
                  :items="filteredMusteriler"
                  dense
                  :items-per-page="5"
                  @click:row="selectMusteri"
                  class="data-table"
              >
                <template v-slot:[`item.etiket`]="{ item }">
                  <v-chip small :color="getEtiketRenk(item.etiket)" dark>
                    {{ item.etiket }}
                  </v-chip>
                </template>

                <template v-slot:[`item.islemler`]="{ item }">
                  <div class="action-buttons">
                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            icon
                            small
                            color="primary"
                            class="action-btn"
                            @click.stop="selectMusteri(item)"
                            v-bind="attrs"
                            v-on="on"
                        >
                          <v-icon>mdi-eye</v-icon>
                        </v-btn>
                      </template>
                      <span>Detay Görüntüle</span>
                    </v-tooltip>

                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            icon
                            small
                            color="error"
                            class="action-btn"
                            @click.stop="onDelete(item)"
                            v-bind="attrs"
                            v-on="on"
                        >
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                      </template>
                      <span>Müşteriyi Sil</span>
                    </v-tooltip>
                  </div>
                </template>
              </v-data-table>

              <!-- Yeni Müşteri Butonu -->
              <v-btn color="primary" block class="mt-4" @click="openNew">
                <v-icon left>mdi-account-plus</v-icon> Yeni Müşteri
              </v-btn>
            </v-card>
          </v-col>
        </v-row>

        <!-- Detay Dialog -->
        <v-dialog v-model="detailDialog" max-width="700px">
          <v-card>
            <v-card-title>
              {{ selectedMusteri?.ad }} {{ selectedMusteri?.soyad }}
              <v-spacer></v-spacer>
              <v-btn icon @click="detailDialog=false"><v-icon>mdi-close</v-icon></v-btn>
            </v-card-title>

            <v-card-text v-if="selectedMusteri">
              <p><v-icon small>mdi-phone</v-icon> {{ selectedMusteri.telefon }}</p>
              <p><v-icon small>mdi-email</v-icon> {{ selectedMusteri.email }}</p>
              <v-chip small :color="getEtiketRenk(selectedMusteri.etiket)" dark>
                {{ selectedMusteri.etiket }}
              </v-chip>

              <v-divider class="my-3"></v-divider>

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

              <h4>Notlar</h4>
              <v-textarea
                  v-model="selectedMusteri.notlar"
                  label="Müşteri Notları"
                  outlined
                  rows="3"
                  class="note-textarea"
              ></v-textarea>
            </v-card-text>

            <!-- Sağ alt butonlar -->
            <v-card-actions class="d-flex justify-end">
              <v-btn color="primary" @click="editMusteri(selectedMusteri)">
                <v-icon left>mdi-pencil</v-icon> Düzenle
              </v-btn>
              <v-btn color="error" @click="onDelete(selectedMusteri)">
                <v-icon left>mdi-delete</v-icon> Sil
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Yeni / Düzenleme Müşteri Dialog -->
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>{{ editMode ? 'Müşteri Düzenle' : 'Müşteri Ekle' }}</v-card-title>
            <v-card-text>
              <CustomerForm
                  ref="customerForm"
                  :musteriProp="editTarget"
                  @ekle="musteriKaydet"
                  @close="dialog=false"
              />
            </v-card-text>
          </v-card>
        </v-dialog>

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
          detailDialog: false,
          dialog: false,
          deleteDialog: false,
          deleteTarget: null,
          snackbar: { show: false, text: "", color: "success" },
          editMode: false,
          editTarget: null,
          headers: [
            { text: "Ad", value: "ad"},
            { text: "Soyad", value: "soyad" },
            { text: "Telefon", value: "telefon" },
            { text: "E-posta", value: "email" },
            { text: "Etiket", value: "etiket" },
            { text: "İşlemler", value: "islemler", sortable: false, align: 'center', width: '120px' },
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
              (m.ad + " " + m.soyad + " " + m.telefon + " " + m.email)
                  .toLowerCase()
                  .includes(this.search.toLowerCase())
          );
        }
      },
      methods: {
        selectMusteri(m) {
          this.selectedMusteri = m;
          this.detailDialog = true;
        },
        openNew() {
          this.editMode = false;
          this.editTarget = null;
          this.dialog = true;
        },
        musteriKaydet(musteri) {
          if (this.editMode) {
            const index = this.musteriler.findIndex(m => m.id === musteri.id);
            if (index !== -1) {
              this.musteriler.splice(index, 1, musteri);
              if (this.selectedMusteri && this.selectedMusteri.id === musteri.id) {
                this.selectedMusteri = musteri;
              }
              this.showSnackbar("Müşteri başarıyla güncellendi", "info");
            }
          } else {
            this.musteriler.push(musteri);
            this.showSnackbar("Müşteri başarıyla eklendi", "success");
          }
          this.dialog = false;
        },
        editMusteri(m) {
          this.editMode = true;
          this.editTarget = { ...m };
          this.dialog = true;
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
          this.dialog = false;
          this.detailDialog = false;
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

    <style scoped>
    .v-card {
      background-color: #f5f6fa !important;
    }

    h2 {
      font-size: 30px;
      font-weight: 600;
    }

    .kpi-card-value {
      font-size: 24px;
      font-weight: bold;
    }

    .kpi-card-title {
      font-size: 16px;
    }

    .search-bar {
      background-color: #f1f3f4 !important;
      border-radius: 12px !important;
      font-size: 18px !important;
      padding: 10px !important;
    }

    .search-bar input {
      font-size: 18px !important;
      color: #222;
    }

    .data-table {
      font-size: 18px;
    }

    .note-textarea .v-textarea__control .v-textarea__slot {
      font-size: 16px;
    }

    .v-btn {
      font-size: 16px;
      border-radius: 12px;
    }

    .delete-title {
      font-size: 18px;
      white-space: nowrap;
      text-align: center;
      width: 100%;
    }

    .delete-text {
      font-size: 16px;
    }

    /* İşlem butonları için özel stiller */
    .action-buttons {
      display: flex;
      gap: 8px;
      justify-content: center;
    }

    .action-btn {
      transition: all 0.3s ease;
      transform: scale(1);
    }

    .action-btn:hover {
      transform: scale(1.2);
    }

    .action-btn:first-child:hover {
      background-color: rgba(0, 123, 255, 0.1) !important;
    }

    .action-btn:last-child:hover {
      background-color: rgba(220, 53, 69, 0.1) !important;
    }
    </style>
