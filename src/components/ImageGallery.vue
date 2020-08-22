<template>
  <v-row>
    <v-col cols="12" sm="10" offset-sm="1">
      <v-card>
        <v-container fluid>
          <v-row>
            <v-col v-for="image in images" :key="image.id" cols="2">
              <v-card>
                <v-img
                  :src="`/${image.thumbnail_path}`"
                  aspect-ratio="1"
                  class="grey lighten-2"
                >
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-row>
                  </template>
                  <v-card-title v-text="image.description"></v-card-title>
                </v-img>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { getAllImages } from "../services/image";

export default {
  data() {
    return {
      images: [],
    };
  },
  methods: {
    fetchImages() {
      getAllImages()
        .then(({ data }) => {
          this.images = data;
        })
        .catch((err) => console.error(err));
    },
  },
  created() {
    this.fetchImages();
  },
};
</script>

<style>
</style>