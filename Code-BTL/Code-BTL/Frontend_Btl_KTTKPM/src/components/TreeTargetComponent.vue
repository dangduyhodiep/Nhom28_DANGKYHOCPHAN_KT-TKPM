<script setup>
import { useUtilStore } from "src/stores/dataStore";
import { onBeforeMount, watch, onMounted } from "vue";

/* child component */
import ButtonComponent from "@/components/base/ButtonComponent.vue";

const dataStore = useUtilStore();
const {
  isStrictMode,
  isSaveButton,
  filterTargetTree,
  dataTargetTree,
} = defineProps([
  "isStrictMode",
  "isSaveButton",
  "filterTargetTree",
  "dataTargetTree",
]);

onBeforeMount(async () => {
  await dataStore.getInit();
  dataStore.targetDataTree = dataStore.buildTreeTarget(dataStore.targetData);
});

watch(
  () => dataStore.targetSelected,
  async (val) => {
    try {
      await dataStore.getFullInforTargetSelected();
      dataStore.isParentTarget = false;

      /* declare variable for form create */
      const {
        unit,
        descriptionMethodCal,
        frequencyMeasure,
        measureSourceId,
        cal,
        calDescriptionId,
      } = dataStore.targetSelectedView;

      dataStore.objTargetCreate = {
        unit,
        descriptionMethodCal,
        frequencyMeasure,
        measureSourceId,
        cal,
        calDescriptionId,
      };
    } catch (err) {
      dataStore.objTargetCreate = [];
      dataStore.isParentTarget = true;
    }

    /* reset data when user sudden change another tab */
    dataStore.isMoreThanTwoItems = false;
    dataStore.arrTargetKpiByTime = [];
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
            v-model="dataStore.targetFilter"
            placeholder="Tìm học phần..."
          >
          </q-input>
        </div>

        <div class="q-pa-md" style="margin-top: 5vh">
          <q-tree
            v-if="dataStore.targetDataTree.length"
            class="full-height"
            full-height
            :filter="dataStore.targetFilter"
            :nodes="dataStore.targetDataTree"
            node-key="_id"
            selected-color="primary"
            v-model:selected="dataStore.targetSelected"
            v-model:ticked="dataStore.tickedTree"
            :tick-strategy="isStrictMode ? 'strict' : 'none'"
            :checkable="isStrictMode ? true : false"
            default-expand-all
          >
          </q-tree>

          <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-page-scroller
              position="bottom-right"
              :scroll-offset="-100"
              :offset="[100, 18]"
              v-if="isSaveButton"
            >
              <q-btn
                class="flex q-py-sm"
                color="primary"
                icon="save"
                label="Lưu"
                style="min-width: 100px"
              />
            </q-page-scroller>

            <q-page-scroller
              position="bottom-right"
              :scroll-offset="150"
              :offset="[18, 18]"
            >
              <q-btn fab icon="keyboard_arrow_up" class="bg_defaultColor" />
            </q-page-scroller>
          </q-page-sticky>
        </div>
      </q-layout>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
