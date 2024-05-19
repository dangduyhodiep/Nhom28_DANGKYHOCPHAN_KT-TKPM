<script setup>
/* Build in VueJs */
import { ref, onMounted, watch, reactive } from "vue";

/* Pinia Store */
import { useSettingStore } from "@/stores/extra/SettingStore.js";
import { useCapToChucStore } from "@/stores/quan-ly-don-vi/CapToChucStore.js";

/* Component */
import BlankComponent from "src/components/base/BlankComponent.vue";

/* Third Library */
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const router = useRouter();
const { t } = useI18n();
const storeSetting = useSettingStore();
const capToChucStore = useCapToChucStore();

let splitterModel = ref(25);
const dateDataView = reactive({
  createDate: "",
  updateDate: "",
});

onMounted(async () => {
  /* config href */
  storeSetting.routerHref = router.currentRoute._rawValue.href;
  await capToChucStore.getInit();
});

watch(
  () => capToChucStore.treeSelected,
  async (val) => {
    await capToChucStore.getCapToChucById(val);
    capToChucStore.isShowFormAddNewStructure = false;
  }
);
</script>

<template>
  <div>
    <q-splitter v-model="splitterModel" style="height: 100%">
      <template v-slot:before>
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
                v-model="capToChucStore.treeFilter"
                :placeholder="t('funcTreeInputStruct')"
              >
              </q-input>
            </div>

            <div class="q-pa-md" style="margin-top: 5vh">
              <q-tree
                v-if="capToChucStore.organizationalData.length"
                class="full-height"
                full-height
                :filter="capToChucStore.treeFilter"
                :nodes="capToChucStore.organizationalData"
                node-key="_id"
                selected-color="primary"
                v-model:selected="capToChucStore.treeSelected"
                default-expand-all
              >
              </q-tree>

              <q-page-sticky position="bottom-right" :offset="[18, 18]">
                <q-btn
                  @click="capToChucStore.isShowFormAddNewStructure = true"
                  fab
                  icon="add"
                  color="green"
                />
              </q-page-sticky>
            </div>
          </q-layout>
        </div>
      </template>

      <template v-slot:after>
        <div
          v-if="
            capToChucStore.singleCompanyLevelData?._id &&
            !capToChucStore.isShowFormAddNewStructure
          "
        >
          <div class="q-gutter-md q-pa-md">
            <q-form
              @submit="
                capToChucStore.updateCompanyStructure(
                  capToChucStore.singleCompanyLevelData
                )
              "
              ref="form"
            >
              <div class="text-h5 q-py-md text-justify">
                {{ t('structLevelTitle') }}
              </div>

              <q-input
                class="q-mb-sm"
                :label="t('structLevelCompanyName')"
                v-model="capToChucStore.singleCompanyLevelData.name"
                outlined
                :rules="[(val) => !!val || t('funcInputWarningFillData')]"
              />

              <q-input
                class="q-mb-sm"
                :label="t('structLevelDesc')"
                v-model="capToChucStore.singleCompanyLevelData.description"
                outlined
                :rules="[(val) => !!val || t('funcInputWarningFillData')]"
              />

              <div class="row">
                <div class="col q-mr-md">
                  <q-input
                    :label="t('structLevelTechName')"
                    v-model="capToChucStore.singleCompanyLevelData.techName"
                    filled
                    disable
                  />
                </div>
                <div class="col q-mr-md">
                  <q-input
                    :label="t('structLevelDateCreate')"
                    v-model="capToChucStore.singleCompanyLevelData.createdAt"
                    filled
                    disable
                  />
                </div>

                <div class="col">
                  <q-input
                    :label="t('structLevelDateUpdate')"
                    v-model="capToChucStore.singleCompanyLevelData.updatedAt"
                    filled
                    disable
                  />
                </div>
              </div>

              <div class="q-pa-md q-gutter-md flex justify-end q-mt-md">
                <q-btn
                  :label="t('funcSave')"
                  class="q-px-lg q-py-sm bg_defaultColor"
                  type="submit"
                />
                <q-btn
                  :label="t('funcRemove')"
                  class="q-px-lg q-py-sm"
                  color="red-5"
                  @click="
                    capToChucStore.deleteCompanyStructure(
                      capToChucStore.treeSelected
                    )
                  "
                />
              </div>
            </q-form>
          </div>
        </div>

        <div
          v-else-if="
            capToChucStore.isLargestStructure &&
            capToChucStore.isShowFormAddNewStructure
          "
        >
          <div class="q-gutter-md q-pa-md">
            <q-form
              @submit="
                capToChucStore.createCompanyStructure(
                  capToChucStore.createCompanyData
                )
              "
              ref="form"
            >
              <div class="text-h5 q-py-md text-justify">
                {{ t('structLevelTitleAddInit') }}
              </div>

              <q-input
                class="q-mb-sm"
                :label="t('structLevelCompanyName')"
                v-model="capToChucStore.createCompanyData.name"
                outlined
                :rules="[(val) => !!val || t('funcInputWarningFillData')]"
              />

              <q-input
                class="q-mb-sm"
                :label="t('structLevelDesc')"
                v-model="capToChucStore.createCompanyData.description"
                outlined
                :rules="[(val) => !!val || t('funcInputWarningFillData')]"
              />

              <div class="q-pa-md q-gutter-md flex flex-center q-mt-md">
                <q-btn
                  :label="t('funcAdd')"
                  class="q-px-lg q-py-sm"
                  color="green"
                  type="submit"
                />
              </div>
            </q-form>
          </div>
        </div>

        <div
          v-else-if="
            capToChucStore.singleCompanyLevelData?._id &&
            !capToChucStore.isLargestStructure &&
            capToChucStore.isShowFormAddNewStructure
          "
        >
          <div class="q-gutter-md q-pa-md">
            <q-form
              @submit="
                capToChucStore.createCompanyStructure(
                  capToChucStore.createCompanyData
                )
              "
              ref="form"
            >
              <div class="text-h5 q-py-md text-justify">
                <div class="text-h5 q-py-md text-justify">
                  {{ t('structLevelTitleAdd') }}:
                  <q-badge
                    color="primary"
                    class="text-h6 q-ml-md"
                    outline
                    :label="capToChucStore.singleCompanyLevelData.name"
                  />
                </div>
              </div>

              <q-input
                class="q-mb-sm"
                :label="t('structLevelCompanyName')"
                v-model="capToChucStore.createCompanyData.name"
                outlined
                :rules="[(val) => !!val || t('funcInputWarningFillData')]"
              />

              <q-input
                class="q-mb-sm"
                :label="t('structLevelDesc')"
                v-model="capToChucStore.createCompanyData.description"
                outlined
                :rules="[(val) => !!val || t('funcInputWarningFillData')]"
              />

              <div class="q-pa-md q-gutter-md flex flex-center q-mt-md">
                <q-btn
                  :label="t('funcAdd')"
                  class="q-px-lg q-py-sm"
                  color="green"
                  type="submit"
                />
              </div>
            </q-form>
          </div>
        </div>

        <div v-else class="full-height" style="height: 95vh !important">
          <BlankComponent :dataContent="t('funcWarningNoData')"></BlankComponent>
        </div>
      </template>
    </q-splitter>
  </div>
</template>

<style lang="scss" scoped></style>
