<template>
  <v-app>
    <!-- Üst AppBar -->
    <v-app-bar app color="indigo darken-3" dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title class="font-weight-bold">Jewelers Pro</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Yan Menü -->
    <v-navigation-drawer app color="indigo lighten-5">
      <v-list>
        <v-list-item link>
          <v-list-item-icon><v-icon color="indigo">mdi-view-dashboard</v-icon></v-list-item-icon>
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item>

        <v-list-item link>
          <v-list-item-icon><v-icon color="indigo">mdi-file-chart</v-icon></v-list-item-icon>
          <v-list-item-title>Raporlar</v-list-item-title>
        </v-list-item>

        <v-list-item link>
          <v-list-item-icon><v-icon color="indigo">mdi-cog</v-icon></v-list-item-icon>
          <v-list-item-title>Ayarlar</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- İçerik -->
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
