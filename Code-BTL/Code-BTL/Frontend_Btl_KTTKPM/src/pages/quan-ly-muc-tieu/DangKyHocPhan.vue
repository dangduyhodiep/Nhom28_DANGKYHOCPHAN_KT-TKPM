<script setup>
/* Build in VueJs */
import { onBeforeMount, onMounted, ref, watch } from "vue";

/* Pinia Store */
import { useTargetDetailStore } from "@/stores/quan-ly-muc-tieu/DieuChinhMucTieu";
import { useUtilStore } from "@/stores/dataStore";
import { useSettingStore } from "@/stores/extra/SettingStore.js";

/* Component */
import BlankComponent from "src/components/base/BlankComponent.vue";
import PageNotFound from "@/pages/ErrorNotFound.vue";

/* Third Library */
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const router = useRouter();
const { t } = useI18n();

const storeUtil = useUtilStore();
const storeSetting = useSettingStore();

let splitterModel = ref(25);
const targetDetailStore = useTargetDetailStore();
var fab2 = ref(false);
var hideLabels = ref(false);
const noData = ref(false);

onMounted(async () => {
  /* config href */
  let arr = router.currentRoute._rawValue.href.split("/");

  storeSetting.routerHref =
    arr.length === 3
      ? router.currentRoute._rawValue.href
      : `/${arr[1]}/${arr[2]}`;

  await storeUtil.getAllTargetData();
  await storeUtil.getAllFormula();
  await storeUtil.getAllFrequency();
  await storeUtil.getAllTargetType();

  /* Assign Variable */
  targetDetailStore.frequencyData = storeUtil.frequencyData;
  targetDetailStore.formulaData = storeUtil.formulaData;
  targetDetailStore.targetTypeData = storeUtil.targetTypeData;

  if (router.currentRoute._value.params.id) {
    await storeUtil.getOneTargetById(router.currentRoute._value.params.id);

    targetDetailStore.oneTargetData = storeUtil.oneTargetData;

    /* handle situation that the url id not correct will appear blank project */
    if (targetDetailStore.oneTargetData._id) {
      targetDetailStore.isShowFormAddNewTarget = false;
      targetDetailStore.noDataSelectTree = false;
      targetDetailStore.targetSelected = targetDetailStore.oneTargetData._id;
    } else {
      targetDetailStore.isShowFormAddNewTarget = false;
      targetDetailStore.noDataSelectTree = true;
    }
  }
});

