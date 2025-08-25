<template>
  <v-container fluid>
    <v-row>
      <!-- Bildirim Ayarları -->
      <v-col cols="12" md="6">
        <v-card elevation="6">
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
                  color="primary"
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
        <v-card elevation="6">
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
                  color="primary"
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
        <v-card elevation="6">
          <v-card-title class="section-header">Veri Yedekleme</v-card-title>
          <v-divider></v-divider>

          <p class="text-caption mt-2 ml-3 text-grey">
            Son Yedekleme:
            <v-chip small color="amber lighten-4" text-color="black">
              {{ lastBackup || 'Henüz yapılmadı' }}
            </v-chip>
          </p>

          <v-card-text>
            <v-btn
                color="primary"
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
.section-header {
  font-size: 1.1rem;
  font-weight: 600;
  color: #FFD700; /* Altın uyumlu */
  padding: 12px 16px;
}
.text-grey {
  font-size: 0.8rem;
  color: #ccc !important;
}
</style>
