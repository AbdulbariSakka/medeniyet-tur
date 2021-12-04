<template>
  <q-layout view="lHh Lpr lFf">
    <q-header bordered class="main-header">
      <q-toolbar>
        <q-img
          src="logo.jpeg"
          spinner-color="white"
          style="height: 40px; max-width: 40px; margin-left: 35px"
          class="rounded-borders"
        />
        <p class="p-title">Medeniyet Tur</p>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainLayout',
})
</script>

<style scoped>
.p-title{
  width: 90%;
  text-align: center;
  color: red;
  font-weight: 700;
  margin: 0;
}
.main-header{
  background-color: white !important;
}
</style>
