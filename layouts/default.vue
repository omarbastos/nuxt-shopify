<template>
  <v-app
    dark
    :style="{ background: $vuetify.theme.themes['light'].background }"
  >
    <v-app-bar elevation="0" color="transparent">
      <v-toolbar-title class="ralph-lauren">RALPH LAUREN</v-toolbar-title>
      <template v-if="$vuetify.breakpoint.mdAndUp">
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-btn v-for="(item, index) in items" :key="index" text
          >{{ item.title }}
        </v-btn>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-icon>fa fa-shopping-cart</v-icon>
        <v-spacer></v-spacer>
        <v-icon>fa fa-user</v-icon>
        <v-spacer></v-spacer>
        <v-icon>fa fa-search</v-icon>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-icon>fa fa-globe</v-icon>
        <v-btn text>ENG</v-btn>
      </template>
      <template v-else>
        <v-spacer></v-spacer>
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>mdi-menu</v-icon>
            </v-btn>
          </template>
          <v-list color="background">
            <v-list-item v-for="(button, index) in items" :key="index">
              <v-list-item-title>{{ button.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          title: 'RUNWAY',
          to: '/',
        },
        {
          title: 'SALE',
          to: '/',
        },
        {
          title: 'BRAND',
          to: '/',
        },
        {
          title: 'CUSTOMIZE',
          to: '/',
        },
        {
          title: 'BABY',
          to: '/',
        },
        {
          title: 'home',
          to: '/',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=PT+Serif&display=swap');

.ralph-lauren {
  font-family: 'PT Serif', serif !important;
}
</style>
