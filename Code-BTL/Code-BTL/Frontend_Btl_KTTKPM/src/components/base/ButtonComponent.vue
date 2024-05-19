<script setup>
const { labelCustom, iconCustom, eventCustom } = defineProps(['labelCustom', 'iconCustom', 'eventCustom']);
</script>

<template>
  <div>
    <q-btn outline color="green" :label=labelCustom :icon=iconCustom @click=eventCustom />
  </div>
</template>

<style lang="scss" scoped></style>
