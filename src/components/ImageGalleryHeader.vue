<template>
  <v-toolbar flat>
    <v-responsive>
      <v-text-field v-model="filter.description" @change="onSearch()" hide-details label="Search"></v-text-field>
    </v-responsive>

    <v-spacer></v-spacer>

    <v-select
      v-model="filter.format"
      @change="onSearch()"
      :items="formats"
      clearable
      mx-2
      hide-details
      flat
      label="Formats"
      solo
    ></v-select>

    <v-select
      v-model="filter.dimensions"
      @change="onSearch()"
      :items="dimensionsList"
      clearable
      mx-2
      hide-details
      flat
      label="Sizes"
      solo
    ></v-select>

    <v-btn icon @click="onSearch()">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-spacer></v-spacer>

    <v-btn-toggle v-model="viewMode">
      <v-btn icon>
        <v-icon>mdi-view-grid</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-view-list</v-icon>
      </v-btn>
    </v-btn-toggle>
    <v-btn class="mx-2" fab dark small color="indigo" @click="$emit('plus-button-click')">
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  props: ["formats", "dimensionsList"],
  data() {
    return {
      viewMode: 0,
      filter: {},
    };
  },
  methods: {
    onSearch() {
      const { description, dimensions, format } = this.filter;
      this.$emit("search", { description, dimensions, format });
    },
    reset() {
      this.filter = {};
    }
  },
  watch: {
    viewMode(value) {
      this.$emit('change-list-view-mode', value === 1);
    }
  }
};
</script>

<style>
</style>