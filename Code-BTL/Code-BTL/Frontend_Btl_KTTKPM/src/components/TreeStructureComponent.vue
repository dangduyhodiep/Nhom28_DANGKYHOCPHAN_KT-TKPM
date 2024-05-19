<script setup>
import { useSoDoToChucStore } from "src/stores/quan-ly-don-vi/SoDoToChucStore";
import { useUtilStore } from "src/stores/dataStore";
import { onBeforeMount, watch } from "vue";

/* child component */
import ButtonComponent from "@/components/base/ButtonComponent.vue";

/* Third Lib */
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const dataStore = useUtilStore();
const {
  isShowCreateCompanyButton,
  isShowAdd,
  isShowBackToTop,
  isShowDirectButton,
} = defineProps([
  "isShowCreateCompanyButton",
  "isShowAdd",
  "isShowBackToTop",
  "isShowDirectButton",
]);

onBeforeMount(async () => {
  await dataStore.getInit();
});

watch(
  () => dataStore.treeSelected,
  (val) => {
    if (val) {
    }
  }
);
</script>

<template>
  <div>
    <div class="q-pa-sm" style="overflow-y: hidden; min-height: 93vh">
      <q-layout
        view="lhh LpR lff"
        container
        style="
          min-height: 91vh;
          flex-direction: column;
          justify-content: flex-start;
        "
        class="q-py-none flex column justify-between"
      >
        <div
          class="fixed z-max q-px-sm"
          style="width: 100%; opacity: 1; background-color: #f5f5f5; top: 0"
        >
          <q-input
            ref="filterRef"
            outlined
            clearable
            v-model="dataStore.treeFilter"
            :placeholder="t('funcTreeInputStruct')"
          >
          </q-input>
        </div>

        <div class="q-pa-md" style="margin-top: 5vh">
          <q-tree
            v-if="dataStore.organizationalData.length"
            class="full-height"
            full-height
            :filter="dataStore.treeFilter"
            :nodes="dataStore.organizationalData"
            node-key="_id"
            selected-color="primary"
            v-model:selected="dataStore.treeSelected"
            default-expand-all
          >
          </q-tree>

          <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-page-scroller
              position="bottom-right"
              :scroll-offset="150"
              :offset="[18, 18]"
              v-if="isShowBackToTop"
            >
              <q-btn fab icon="keyboard_arrow_up" class="bg_defaultColor" />
            </q-page-scroller>
            <q-btn
              @click="dataStore.isShowFormAddNewStructure = true"
              fab
              icon="add"
              color="green"
              v-if="isShowAdd"
            />
            <!-- <q-btn
              fab
              icon="near_me"
              class="bg_defaultColor"
              v-if="isShowDirectButton"
              to="/assign/time"
            /> -->

            <q-fab
              v-if="isShowDirectButton"
              fab
              icon="near_me"
              class="bg_defaultColor"
              direction="up"
            >
              <q-fab-action
                color="secondary"
                to="/assign/department"
                icon="account_circle"
              />
              <q-fab-action
                color="primary"
                to="/assign/time"
                icon="calendar_month"
              />
            </q-fab>
          </q-page-sticky>
        </div>
      </q-layout>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
