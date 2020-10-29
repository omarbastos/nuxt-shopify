<template>
  <v-row>
    <v-btn fab left style="top: 50%" fixed icon @click="$router.back()">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <v-col cols="12" md="7" class="pa-0 ma-0">
      <v-img
        class="grey lighten-3"
        max-height="90vh"
        contain
        :src="mainImage"
      ></v-img>
    </v-col>
    <v-col cols="12" md="5" class="pa-0 pl-1 ma-0">
      <v-card
        height="40%"
        elevation="0"
        color="white"
        class="d-flex justify-center align-start flex-column"
      >
        <v-card-subtitle>{{ product.vendor }}</v-card-subtitle>
        <v-card-title class="font-weight-bold mt-0 pt-0 headline ralph-lauren"
          >{{ product.title }}
        </v-card-title>
      </v-card>
      <v-card
        :height="$vuetify.breakpoint.mdAndUp ? '60%' : 'auto'"
        elevation="0"
        color="grey lighten-3"
      >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn-toggle
            v-if="variants"
            v-model="colorSelected"
            background-color="transparent"
            borderless
            mandatory
          >
            <v-btn v-for="color in variants.colors" :key="color">
              <v-icon x-large :color="color">mdi-circle</v-icon>
            </v-btn>
          </v-btn-toggle>
          <v-spacer></v-spacer>
          <v-btn-toggle
            v-if="variants"
            v-model="sizeSelected"
            background-color="transparent"
            borderless
            mandatory
          >
            <v-btn
              v-for="size in variants.sizes"
              :key="size"
              class="rounded-full"
              color="white"
            >
              {{ size }}
            </v-btn>
          </v-btn-toggle>
          <v-spacer></v-spacer>
        </v-card-actions>
        <v-card-actions class="my-4">
          <v-spacer></v-spacer>
          <div
            v-if="product && product.variants"
            class="title font-weight-bold"
          >
            ${{ product.variants[0].price }}
          </div>
          <v-spacer></v-spacer>
          <v-btn x-large color="black" dark rounded @click="addToCart"
            >ADD TO CART
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
        <v-card-text>
          {{ product.description }}
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'Products',

  data() {
    return {
      product: {},
      mainImage: '',
      colorSelected: null,
      sizeSelected: null,
    }
  },
  computed: {
    variants() {
      if (this.product?.variants) {
        const singleArray = _.flatten(
          this.product?.variants?.map((item) => item.selectedOptions)
        )
        const filteredArray = _.uniqBy(singleArray, 'value')
        const groupArray = _.groupBy(filteredArray, 'name')
        return {
          colors: groupArray.Color.map((e) => e.value),
          sizes: groupArray.Size.map((e) => e.value),
        }
      } else {
        return null
      }
    },
  },
  async created() {
    try {
      this.$vuetify.theme.themes.light.background = '#ffffff'
      await this.$shopify.product
        .fetch(this.$route.params.id)
        .then((product) => {
          // Do something with the product
          this.product = product
          this.mainImage = product.images[0]
        })
    } catch (err) {
      this.$nuxt.error({ statusCode: 404, message: err.message })
    }
  },
  methods: {
    async addToCart() {
      const { id } = await this.$shopify.checkout.create()
      const lineItemsToAdd = [
        {
          quantity: 1,
          variantId: this.product.variants[0].id,
        },
      ]
      // Add an item to the checkout
      await this.$shopify.checkout
        .addLineItems(id, lineItemsToAdd)
        .then((checkout) => {
          // Do something with the updated checkout
          console.log(checkout.lineItems) // Array with one additional line item
        })
      await this.$shopify.checkout.fetch(id).then((checkout) => {
        window.location = checkout.webUrl
      })
    },
  },
}
</script>

<style scoped></style>
