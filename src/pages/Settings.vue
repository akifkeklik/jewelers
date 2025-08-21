<template>
  <v-container fluid>
    <v-row>
      <!-- Genel Ayarlar -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title class="text-h6">Genel Ayarlar</v-card-title>
          <v-divider></v-divider>

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

            <v-switch
                v-model="settings.darkMode"
                label="Karanlık Mod"
                inset
            ></v-switch>
          </v-form>
        </v-card>
      </v-col>

      <!-- Fiyatlandırma Ayarları -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title class="text-h6">Fiyatlandırma Ayarları</v-card-title>
          <v-divider></v-divider>

          <v-form ref="pricingSettingsForm">
            <v-text-field
                v-model="settings.goldPrice"
                label="Altın Fiyatı (TL)"
                outlined
                type="number"
            ></v-text-field>

            <v-text-field
                v-model="settings.dollarPrice"
                label="Dolar Fiyatı (TL)"
                outlined
                type="number"
            ></v-text-field>

            <v-text-field
                v-model="settings.euroPrice"
                label="Euro Fiyatı (TL)"
                outlined
                type="number"
            ></v-text-field>
          </v-form>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <!-- Kullanıcı Ayarları -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title class="text-h6">Kullanıcı Ayarları</v-card-title>
          <v-divider></v-divider>

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

            <v-btn color="primary" @click="changePassword">Şifreyi Değiştir</v-btn>
          </v-form>
        </v-card>
      </v-col>

      <!-- Bildirim Ayarları -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title class="text-h6">Bildirim Ayarları</v-card-title>
          <v-divider></v-divider>

          <v-form ref="notificationSettingsForm">
            <v-switch
                v-model="settings.emailNotifications"
                label="E-Posta Bildirimleri"
                inset
            ></v-switch>

            <v-switch
                v-model="settings.smsNotifications"
                label="SMS Bildirimleri"
                inset
            ></v-switch>

            <v-btn color="primary" @click="saveSettings">Ayarları Kaydet</v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>

    <!-- Güvenlik Ayarları -->
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="text-h6">Güvenlik Ayarları</v-card-title>
          <v-divider></v-divider>

          <v-form ref="securitySettingsForm">
            <v-switch
                v-model="settings.twoFactorAuth"
                label="İki Adımlı Doğrulama"
                inset
            ></v-switch>

            <v-btn color="primary" @click="saveSecuritySettings">Güvenlik Ayarlarını Kaydet</v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>

    <!-- Veri Yedekleme -->
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="text-h6">Veri Yedekleme</v-card-title>
          <v-divider></v-divider>

          <v-btn color="error" @click="backupData">Veri Yedekle</v-btn>
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
    };
  },
  methods: {
    changePassword() {
      if (this.settings.password !== this.settings.confirmPassword) {
        alert('Şifreler uyuşmuyor.');
        return;
      }
      // Şifre değişikliği işlemleri
      alert('Şifre başarıyla değiştirildi.');
    },
    saveSettings() {
      // Ayarları kaydetme işlemleri
      alert('Ayarlar başarıyla kaydedildi.');
    },
    saveSecuritySettings() {
      // Güvenlik ayarlarını kaydetme işlemleri
      alert('Güvenlik ayarları başarıyla kaydedildi.');
    },
    backupData() {
      // Veri yedekleme işlemleri
      alert('Veri başarıyla yedeklendi.');
    },
  },
};
</script>

<style scoped>
.v-card {
  margin-bottom: 20px;
}

.v-btn {
  margin-top: 20px;
}
</style>
