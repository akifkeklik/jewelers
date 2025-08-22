<template>
  <v-container fluid>
    <v-row>
      <!-- Genel Ayarlar -->
      <v-col cols="12" md="6">
        <v-card class="app-card" elevation="4">
          <v-card-title class="section-header">Genel Ayarlar</v-card-title>
          <v-divider></v-divider>

          <v-card-text>
            <v-form ref="generalSettingsForm">
              <v-text-field
                  v-model="settings.companyName"
                  label="Sistem Adı"
                  outlined
              ></v-text-field>

              <v-file-input
                  v-model="settings.logo"
                  label="Logo Yükle"
                  outlined
                  accept="image/*"
              ></v-file-input>

            </v-form>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Fiyatlandırma Ayarları -->
      <v-col cols="12" md="6">
        <v-card class="app-card" elevation="4">
          <v-card-title class="section-header">Fiyatlandırma Ayarları</v-card-title>
          <v-divider></v-divider>

          <v-card-text>
            <v-form ref="pricingSettingsForm">
              <v-row>
                <v-col cols="4">
                  <v-text-field
                      v-model="settings.goldPrice"
                      label="Altın (₺)"
                      outlined
                      type="number"
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                      v-model="settings.dollarPrice"
                      label="Dolar (₺)"
                      outlined
                      type="number"
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                      v-model="settings.euroPrice"
                      label="Euro (₺)"
                      outlined
                      type="number"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <!-- Kullanıcı Ayarları -->
      <v-col cols="12" md="6">
        <v-card class="app-card" elevation="4">
          <v-card-title class="section-header">Kullanıcı Ayarları</v-card-title>
          <v-divider></v-divider>

          <v-card-text>
            <v-form ref="userSettingsForm">
              <v-text-field
                  v-model="settings.adminEmail"
                  label="Admin E-Posta"
                  outlined
              ></v-text-field>

              <v-text-field
                  v-model="settings.password"
                  label="Şifre"
                  outlined
                  type="password"
              ></v-text-field>

              <v-text-field
                  v-model="settings.confirmPassword"
                  label="Şifreyi Tekrar Girin"
                  outlined
                  type="password"
              ></v-text-field>

              <v-btn color="indigo darken-3" class="white--text mt-3" @click="changePassword">
                Şifreyi Değiştir
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Bildirim Ayarları -->
      <v-col cols="12" md="6">
        <v-card class="app-card" elevation="4">
          <v-card-title class="section-header">Bildirim Ayarları</v-card-title>
          <v-divider></v-divider>

          <v-card-text>
            <v-form ref="notificationSettingsForm">
              <v-switch
                  v-model="settings.emailNotifications"
                  inset
              >
                <template v-slot:label>
                  <v-icon small class="mr-2">mdi-email</v-icon>
                  E-Posta Bildirimleri
                </template>
              </v-switch>
              <small class="ml-8 text-grey">Önemli duyurular için önerilir</small>

              <v-switch
                  v-model="settings.smsNotifications"
                  inset
              >
                <template v-slot:label>
                  <v-icon small class="mr-2">mdi-message-text</v-icon>
                  SMS Bildirimleri
                </template>
              </v-switch>

              <v-btn color="indigo darken-3" class="white--text mt-3" @click="saveSettings">
                Ayarları Kaydet
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Güvenlik Ayarları -->
    <v-row>
      <v-col cols="12">
        <v-card class="app-card" elevation="4">
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

              <v-btn color="indigo darken-3" class="white--text mt-3" @click="saveSecuritySettings">
                Güvenlik Ayarlarını Kaydet
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Veri Yedekleme -->
    <v-row>
      <v-col cols="12">
        <v-card class="app-card" elevation="4">
          <v-card-title class="section-header">Veri Yedekleme</v-card-title>
          <v-divider></v-divider>

          <v-card-text>
            <v-btn color="error" dark @click="backupData">
              Veri Yedekle
            </v-btn>
            <p class="text-caption mt-2 text-grey">
              Son Yedekleme: {{ lastBackup || 'Henüz yapılmadı' }}
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      settings: {
        companyName: 'KALE Kuyumculuk',
        logo: null,
        darkMode: false,
        goldPrice: 900,
        dollarPrice: 40.85,
        euroPrice: 47.50,
        adminEmail: 'admin@kale.com',
        password: '',
        confirmPassword: '',
        emailNotifications: true,
        smsNotifications: false,
        twoFactorAuth: true,
      },
      lastBackup: null,
    };
  },
  methods: {
    changePassword() {
      if (this.settings.password !== this.settings.confirmPassword) {
        alert('Şifreler uyuşmuyor.');
        return;
      }
      alert('Şifre başarıyla değiştirildi.');
    },
    saveSettings() {
      alert('Ayarlar başarıyla kaydedildi.');
    },
    saveSecuritySettings() {
      alert('Güvenlik ayarları başarıyla kaydedildi.');
    },
    backupData() {
      this.lastBackup = new Date().toLocaleString();
      alert('Veri başarıyla yedeklendi.');
    },
  },
};
</script>

<style scoped>
.app-card {
  border-radius: 16px;
  background: #fdfdfd;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.08);
}

.section-header {
  background: linear-gradient(90deg, #2C3E50, #34495E);
  color: #FFD700;
  font-weight: bold;
}

.v-btn {
  text-transform: none;
  font-weight: 600;
}
</style>
