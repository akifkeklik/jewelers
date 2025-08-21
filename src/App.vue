<template>
  <v-app>
    <!-- Üst Bar (App Bar) -->
    <v-app-bar app color="#FFD700" dark flat>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="d-flex align-center">
        <v-icon color="black" left>mdi-diamond-stone</v-icon>
        <span class="ml-2 font-weight-bold">KALE Kuyumculuk</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <!-- Sol Menü (Side Bar) -->
    <v-navigation-drawer v-model="drawer" app color="#FFD700" class="side-bar">
      <v-list dense nav>
        <v-list-item-group v-model="selected" color="black">
          <v-list-item to="/dashboard" link>
            <v-list-item-icon>
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Dashboard</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item to="/sales" link>
            <v-list-item-icon>
              <v-icon>mdi-cash-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Satışlar</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item to="/products" link>
            <v-list-item-icon>
              <v-icon>mdi-package-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Ürünler</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item to="/customers" link>
            <v-list-item-icon>
              <v-icon>mdi-account-group</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Müşteriler</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item to="/reports" link>
            <v-list-item-icon>
              <v-icon>mdi-chart-line</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Raporlar</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item to="/settings" link>
            <v-list-item-icon>
              <v-icon>mdi-cog</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Ayarlar</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <!-- Sayfa İçeriği -->
    <v-main>
      <v-container fluid class="pa-6 bg-color fill-height">
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
      selected: 0
    };
  }
};
</script>

<style >
.v-application {
  font-family: "Segoe UI", Roboto, Arial, sans-serif;
}

.v-app-bar {
  background-color: #5D6E84 !important; /* Altın sarısı renk */
  color: #FFFFFF !important; /* Yazılar siyah olacak */
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1); /* Hafif gölge */
}

.v-navigation-drawer {
  background-color: #5D6E84 !important; /* Altın sarısı renk */
  color: #FFFFFF !important; /* Yazılar siyah */
  box-shadow: 4px 0px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
}

.side-bar .v-list-item {
  transition: background-color 0.2s ease;
}

.side-bar .v-list-item:hover {
  background-color: rgba(0, 0, 0, 0.1); /* Hoverda siyah bir geçiş */
}

.side-bar .v-list-item-title {
  color: #333333 !important; /* Siyah yazılar */
}

.side-bar .v-list-item-icon .v-icon {
  color: #333333 !important; /* Siyah ikonlar */
}
.bg-color{
  background-color: #DBD4FF ;
  color:black ;
  border-color: #f5f5f5 ;
}
</style>
