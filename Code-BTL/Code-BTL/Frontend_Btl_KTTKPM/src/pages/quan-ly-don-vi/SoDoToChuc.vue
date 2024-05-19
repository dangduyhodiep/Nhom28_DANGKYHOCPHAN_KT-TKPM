<script setup>
/* Build in VueJs */
import { onBeforeMount, ref, watch, reactive, onMounted } from "vue";

/* Pinia Store */
import { useSettingStore } from "@/stores/extra/SettingStore.js";
import { useSoDoToChucStore } from "@/stores/quan-ly-don-vi/SoDoToChucStore.js";

/* Component */
import BlankComponent from "@/components/base/BlankComponent.vue";

/* Third Library */
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

let splitterModel = ref(25);
const router = useRouter();
const { t } = useI18n();
const donViStore = useSoDoToChucStore();
const storeSetting = useSettingStore();

var fab2 = ref(false);
var hideLabels = ref(false);

onBeforeMount(async () => {
  await donViStore.getInit();
});

onMounted(async () => {
  /* config href */
  storeSetting.routerHref = router.currentRoute._rawValue.href;
});

watch(
  () => donViStore.treeSelected,
  async (val, oldVal) => {
    if (val) {
      await donViStore.getFullInfoCompanySelected(val);
      console.log(donViStore.companySelectedViewData);
      donViStore.companyAddData = [];
      donViStore.isShowFormAddNew = false;
      donViStore.noDataSelectTree = false;
      await donViStore.getFullInfoCompanyParent(
        donViStore.companySelectedViewData.parentId
      );
    } else {
      await donViStore.getFullInfoCompanySelected(oldVal);
      /* make sure that tree select always have data even user uncheck that tree */
      donViStore.targetSelected = oldVal;
    }
  }
);
</script>
<template>
  <div>
    <q-splitter v-model="splitterModel" style="height: 100%">
      <template v-slot:before>
        <!-- <TreeStructureComponent isShowAdd="true"></TreeStructureComponent> -->
        <div class="q-pa-sm">
          <q-layout
            view="lhh LpR lff"
            container
            style="
              height: 90vh;
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
                v-model="donViStore.treeFilter"
                :placeholder="t('funcTreeInputStruct')"
              >
              </q-input>
            </div>

            <div class="q-pa-md" style="margin-top: 5vh">
              <q-tree
                v-if="donViStore.organizationalData?.length"
                class="full-height"
                full-height
                :filter="donViStore.treeFilter"
                :nodes="donViStore.organizationalData"
                node-key="_id"
                selected-color="primary"
                v-model:selected="donViStore.treeSelected"
                default-expand-all
              >
              </q-tree>

              <q-page-sticky position="bottom-right" :offset="[18, 18]">
                <q-btn
                  @click="donViStore.isShowFormAddNew = true"
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
        <!-- Have Data When user click in tree -->
        <div v-if="!donViStore.noDataSelectTree">
          <!-- View and Update Target -->
          <div v-if="!donViStore.isShowFormAddNew">
            <q-form
              @submit="
                donViStore.updateCompany(donViStore.companySelectedViewData)
              "
            >
              <div class="q-gutter-md q-pa-md">
                <div class="flex justify-between full-width q-py-md">
                  <div class="text-h5 q-px-md text-justify" style="width: 100%">
                    {{ donViStore.companyName }}
                  </div>
                </div>
                <q-input
                  :label="t('structLevelCompanyName')"
                  v-model="donViStore.companySelectedViewData.name"
                  outlined
                />

                <div v-if="donViStore.companyParentData.name">
                  <q-input
                    :label="t('structTreeParentTarget')"
                    v-model="donViStore.companyParentData.name"
                    filled
                    disable
                  />
                </div>

                <div class="row">
                  <div class="col q-mr-md">
                    <q-input
                      :label="t('structLevelTechName')"
                      v-model="donViStore.companySelectedViewData.techName"
                      filled
                      disable
                    />
                  </div>
                  <div class="col q-mr-md">
                    <q-input
                      :label="t('structLevelDateCreate')"
                      v-model="donViStore.companySelectedViewData.createdAt"
                      filled
                      disable
                    />
                  </div>

                  <div class="col">
                    <q-input
                      :label="t('structLevelDateUpdate')"
                      v-model="donViStore.companySelectedViewData.updatedAt"
                      filled
                      disable
                    />
                  </div>
                </div>

                <q-input
                  :label="t('structLevelDesc')"
                  v-model="donViStore.companySelectedViewData.description"
                  outlined
                  type="textarea"
                />
              </div>
              <div class="q-pa-md q-gutter-md flex justify-end">
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
                    donViStore.deleteCompany(donViStore.companySelectedViewData)
                  "
                />
              </div>
            </q-form>
          </div>

          <!-- Add Target -->
          <div v-else>
            <div class="q-gutter-md q-pa-md">
              <q-form
                @submit="
                  donViStore.postCreateCompany(donViStore.companyAddData)
                "
                ref="form"
              >
                <div class="text-h5 q-py-md text-justify">
                  {{ t("structTreeTitleAdd") }}:
                  <q-badge
                    color="primary"
                    class="text-h6 q-ml-md"
                    outline
                    :label="donViStore.companySelectedViewData.name"
                  />
                </div>

                <q-input
                  class="q-mb-sm"
                  :label="t('structLevelCompanyName')"
                  v-model="donViStore.companyAddData.name"
                  outlined
                  :rules="[(val) => !!val || 'Không được để rỗng']"
                />
                <q-input
                  class="q-mb-md"
                  :label="t('structLevelDesc')"
                  v-model="donViStore.companyAddData.description"
                  outlined
                  type="textarea"
                />

                <div class="q-pa-md q-gutter-md flex justify-end">
                  <q-btn
                    :label="t('funcAdd')"
                    class="q-px-lg q-py-sm bg_defaultColor"
                    type="submit"
                  />
                </div>
              </q-form>
            </div>
          </div>
        </div>

        <!-- No data user click -->
        <div v-else class="full-height" style="height: 95vh !important">
          <BlankComponent
            :dataContent="t('funcWarningSelectCompanyData')"
          ></BlankComponent>
        </div>
      </template>
    </q-splitter>
  </div>
</template>

<style scoped></style>
