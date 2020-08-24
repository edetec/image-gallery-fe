<template>
  <v-container>
    <v-dialog v-model="showModal" max-width="800px">
      <image-form
        ref="imageForm"
        :model="selectedImage"
        v-on:cancel="showModal = false"
        v-on:save-successful="resetView()"
      />
    </v-dialog>
    <v-card>
      <image-gallery-header
        ref="header"
        :dimensionsList="dimensionsList"
        :formats="formats"
        v-on:search="fetchImages($event)"
        v-on:plus-button-click="openModal({})"
        v-on:change-list-view-mode="listViewMode=$event"
      />
      <v-divider />

      <v-container fluid v-if="!listViewMode">
        <v-card class="d-flex flex-wrap" flat tile>
          <v-card
            v-for="image in images"
            :key="image.id"
            width="200"
            class="ma-2"
            @click="openModal(image)"
          >
            <v-img
              :src="getImageUrl(image.thumbnail_path)"
              height="200px"
              aspect-ratio="1"
              class="grey lighten-2 white--text align-end clicable"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                </v-row>
              </template>
            </v-img>
            <v-card-subtitle class="truncate">{{image.description}}</v-card-subtitle>
          </v-card>
        </v-card>
      </v-container>
      <v-container v-if="!!listViewMode">
        <v-card class="pa-2" tile v-for="img in images" :key="img.id">
          <v-row no-gutters>
            <v-col cols="2">
              <v-img
                :src="getImageUrl(img.thumbnail_path)"
                width="200"
                aspect-ratio="1"
                class="grey lighten-2 white--text align-end clicable"
                @click="openModal(img)"
              >
                <template v-slot:placeholder>
                  <v-row class="fill-height ma-0" align="center" justify="center">
                    <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
            </v-col>
            <v-col cols="8">
              <div class="pa-2">
                <p class="font-weight-thin">{{img.description}}</p>
                <p class="font-weight-light">{{img.format}}</p>
                <p class="font-weight-regular">{{img.dimensions}}</p>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import {
  getAllImages,
  getImageUrl,
  getAllImageDimensions,
} from "../services/image";
import ImageGalleryHeader from "./ImageGalleryHeader";
import ImageForm from "./ImageForm";

export default {
  components: {
    ImageGalleryHeader,
    ImageForm,
  },
  data() {
    return {
      images: [],
      selectedImage: {},
      dimensionsList: [],
      formats: ["GIF", "JPG", "JPEG", "PNG"],
      showModal: false,
      listViewMode: false,
    };
  },
  methods: {
    getImageUrl,
    fetchImages(filters) {
      getAllImages(filters)
        .then(({ data }) => (this.images = data))
        .catch((err) => console.error(err));
    },
    fetchDimensionsList() {
      getAllImageDimensions()
        .then(({ data }) => (this.dimensionsList = data))
        .catch((err) => console.error(err));
    },
    resetView() {
      this.showModal = false;
      this.fetchImages();
      this.fetchDimensionsList();
      this.$refs.header.reset();
    },
    openModal(image) {
      const form = this.$refs.imageForm
      form && form.reset();
      this.selectedImage = image;
      this.showModal = true;
    },
  },
  created() {
    this.fetchImages();
    this.fetchDimensionsList();
  },
};
</script>

<style>
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.clicable {
  cursor: pointer;
}
</style>