watch(
  () => targetDetailStore.targetSelected,
  async (val, oldVal) => {
    router.replace(`/target/list/${val}`);

    if (val) {
      await storeUtil.getOneTargetById(val);
      targetDetailStore.oneTargetData = storeUtil.oneTargetData;

      targetDetailStore.isShowFormAddNewTarget = false;
      targetDetailStore.noDataSelectTree = false;
    } else {
      await storeUtil.getOneTargetById(oldVal);
      targetDetailStore.oneTargetData = storeUtil.oneTargetData;

      /* make sure that tree select always have data even user uncheck that tree */
      targetDetailStore.targetSelected = oldVal;
    }
  }
);
</script>
<template>
  <q-splitter v-model="splitterModel" style="height: 100%">
    <template v-slot:before>
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
              v-model="targetDetailStore.targetFilter"
              :placeholder="t('funcTreeInputTarget')"
            >
            </q-input>
          </div>

          <div class="q-pa-md" style="margin-top: 5vh">
            <q-tree
              v-if="storeUtil.targetDataCourse.length"
              class="full-height"
              full-height
              :filter="targetDetailStore.targetFilter"
              :nodes="storeUtil.targetDataCourse"
              node-key="id"
              selected-color="primary"
              tick-strategy="leaf"
              v-model:selected="targetDetailStore.targetSelected"
              v-model:ticked="storeUtil.targetDataCourseTickedData"
              default-expand-all
            >
            </q-tree>

            <q-page-sticky position="bottom-right" :offset="[30, 100]">
              <q-btn
                @click="targetDetailStore.isShowFormAddNewTarget = true"
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
      <div v-if="!targetDetailStore.noDataSelectTree">
        <!-- View and Update Target -->
        <div v-if="!targetDetailStore.isShowFormAddNewTarget">
          <q-form
            @submit="
              targetDetailStore.clickUpdateTarget(
                targetDetailStore.oneTargetData
              )
            "
            class="q-gutter-md"
          >
            <div>
              <div class="q-gutter-md q-pa-md">
                <div class="flex justify-between full-width q-py-md">
                  <div class="text-h4 q-px-md text-justify" style="width: 70%">
                    {{ t("adjustTargetTitle") }}
                  </div>
                </div>
                <q-input
                  :label="t('adjustTargetInputTargetName')"
                  v-model="targetDetailStore.oneTargetData.name"
                  outlined
                  class="q-pb-sm"
                  :rules="[(val) => !!val || t('funcInputWarningFillData')]"
                  :disable="targetDetailStore.oneTargetData.isCorner"
                />
                <q-input
                  :label="t('adjustTargetInputTargetParent')"
                  v-model="targetDetailStore.oneTargetData.parentName"
                  outlined
                  class="q-pb-sm"
                  disable
                />
                <div class="row">
                  <div class="col q-mr-md">
                    <q-select
                      :label="t('adjustTargetInputTargetType')"
                      :options="targetDetailStore.targetTypeData"
                      option-label="name"
                      option-value="_id"
                      use-input
                      v-model="targetDetailStore.oneTargetData.targetType"
                      outlined
                      class="q-pb-sm"
                      :rules="[(val) => !!val || t('funcInputWarningFillData')]"
                      :disable="targetDetailStore.oneTargetData.isCorner"
                    >
                      <template #option="scope">
                        <q-item v-bind="scope.itemProps">
                          <q-item-section>
                            <q-item-label>{{ scope.opt.name }}</q-item-label>
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>
                  </div>

                  <div class="col q-mr-md">
                    <q-select
                      :label="t('adjustTargetInputFormula')"
                      :options="targetDetailStore.formulaData"
                      option-label="name"
                      option-value="_id"
                      use-input
                      v-model="targetDetailStore.oneTargetData.formula"
                      outlined
                      class="q-pb-sm"
                      :rules="[(val) => !!val || t('funcInputWarningFillData')]"
                      :disable="targetDetailStore.oneTargetData.isCorner"
                    >
                      <template #option="scope">
                        <q-item v-bind="scope.itemProps">
                          <q-item-section>
                            <q-item-label>{{ scope.opt.name }}</q-item-label>
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>
                  </div>

                  <div class="col">
                    <q-select
                      :label="t('adjustTargetInputFrequency')"
                      :options="targetDetailStore.frequencyData"
                      option-label="name"
                      option-value="_id"
                      use-input
                      v-model="targetDetailStore.oneTargetData.frequencyMeasure"
                      outlined
                      class="q-pb-sm"
                      :rules="[(val) => !!val || t('funcInputWarningFillData')]"
                      :disable="targetDetailStore.oneTargetData.isCorner"
                    >
                      <template #option="scope">
                        <q-item v-bind="scope.itemProps">
                          <q-item-section>
                            <q-item-label>{{ scope.opt.name }}</q-item-label>
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>
                  </div>
                </div>
                <div class="row">
                  <div class="col q-mr-md">
                    <q-input
                      :label="t('adjustTargetInputDefaultValue')"
                      v-model="targetDetailStore.oneTargetData.defaultValue"
                      outlined
                      class="q-pb-sm"
                      :rules="[(val) => !!val || t('funcInputWarningFillData')]"
                      :disable="targetDetailStore.oneTargetData.isCorner"
                    />
                  </div>
                  <div class="col q-mr-md">
                    <q-input
                      :label="t('adjustTargetInputMinValue')"
                      v-model="targetDetailStore.oneTargetData.minValue"
                      outlined
                      class="q-pb-sm"
                      :rules="[(val) => !!val || t('funcInputWarningFillData')]"
                      :disable="targetDetailStore.oneTargetData.isCorner"
                    />
                  </div>
                  <div class="col">
                    <q-input
                      :label="t('adjustTargetInputImportance')"
                      v-model="targetDetailStore.oneTargetData.importanceLevel"
                      outlined
                      class="q-pb-sm"
                      :rules="[
                        (val) => !!val || t('funcInputWarningFillData'),
                        (val) =>
                          (val >= 0 && val <= 5) ||
                          'Mức độ quan trọng chỉ từ 0 đến 5',
                      ]"
                      :disable="targetDetailStore.oneTargetData.isCorner"
                    />
                  </div>
                </div>
                <q-input
                  :label="t('adjustTargetInputDesc')"
                  v-model="
                    targetDetailStore.oneTargetData.methodAndCalDescription
                  "
                  outlined
                  class="q-pb-sm"
                  :rules="[(val) => !!val || t('funcInputWarningFillData')]"
                  :disable="targetDetailStore.oneTargetData.isCorner"
                />

                <div class="row">
                  <div class="col q-mr-md">
                    <q-input
                      :label="t('adjustTargetInputTechName')"
                      v-model="targetDetailStore.oneTargetData.techName"
                      filled
                      disable
                    />
                  </div>
                  <div class="col q-mr-md">
                    <q-input
                      :label="t('adjustTargetInputUnit')"
                      v-model="targetDetailStore.oneTargetData.unit"
                      outlined
                      class="q-pb-sm"
                      :rules="[(val) => !!val || t('funcInputWarningFillData')]"
                      :disable="targetDetailStore.oneTargetData.isCorner"
                    />
                  </div>
                  <div class="col">
                    <q-input
                      :label="t('adjustTargetInputSourceMeasure')"
                      v-model="targetDetailStore.oneTargetData.measureSource"
                      outlined
                      class="q-pb-sm"
                      :rules="[(val) => !!val || t('funcInputWarningFillData')]"
                      :disable="targetDetailStore.oneTargetData.isCorner"
                    />
                  </div>
                </div>
              </div>
              <div class="q-pa-md q-gutter-md flex justify-end">
                <q-btn
                  :label="t('funcSave')"
                  class="q-px-lg q-py-sm bg_defaultColor"
                  type="submit"
                  :disable="targetDetailStore.oneTargetData.isCorner"
                />
                <!-- <q-btn
                  :label="t('funcRemove')"
                  class="q-px-lg q-py-sm"
                  color="red-5"
                  @click="
                    targetDetailStore.deleteTarget(
                      targetDetailStore.oneTargetData
                    )
                  "
                  :disable="targetDetailStore.oneTargetData.isCorner"
                /> -->
              </div>
            </div>
          </q-form>
        </div>

        <!-- Add Target -->
        <div v-else>
          <div class="q-gutter-md q-pa-md">
            <q-icon
              @click="targetDetailStore.isShowFormAddNewTarget = false"
              class="q-mt-lg q-ml-lg cursor-pointer"
              name="arrow_back_ios"
              size="md"
            />

            <q-form
              @submit="
                targetDetailStore.postCreateTarget(
                  targetDetailStore.oneTargetDataCreate,
                  targetDetailStore.oneTargetData
                )
              "
              ref="form"
            >
              <div class="text-h5 q-py-md text-justify">
                {{ t("adjustTargetTitleAdd") }}:
                <q-badge
                  color="primary"
                  class="text-h6 q-ml-md"
                  outline
                  :label="targetDetailStore.oneTargetData.name"
                />
              </div>

              <q-input
                class="q-mb-sm"
                :label="t('adjustTargetInputTargetName')"
                v-model="targetDetailStore.oneTargetDataCreate.name"
                outlined
                :rules="[(val) => !!val || t('funcInputWarningFillData')]"
              />

              <div class="row">
                <div class="col q-mr-md">
                  <q-select
                    :label="t('adjustTargetInputTargetType')"
                    :options="targetDetailStore.targetTypeData"
                    option-label="name"
                    option-value="_id"
                    use-input
                    v-model="targetDetailStore.oneTargetDataCreate.targetType"
                    outlined
                    :rules="[(val) => !!val || t('funcInputWarningFillData')]"
                  >
                    <template #option="scope">
                      <q-item v-bind="scope.itemProps">
                        <q-item-section>
                          <q-item-label>{{ scope.opt.name }}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                </div>

                <div class="col q-mr-md">
                  <q-select
                    :label="t('adjustTargetInputFormula')"
                    :options="targetDetailStore.formulaData"
                    option-label="name"
                    option-value="_id"
                    use-input
                    v-model="targetDetailStore.oneTargetDataCreate.formula"
                    outlined
                    :rules="[(val) => !!val || t('funcInputWarningFillData')]"
                  >
                    <template #option="scope">
                      <q-item v-bind="scope.itemProps">
                        <q-item-section>
                          <q-item-label>{{ scope.opt.name }}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                </div>

                <div class="col">
                  <q-select
                    :label="t('adjustTargetInputFrequency')"
                    :options="targetDetailStore.frequencyData"
                    option-label="name"
                    option-value="_id"
                    use-input
                    v-model="
                      targetDetailStore.oneTargetDataCreate.frequencyMeasure
                    "
                    outlined
                    :rules="[(val) => !!val || t('funcInputWarningFillData')]"
                  >
                    <template #option="scope">
                      <q-item v-bind="scope.itemProps">
                        <q-item-section>
                          <q-item-label>{{ scope.opt.name }}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                </div>
              </div>
              <div class="row">
                <div class="col q-mr-md">
                  <q-input
                    :label="t('adjustTargetInputDefaultValue')"
                    v-model="targetDetailStore.oneTargetDataCreate.defaultValue"
                    outlined
                    type="number"
                    :rules="[(val) => !!val || t('funcInputWarningFillData')]"
                  />
                </div>
                <div class="col q-mr-md">
                  <q-input
                    label="Ngưỡng đạt:"
                    v-model="targetDetailStore.oneTargetDataCreate.minValue"
                    outlined
                    type="number"
                    :rules="[(val) => !!val || t('funcInputWarningFillData')]"
                  />
                </div>
                <div class="col">
                  <q-input
                    :label="t('adjustTargetInputImportance')"
                    v-model="
                      targetDetailStore.oneTargetDataCreate.importanceLevel
                    "
                    outlined
                    type="number"
                    :rules="[
                      (val) => !!val || t('funcInputWarningFillData'),
                      (val) =>
                        (val >= 0 && val <= 5) ||
                        'Mức độ quan trọng chỉ từ 0 đến 5',
                    ]"
                  />
                </div>
              </div>

              <div class="row">
                <div class="col q-mr-md">
                  <q-input
                    :label="t('adjustTargetInputUnit')"
                    v-model="targetDetailStore.oneTargetDataCreate.unit"
                    outlined
                    :rules="[(val) => !!val || t('funcInputWarningFillData')]"
                  />
                </div>
                <div class="col">
                  <q-input
                    :label="t('adjustTargetInputSourceMeasure')"
                    v-model="
                      targetDetailStore.oneTargetDataCreate.measureSource
                    "
                    outlined
                    :rules="[(val) => !!val || t('funcInputWarningFillData')]"
                  />
                </div>
              </div>

              <q-input
                :label="t('adjustTargetInputDesc')"
                v-model="
                  targetDetailStore.oneTargetDataCreate.methodAndCalDescription
                "
                outlined
              />

              <div class="q-pa-md q-gutter-md flex flex-center">
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

      <!-- First time init project, user don't have any target info right here -->
      <!-- <div v-else-if="targetDetailStore.amountOfTarget">
          <div class="q-gutter-md q-pa-md">
            <q-form
              @submit="
                targetDetailStore.postCreateTargetKpi(
                  targetDetailStore.targetSelectedAdd
                )
              "
              ref="form"
            >
              <div class="text-h5 q-py-md text-justify">
                Thêm mục tiêu con cho:
                <q-badge
                  color="primary"
                  class="text-h6 q-ml-md"
                  outline
                  :label="targetDetailStore.firstCompanyData.name"
                />
              </div>

              <q-input
                class="q-mb-sm"
                label="Tên Mục tiêu:"
                v-model="targetDetailStore.targetSelectedAdd.name"
                outlined
                :rules="[(val) => !!val || t('funcInputWarningFillData')]"
              />
              <q-input
                class="q-mb-md"
                label="Mô tả mục tiêu:"
                v-model="targetDetailStore.targetSelectedAdd.description"
                outlined
                :rules="[(val) => !!val || t('funcInputWarningFillData')]"
              />

              <div class="row q-mb-md">
                <div class="col q-mr-md">
                  <q-input
                    label="Phương pháp tính:"
                    v-model="targetDetailStore.oneTargetData.cal"
                    :filled="targetDetailStore.isNodeParent ? true : false"
                    :outlined="targetDetailStore.isNodeParent ? false : true"
                    :rules="[(val) => !!val || t('funcInputWarningFillData')]"
                    :disable="targetDetailStore.isNodeParent ? true : false"
                  />
                </div>

                <div class="col q-mr-md">
                  <q-input
                    label="Loại mục tiêu:"
                    v-model="targetDetailStore.oneTargetData.type"
                    :filled="targetDetailStore.isNodeParent ? true : false"
                    :outlined="targetDetailStore.isNodeParent ? false : true"
                    :rules="[(val) => !!val || t('funcInputWarningFillData')]"
                    :disable="targetDetailStore.isNodeParent ? true : false"
                  />
                </div>

                <div class="col">
                  <q-select
                    :options="targetDetailStore.optionFilterMeasureSourceId"
                    option-label="name"
                    label="Nguồn đo:"
                    @filter="targetDetailStore.filterChangeMeasureSourceId"
                    use-input
                    v-model="targetDetailStore.targetSelectedAdd.measureSource"
                    outlined
                    :rules="[(val) => !!val || t('funcInputWarningFillData')]"
                  >
                    <template #option="scope">
                      <q-item
                        v-bind="scope.itemProps"
                        @click="
                          targetDetailStore.onChangeMeasureourceId(scope.opt)
                        "
                      >
                        <q-item-section>
                          <q-item-label>{{ scope.label }}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                </div>
              </div>

              <q-input
                class="q-mb-md"
                label="Mô tả PP và công thức tính:"
                v-model="
                  targetDetailStore.targetSelectedAdd.descriptionMethodCal
                "
                outlined
                :rules="[(val) => !!val || t('funcInputWarningFillData')]"
              />

              <div class="row q-mb-md">
                <div class="col q-mr-md">
                  <q-input
                    label="Chỉ tiêu (Phấn đấu):"
                    v-model="targetDetailStore.targetSelectedAdd.defaultValue"
                    outlined
                    type="number"
                    :rules="[(val) => !!val || t('funcInputWarningFillData')]"
                  />
                </div>
                <div class="col q-mr-md">
                  <q-input
                    label="Ngưỡng đạt:"
                    v-model="targetDetailStore.targetSelectedAdd.minValue"
                    outlined
                    type="number"
                    :rules="[(val) => !!val || t('funcInputWarningFillData')]"
                  />
                </div>
                <div class="col">
                  <q-input
                    label="Mức độ quan trọng:"
                    v-model="targetDetailStore.targetSelectedAdd.weight"
                    outlined
                    type="number"
                    :rules="[(val) => !!val || t('funcInputWarningFillData')]"
                  />
                </div>
              </div>

              <div class="row q-mb-md">
                <div class="col q-mr-md">
                  <q-input
                    label="Tên kỹ thuật:"
                    v-model="targetDetailStore.targetSelectedAdd.techName"
                    filled
                    :rules="[(val) => !!val || t('funcInputWarningFillData')]"
                  />
                </div>
                <div class="col q-mr-md">
                  <q-input
                    label="Đơn vị tính:"
                    v-model="targetDetailStore.targetSelectedAdd.unit"
                    outlined
                    :rules="[(val) => !!val || t('funcInputWarningFillData')]"
                  />
                </div>

                <div class="col">
                  <q-input
                    label="Tần suất đo:"
                    v-model="
                      targetDetailStore.targetSelectedAdd.frequencyMeasure
                    "
                    outlined
                    :rules="[(val) => !!val || t('funcInputWarningFillData')]"
                  />
                </div>
              </div>

              <q-input
                label="Ghi chú:"
                v-model="targetDetailStore.targetSelectedAdd.note"
                outlined
              />

              <div class="q-pa-md q-gutter-md flex flex-center">
                <q-btn
                  label="Thêm"
                  class="q-px-lg q-py-sm"
                  color="primary"
                  type="submit"
                />
              </div>
            </q-form>
          </div>
        </div> -->

      <!-- No data user click -->
      <div v-else class="full-height" style="height: 90vh !important">
        <BlankComponent
          :dataContent="t('funcWarningSelectTargetData')"
        ></BlankComponent>
      </div>
    </template>
  </q-splitter>
</template>

<style scoped></style>
