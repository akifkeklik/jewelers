<template>
  <v-app>
    <!-- Üst Bar -->
    <v-app-bar app flat class="app-bar">
      <v-app-bar-nav-icon @click="drawer = !drawer" class="menu-btn"></v-app-bar-nav-icon>

      <v-toolbar-title>
        <v-icon left class="diamond-icon">mdi-diamond-stone</v-icon>
        <span class="ml-2 font-weight-bold">KALE KUYUMCULUK TİC. LTD. ŞTİ.</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- Gece Modu -->
      <v-btn icon class="dark-toggle" @click="toggleDarkMode">
        <v-icon>{{ darkMode ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Sidebar -->
    <v-navigation-drawer
        v-model="drawer"
        :mini-variant.sync="mini"
        app
        class="modern-sidebar"
    >
      <v-list dense nav>
        <!-- Menü Aç/Kapa Butonu -->
        <v-list-item @click="mini = !mini" class="menu-toggle">
          <v-list-item-icon>
            <v-icon>mdi-menu</v-icon>
          </v-list-item-icon>
          <v-list-item-title v-if="!mini">Menü</v-list-item-title>
        </v-list-item>

        <v-divider></v-divider>

        <!-- Menü Linkleri -->
        <v-list-item
            v-for="item in items"
            :key="item.title"
            :to="item.path"
            link
            class="sidebar-link"
        >
          <v-list-item-icon><v-icon>{{ item.icon }}</v-icon></v-list-item-icon>
          <v-list-item-title v-if="!mini">{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- İçerik -->
    <v-main>
      <v-container fluid class="pa-6 fill-height" :class="[darkMode ? 'dark-bg' : 'light-bg']">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      drawer: true,
      mini: false,
      darkMode: true, // 🌙 Default olarak gece modu aktif!
      items: [
        { title: "Ana Sayfa", icon: "mdi-home", path: "/dashboard" },
        { title: "Değerler", icon: "mdi-cash", path: "/prices" },
        { title: "Satışlar", icon: "mdi-cart", path: "/sales" },
        { title: "Ürünler", icon: "mdi-cube", path: "/products" },
        { title: "Müşteriler", icon: "mdi-account-group", path: "/customers" },
        { title: "Raporlar", icon: "mdi-chart-line", path: "/reports" },
        { title: "Ayarlar", icon: "mdi-cog", path: "/settings" },
        { title: "Hesap Makinesi", icon: "mdi-calculator", path: "/calculator" }
      ]
    };
  },
  methods: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
    },
  }
};
</script>

<style>
.v-application {
  font-family: "Segoe UI", Roboto, Arial, sans-serif;
}

/* === APP BAR MODERN === */
.app-bar {
  background: linear-gradient(90deg, #141e30, #243b55) !important;
  color: #FFD700 !important;
}
.diamond-icon {
  color: #FFD700 !important;
  font-size: 28px;
}
.menu-btn {
  color: #FFD700 !important;
}
.dark-toggle {
  color: #FFD700 !important;
  transition: 0.3s ease;
}
.dark-toggle:hover {
  transform: rotate(15deg);
  color: #fff176 !important;
}

/* === SIDEBAR MODERN === */
.modern-sidebar {
  background: linear-gradient(90deg, #141e30, #243b55) !important;
  color: #FFD700 !important;
}
.modern-sidebar .v-list-item,
.modern-sidebar .v-icon {
  color: #FFD700 !important;
}
.sidebar-link {
  transition: 0.3s ease;
  border-radius: 8px;
  color: #FFD700 !important;
}
.sidebar-link:hover {
  background: linear-gradient(90deg, rgba(255,215,0,0.2), transparent);
  box-shadow: inset 2px 0 0 #FFD700;
}

/* === SAYFA BACKGROUND === */
.light-bg {
  background: linear-gradient(135deg, #e6f2f8, #f0faff) !important; /* Pastel buz mavisi */
  color: #222 !important;
}
.dark-bg {
  background: linear-gradient(135deg, #141e30, #0f2027) !important;
  color: #f5f5f5 !important;
}

/* === GLOBAL KART STİLİ === */
.v-card {
  border-radius: 20px !important; /* tüm kart köşeleri yuvarlatıldı */
  overflow: hidden;               /* içerde taşma olmasın */
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08) !important;
  transition: 0.3s;
  display: flex;
  flex-direction: column;
  background: #fdfdfd !important; /* soft beyaz arka plan */
}
.v-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12) !important;
}
</style>
