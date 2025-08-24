<template>
  <v-container fluid>
    <v-row>
      <!-- Bildirim Ayarları -->
      <v-col cols="12" md="6">
        <v-card class="app-card" elevation="6" rounded="xl" height="100%">
          <v-card-title class="section-header">Bildirim Ayarları</v-card-title>
          <v-divider></v-divider>

          <v-card-text>
            <v-form ref="notificationSettingsForm">
              <v-switch v-model="settings.emailNotifications" inset>
                <template v-slot:label>
                  <v-icon small class="mr-2">mdi-email</v-icon>
                  E-Posta Bildirimleri
                </template>
              </v-switch>
              <small class="ml-8 text-grey">Önemli duyurular için önerilir</small>

              <v-switch v-model="settings.smsNotifications" inset>
                <template v-slot:label>
                  <v-icon small class="mr-2">mdi-message-text</v-icon>
                  SMS Bildirimleri
                </template>
              </v-switch>

              <v-btn
                  color="indigo darken-3"
                  class="white--text mt-5"
                  elevation="2"
                  rounded
                  @click="saveSettings"
              >
                <v-icon left>mdi-content-save</v-icon>
                Ayarları Kaydet
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Güvenlik Ayarları -->
      <v-col cols="12" md="6">
        <v-card class="app-card" elevation="6" rounded="xl" height="100%">
          <v-card-title class="section-header">Güvenlik Ayarları</v-card-title>
          <v-divider></v-divider>

          <v-card-text>
            <v-form ref="securitySettingsForm">
              <v-alert type="info" outlined dense class="mb-3">
                İki adımlı doğrulama hesabınızın güvenliğini artırır.
              </v-alert>

              <v-switch
                  v-model="settings.twoFactorAuth"
                  label="İki Adımlı Doğrulama"
                  inset
              ></v-switch>

              <v-btn
                  color="indigo darken-3"
                  class="white--text mt-3"
                  elevation="2"
                  rounded
                  @click="saveSecuritySettings"
              >
                <v-icon left>mdi-shield-check</v-icon>
                Güvenlik Ayarlarını Kaydet
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <!-- Veri Yedekleme -->
      <v-col cols="12" md="6">
        <v-card class="app-card" elevation="6" rounded="xl" height="100%">
          <v-card-title class="section-header">Veri Yedekleme</v-card-title>
          <v-divider></v-divider>

          <p class="text-caption mt-2 ml-3 text-grey">
            Son Yedekleme:
            <v-chip small color="indigo lighten-5">
              {{ lastBackup || 'Henüz yapılmadı' }}
            </v-chip>
          </p>
          <v-card-text>
            <v-btn
                color="error"
                dark
                rounded
                elevation="2"
                @click="backupData"
                class="mt-5"
            >
              <v-icon left>mdi-database-export</v-icon>
              Veri Yedekle
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Snackbar -->
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000">
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
      this.showSnackbar("Ayarlar başarıyla kaydedildi.");
    },
    saveSecuritySettings() {
      this.showSnackbar("Güvenlik ayarları başarıyla kaydedildi.");
    },
    backupData() {
      this.lastBackup = new Date().toLocaleString();
      this.showSnackbar("Veri başarıyla yedeklendi.");
    },
  },
};
</script>

<style scoped>
* {
  font-family: "Inter", "Roboto", sans-serif;
}

.v-container {
  background: #f5f6fa;
  min-height: 100vh;
  padding: 24px;
}

/* Kartlar */
.app-card {
  border-radius: 20px;
  background: #f0f0f0;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
  transition: 0.3s;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.app-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12);
}

/* Başlık */
.section-header {
  font-size: 1.2rem;
  font-weight: 700;
  color: #2a2a2a;
  padding: 12px 18px;
  border-bottom: 2px solid #ddd;
  background: #e5e5e5;
  border-radius: 20px 20px 0 0;
}

/* Switch & Buton */
.v-input--switch .v-label {
  color: #444 !important;
  font-weight: 500;
}
.v-btn {
  text-transform: none;
  font-weight: 600;
  border-radius: 12px;
  padding: 8px 20px;
}
.v-btn:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

/* Küçük metinler */
.text-grey {
  font-size: 0.8rem;
  color: #555 !important;
}
</style>
