<template>
  <v-container fluid>
    <v-row>
      <!-- Bildirim Ayarları -->
      <v-col cols="12" md="6">
        <v-card elevation="8" class="same-height-card elegant-card">
          <v-card-title class="section-header">
            <v-icon left color="primary">mdi-bell-ring</v-icon>
            Bildirim Ayarları
          </v-card-title>
          <v-divider></v-divider>

          <v-card-text>
            <v-form ref="notificationSettingsForm">
              <v-row>
                <v-col cols="12" md="6">
                  <v-switch v-model="settings.emailNotifications" inset color="primary">
                    <template v-slot:label>
                      <v-icon small class="mr-2" color="primary">mdi-email</v-icon>
                      E-Posta Bildirimleri
                    </template>
                  </v-switch>
                </v-col>

                <v-col cols="12" md="6">
                  <v-switch v-model="settings.smsNotifications" inset color="primary">
                    <template v-slot:label>
                      <v-icon small class="mr-2" color="primary">mdi-message-text</v-icon>
                      SMS Bildirimleri
                    </template>
                  </v-switch>
                </v-col>
              </v-row>

              <small class="ml-2 text-muted">⚡ Önemli duyurular için önerilir</small>
            </v-form>
          </v-card-text>

          <!-- Ortak buton yapısı -->
          <v-card-actions class="button-area">
            <v-btn
                color="primary"
                dark
                rounded
                elevation="3"
                class="action-btn"
                @click="saveSettings"
            >
              <v-icon left>mdi-content-save</v-icon>
              Kaydet
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <!-- Veri Yedekleme -->
      <v-col cols="12" md="6">
        <v-card elevation="8" class="same-height-card elegant-card">
          <v-card-title class="section-header">
            <v-icon left color="primary">mdi-database</v-icon>
            Veri Yedekleme
          </v-card-title>
          <v-divider></v-divider>

          <v-card-text>
            <p class="text-caption mt-2 text-muted">
              Son Yedekleme:
              <v-chip small color="dark-blue" text-color="black">
                {{ lastBackup || 'Henüz yapılmadı' }}
              </v-chip>
            </p>
          </v-card-text>

          <!-- Ortak buton yapısı -->
          <v-card-actions class="button-area">
            <v-btn
                color="primary"
                dark
                rounded
                elevation="3"
                class="action-btn"
                @click="backupData"
            >
              <v-icon left>mdi-database-export</v-icon>
              Veri Yedekle
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Snackbar -->
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000" elevation="6">
      <v-icon left v-if="snackbar.color === 'success'">mdi-check-circle</v-icon>
      <v-icon left v-else>mdi-alert-circle</v-icon>
      {{ snackbar.message }}
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      settings: {
        emailNotifications: true,
        smsNotifications: false,
        twoFactorAuth: true,
      },
      lastBackup: null,
      snackbar: {
        show: false,
        message: "",
        color: "success",
      },
    };
  },
  methods: {
    showSnackbar(msg, color = "success") {
      this.snackbar.message = msg;
      this.snackbar.color = color;
      this.snackbar.show = true;
    },
    saveSettings() {
      this.showSnackbar("🔒 Ayarlar başarıyla kaydedildi.");
    },
    saveSecuritySettings() {
      this.showSnackbar("🔑 Güvenlik ayarları başarıyla kaydedildi.");
    },
    backupData() {
      this.lastBackup = new Date().toLocaleString();
      this.showSnackbar("💾 Veri başarıyla yedeklendi.");
    },
  },
};
</script>

<style scoped>
.section-header {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1a237e;
  display: flex;
  align-items: center;
}

.text-muted {
  font-size: 0.85rem;
  color: #757575;
}

.same-height-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* İçerik ve butonları dikeyde ayırır */
  transition: transform 0.2s ease, box-shadow 0.3s ease;
}

.elegant-card {
  border-radius: 16px;
}

.button-area {
  display: flex;
  justify-content: flex-end;
  padding: 16px;
}

.action-btn {
  min-width: 140px; /* Tüm butonlar aynı genişlikte */
}
</style>
