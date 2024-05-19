<script setup>
import noDataPic from "/material/no-data.svg";
const { dataContent } = defineProps(["dataContent"])

</script>

<template>
  <div class="q-gutter-md flex flex-center full-height flex column">
    <q-img
      :src="noDataPic"
      style="width: 250px; fill: #f8f8f8"
      spinner-color="primary"
      spinner-size="82px"
      class="q-my-lg"
    />
    <span class="text-h5 text-center q-my-lg q-py-lg"
      >{{ dataContent }}</span
    >
  </div>
</template>

<style lang="scss" scoped></style>
