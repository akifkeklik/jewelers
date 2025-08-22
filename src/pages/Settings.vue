<template>
  <v-container fluid>
    <v-row>
      <!-- Kullanıcı Ayarları -->
      <v-col cols="12" md="6">
        <v-card class="app-card" elevation="6" rounded="xl" height="100%">
          <v-card-title class="section-header">Kullanıcı Ayarları</v-card-title>
          <v-divider></v-divider>

          <v-card-text>
            <v-form ref="userSettingsForm">
              <v-text-field
                  v-model="settings.adminEmail"
                  label="Admin E-Posta"
                  dense
                  outlined
                  class="mb-3"
              ></v-text-field>

              <v-text-field
                  v-model="settings.password"
                  label="Şifre"
                  outlined
                  dense
                  type="password"
                  :rules="[v => v.length >= 6 || 'Şifre en az 6 karakter olmalı']"
                  class="mb-3"
              ></v-text-field>

              <v-text-field
                  v-model="settings.confirmPassword"
                  label="Şifreyi Tekrar Girin"
                  outlined
                  dense
                  type="password"
                  class="mb-3"
              ></v-text-field>

              <v-btn
                  color="indigo darken-3"
                  class="white--text mt-3"
                  elevation="2"
                  rounded
                  @click="changePassword"
              >
                <v-icon left>mdi-lock-reset</v-icon>
                Şifreyi Değiştir
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>

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
                  <v-icon small class="mr-2 ">mdi-message-text</v-icon>
                  SMS Bildirimleri
                </template>
              </v-switch>
<br><br><br>
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
    </v-row>

    <v-row class="mt-4">
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

      <!-- Veri Yedekleme -->
      <v-col cols="12" md="6">
        <v-card class="app-card" elevation="6" rounded="xl" height="100%">
          <v-card-title class="section-header">Veri Yedekleme</v-card-title>
          <v-divider></v-divider>

          <p class="text-caption mt-2  ml-3 text-grey">
            Son Yedekleme:
            <v-chip small color="indigo lighten-5">
              {{ lastBackup || 'Henüz yapılmadı' }}
            </v-chip>
          </p>
          <v-card-text>
            <br><br><br>
            <v-btn color="error" dark rounded elevation="2" @click="backupData" class="mt-5">
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
        adminEmail: 'admin@kale.com',
        password: '',
        confirmPassword: '',
        emailNotifications: true,
        smsNotifications: false,
        twoFactorAuth: true,
      },
      lastBackup: null,
      snackbar: {
        show: false,
        message: '',
        color: 'success',
      },
    };
  },
  methods: {
    showSnackbar(msg, color = 'success') {
      this.snackbar.message = msg;
      this.snackbar.color = color;
      this.snackbar.show = true;
    },
    changePassword() {
      if (this.settings.password !== this.settings.confirmPassword) {
        this.showSnackbar('Şifreler uyuşmuyor.', 'error');
        return;
      }
      this.showSnackbar('Şifre başarıyla değiştirildi.');
    },
    saveSettings() {
      this.showSnackbar('Ayarlar başarıyla kaydedildi.');
    },
    saveSecuritySettings() {
      this.showSnackbar('Güvenlik ayarları başarıyla kaydedildi.');
    },
    backupData() {
      this.lastBackup = new Date().toLocaleString();
      this.showSnackbar('Veri başarıyla yedeklendi.');
    },
  },
};
</script>

<style scoped>
.app-card {
  border-radius: 16px;
  background: #fdfdfd;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
}

.section-header {
  background: linear-gradient(90deg, #1e3c72, #2a5298);
  color: #fff;
  font-weight: bold;
  padding: 10px 16px;
  border-radius: 12px 12px 0 0;
}

.v-btn {
  text-transform: none;
  font-weight: 600;
  letter-spacing: 0.3px;
}
</style>
