<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',
});
</script>

<style>
.v-application .v-main {
  background-color: #f5f5f5 !important; /* Açık gri */
  min-height: 100vh;
}
</style>
