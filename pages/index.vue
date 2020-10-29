<template>
  <v-container v-if="!loading">
    <v-btn fab right style="top: 50%" fixed icon @click="goToNextCollection">
      <v-icon>mdi-arrow-right</v-icon>
      {{ nextCollection.title }}
    </v-btn>
    <v-btn class="mb-16" fab bottom left fixed icon @click="goToNextCollection">
      <v-icon>mdi-facebook</v-icon>
    </v-btn>
    <v-btn class="mb-8" fab bottom left fixed icon @click="goToNextCollection">
      <v-icon>mdi-twitter</v-icon>
    </v-btn>
    <v-btn fab bottom left fixed icon @click="goToNextCollection">
      <v-icon>mdi-instagram</v-icon>
    </v-btn>
    <v-row
      v-if="currentCollection && currentCollection.image"
      justify="center"
      align="center"
    >
      <v-col cols="12" md="5">
        <transition
          mode="out-in"
          enter-active-class="animated animate__fadeInLeft"
          leave-active-class="animated animate__fadeOutRight"
        >
          <img :key="currentCollection.id" :src="currentCollection.image.src" />
        </transition>
      </v-col>
      <v-col cols="12" md="7">
        <v-row>
          <v-col cols="12" md="6" class="d-flex justify-center align-center">
            <transition
              mode="out-in"
              enter-active-class="animated animate__fadeInUp"
              leave-active-class="animated animate__fadeOutDown"
            >
              <v-card
                :key="currentCollection.title"
                elevation="0"
                color="transparent"
              >
                <v-card-subtitle>
                  <v-icon>mdi-play</v-icon>
                  {{ currentCollection.title }}
                </v-card-subtitle>
                <v-card-text
                  class="headline black--text"
                  v-html="currentCollection.descriptionHtml"
                ></v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn width="60%" tile color="black" x-large dark
                    >EXPLORE
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </transition>
          </v-col>

          <v-col v-if="$vuetify.breakpoint.mdAndUp" cols="6">
            <transition
              mode="out-in"
              enter-active-class="animated animate__fadeInLeft"
              leave-active-class="animated animate__fadeOutRight"
            >
              <v-img
                :key="currentCollection.id"
                contain
                :src="nextProductImage"
              ></v-img>
            </transition>
          </v-col>
          <v-col :style="$vuetify.breakpoint.mdAndUp ? 'margin-top: -10%' : ''">
            <div class="d-flex">
              <v-hover
                v-for="(item, index) in currentCollection.products"
                :key="index"
                v-slot="{ hover }"
                style="width: 25%"
              >
                <v-card elevation="0" :class="`${colors[index]} `">
                  <transition
                    mode="out-in"
                    enter-active-class="animated animate__fadeInLeft"
                    leave-active-class="animated animate__fadeOutRight"
                  >
                    <v-img
                      :key="item.id"
                      contain
                      :class="`up-on-hover`"
                      :src="item.images[1]"
                    >
                    </v-img>
                  </transition>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-expand-transition>
                      <v-btn
                        v-if="hover"
                        class="d-flex justify-center align-center"
                        elevation="0"
                        color="black"
                        dark
                        :to="{ name: 'products-id', params: { id: item.id } }"
                      >
                        ${{ item.variants[0].price }}
                        <v-divider class="ml-2 mr-4" vertical inset></v-divider>
                        <v-icon x-small>mdi-cart-outline</v-icon>
                      </v-btn>
                    </v-expand-transition>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-hover>
              <div
                style="width: 25%; z-index: 99999"
                elevation="0"
                :class="`${colors[3]} d-flex justify-center align-center flex-column`"
              >
                <v-icon>mdi-arrow-right-thin-circle-outline</v-icon>
                View All
              </div>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      show: true,
      loading: false,
      colors: [
        'yellow lighten-2',
        'amber lighten-2',
        'yellow lighten-3',
        'yellow lighten-1',
      ],
      products: [],
      nextCollection: {},
      currentCollection: {},
    }
  },
  computed: {
    currentProductImage() {
      return this.currentCollection?.products[0]?.images[0]
    },
    nextProductImage() {
      return this.currentCollection?.products[1]?.images[0]
    },
  },
  async created() {
    try {
      this.$vuetify.theme.themes.light.background = '#FFF9C4'
      const collections = await this.$shopify.collection.fetchAllWithProducts()
      this.currentCollection = collections[0]
      if (collections[1]) {
        this.nextCollection = collections[1]
      }
    } catch (err) {
      this.$nuxt.error({ statusCode: 404, message: err.message })
    }
  },
  methods: {
    goToNextCollection() {
      this.loading = true

      const currentCollection = this.currentCollection
      switch (currentCollection.title) {
        case 'WOMEN':
          this.$vuetify.theme.themes.light.background = '#BBDEFB'
          break

        case 'MEN':
          this.$vuetify.theme.themes.light.background = '#FFF9C4'
          break
        default:
          this.$vuetify.theme.themes.light.background = '#ff00ff'
          break
      }

      this.currentCollection = this.nextCollection
      this.nextCollection = currentCollection
      this.loading = false
    },
    /*    toggleBg() {
      this.$vuetify.theme.themes.light.background = '#4caf50'
    }, */
  },
}
</script>

<style>
.up-on-hover {
  transition: 0.3s;
}

.up-on-hover:hover {
  transform: translate(0, -10px);
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
