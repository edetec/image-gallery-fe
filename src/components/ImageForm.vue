<template>
  <v-card>
    <v-card-title>Image</v-card-title>
    <v-card-text>
      <div class="d-flex justify-center" v-if="model.file_path">
        <v-img
          v-if="model.thumbnail_path"
          :src="getImageUrl(model.thumbnail_path)"
          height="200px"
          max-width="200"
        />
      </div>
      <div class="d-flex justify-space-between" v-if="model.file_path">
        <div>{{model.format}}</div>
        <div>{{model.dimensions}}</div>
        <v-btn :href="getImageUrl(model.file_path)" target="_blank" icon download>
          <v-icon>mdi-download</v-icon>
        </v-btn>
      </div>
      <v-divider />
      <v-file-input v-model="file" accept="image/*" label="Select an image" />
      <v-textarea label="Description" v-model="model.description" />
    </v-card-text>

    <v-card-actions class="d-flex flex-row-reverse">
      <v-btn text @click="$emit('cancel')">Cancel</v-btn>
      <v-btn color="primary" text @click="save()">Save</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { getImageUrl, saveImage } from "../services/image";

export default {
  props: {
    model: {},
  },
  data() {
    return {
      file: undefined,
    };
  },
  methods: {
    getImageUrl,
    reset() {
      this.file = undefined;
    },
    save() {
      saveImage(this.file, this.model.description, this.model.id)
        .then(() => {
          this.$noty.success("Image save successful!");
          this.$emit("save-successful");
        })
        .catch(({ request, response }) => {
          if (request.status == 400) {
            const msg = response.data.error;
            this.$noty.error(msg);
          } else {
            this.$noty.error("Something is wrong.");
          }
        });
    },
  },
};
</script>

<style>
</style>