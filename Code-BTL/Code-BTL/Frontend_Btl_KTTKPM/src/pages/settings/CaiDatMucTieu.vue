<script setup>
/* Vue build in */
import { onMounted } from "vue";

/* Pinia Store */
import { useCaiDatMucTieuStore } from "@/stores/settings/CaiDatMucTieuStore";

/* Third Lib */
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const storeCaiDatMucTieu = useCaiDatMucTieuStore();

onMounted(async () => {
  await storeCaiDatMucTieu.getLimitValue();
});
</script>

<template>
  <div class="container">
    <q-form
      @submit="
        !storeCaiDatMucTieu.isHaveLimitValue
          ? storeCaiDatMucTieu.postCreateLimitValue(
              +storeCaiDatMucTieu.createLimitValue
            )
          : storeCaiDatMucTieu.postUpdateLimitValue(
              storeCaiDatMucTieu.limitValue
            )
      "
      class="q-gutter-md"
    >
      <div v-if="!storeCaiDatMucTieu.isHaveLimitValue">
        <div class="text-h5">Vui lòng thiết lập cận trên</div>
        <q-input
          v-model="storeCaiDatMucTieu.createLimitValue"
          type="number"
          label="Cận trên"
          outlined
        />
      </div>
      <div v-else>
        <div class="text-h5">Cận trên</div>
        <q-input
          v-model="storeCaiDatMucTieu.limitValue"
          type="number"
          label="Cận trên"
          outlined
        />
      </div>

      <div class="flex center">
        <q-btn type="submit" color="primary" :label="t('funcSave')" />
      </div>
    </q-form>
  </div>
</template>

<style lang="scss" scoped>
.container {
  height: 93vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.container * {
  margin: 0.5em 0;
}
</style>
