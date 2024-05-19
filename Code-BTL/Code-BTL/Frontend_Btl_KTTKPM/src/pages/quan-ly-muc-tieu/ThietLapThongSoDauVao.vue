<script setup>
/* Build In VueJs */
import { onMounted, ref } from "vue";

/* Pinia Store */
import { useSettingStore } from "@/stores/extra/SettingStore.js";
import { useLoaiMucTieuStore } from "@/stores/quan-ly-muc-tieu/LoaiMucTieuStore";
import { usePhuongPhapTinhStore } from "@/stores/quan-ly-muc-tieu/PhuongPhapTinhStore";
import { useTanSuatDo } from "@/stores/quan-ly-muc-tieu/TanSuatDoStore";
import { useCaiDatMucTieuStore } from "@/stores/settings/CaiDatMucTieuStore";
import { useUtilStore } from "@/stores/dataStore";

/* Quasar */
import { useI18n } from "vue-i18n";

/* Third Library */
import { useRouter } from "vue-router";

const { t } = useI18n();
const router = useRouter();
const storeSetting = useSettingStore();
const storeLoaiMucTieu = useLoaiMucTieuStore();
const storePhuongPhapTinh = usePhuongPhapTinhStore();
const storeTanSuatDo = useTanSuatDo();
const storeCaiDatMucTieu = useCaiDatMucTieuStore();
const storeUtils = useUtilStore();

/* for scrollbar */
const firstRef = ref(null);
const thumbStyle = {
  right: "4px",
  borderRadius: "7px",
  backgroundColor: "#027be3",
  width: "4px",
  opacity: 0.75,
};

const barStyle = {
  right: "2px",
  borderRadius: "9px",
  backgroundColor: "#027be3",
  width: "8px",
  opacity: 0.2,
};

onMounted(async () => {
  /* config href */
  storeSetting.routerHref = router.currentRoute._rawValue.href;

  await storeLoaiMucTieu.getInit();
  await storePhuongPhapTinh.getInit();
  await storeTanSuatDo.getInit();
  await storeUtils.getAllTargetData();
  await storeCaiDatMucTieu.getLimitValue();
  storeLoaiMucTieu.listTargetTypeFromTargetDatabase = storeUtils.targetData.map(
    (item) => {
      return item.targetTypeId;
    }
  );

  storeLoaiMucTieu.listTargetTypeFromTargetDatabase = [
    ...new Set(storeLoaiMucTieu.listTargetTypeFromTargetDatabase),
  ];
});

const toggleValue = () => {
  return !this.item.isDisable;
};
</script>

<template>
  <div>
    <q-tabs
      v-model="storeCaiDatMucTieu.tabSelected"
      dense
      class="text-grey q-pa-sm"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab
        name="tab1"
        icon="format_line_spacing"
        :label="t('taskbarTargetType')"
      />
      <q-tab name="tab2" icon="calculate" :label="t('taskbarFormulaType')" />
      <q-tab
        name="tab3"
        icon="60fps_select"
        :label="t('taskbarFrequentlyCheck')"
      />
    </q-tabs>

    <q-tab-panels v-model="storeCaiDatMucTieu.tabSelected" animated>
      <q-tab-panel name="tab1">
        <div class="q-pa-lg flex flex-center" style="height: 80vh">
          <q-card
            class="my-card q-pa-lg"
            style="
              width: 50%;
              height: 90%;
              border-radius: 12px;
              margin-bottom: 20%;
            "
          >
            <q-card-section>
              <div class="flex justify-between">
                <div class="text-h5 text-bold q-mb-lg">
                  {{ t("targetTitle") }}
                </div>

                <q-icon
                  class="cursor-pointer"
                  name="delete"
                  size="md"
                  @click="
                    storeCaiDatMucTieu.showDialogListDeleted(
                      1,
                      storeLoaiMucTieu.listTargetTypeDisable.length
                    ),
                      storeLoaiMucTieu.getAllTargetDataDisable()
                  "
                />
              </div>
            </q-card-section>

            <q-card-section
              style="
                border: 3px solid #f3f3f3;
                border-radius: 8px;
                height: 80%;
                padding-bottom: 5%;
              "
            >
              <div class="btn-wrap full-width flex flex-center q-py-md">
                <q-btn
                  icon="add"
                  :label="t('funcAdd')"
                  style="width: 100%; font-size: 1.4em"
                  class="q-py-sm text-capitalize bg_defaultColor text-bold"
                  @click="storeLoaiMucTieu.dialogAddTargetType = true"
                />
              </div>

              <q-scroll-area
                visible
                :thumb-style="thumbStyle"
                :bar-style="barStyle"
                style="height: 87%"
                class="col q-pr-md"
                ref="firstRef"
              >
                <div>
                  <div
                    v-for="(item, index) in storeLoaiMucTieu.listTargetType"
                    :key="index"
                    class="card-item full-width q-py-sm q-pb-md q-pl-md flex"
                    @dblclick="
                      storeLoaiMucTieu.dialogUpdateTargetType = true;
                      storeLoaiMucTieu.objectUpdateTarget = Object.assign(
                        {},
                        item
                      );
                    "
                  >
                    <div style="width: 90%; font-weight: 600">
                      {{ item.name }}
                    </div>
                    <div class="flex flex-center z-max" style="width: 10%">
                      <q-icon
                        @click="storeLoaiMucTieu.deleteTargetType(item)"
                        class="close-hover"
                        name="close"
                        size="sm"
                      />
                    </div>
                  </div>
                </div>
              </q-scroll-area>
            </q-card-section>
          </q-card>
        </div>

        <!-- Dialog add target type -->
        <q-dialog v-model="storeLoaiMucTieu.dialogAddTargetType" persistent>
          <q-card>
            <q-card-section class="row items-center">
              <q-form
                @submit="
                  storeLoaiMucTieu.addTargetType(
                    storeLoaiMucTieu.objectAddTarget
                  )
                "
                class="q-gutter-md"
                style="min-width: 500px"
              >
                <div>
                  <span class="text-h5 text-bold q-py-md">{{
                    $t("targetAddBoxTitle")
                  }}</span>
                  <q-input
                    outlined
                    autofocus
                    v-model="storeLoaiMucTieu.objectAddTarget.name"
                    type="text"
                    :label="$t('targetAddInputName')"
                    class="full-width q-py-md"
                    :rules="[(val) => !!val || t('funcInputWarningFillData')]"
                  />
                </div>

                <div class="flex justify-end">
                  <q-btn
                    flat
                    :label="t('funcCancel')"
                    color="primary"
                    v-close-popup
                  />
                  <q-btn
                    type="submit"
                    :label="t('funcAdd')"
                    class="bg_defaultColor"
                  />
                </div>
              </q-form>
            </q-card-section>
          </q-card>
        </q-dialog>

        <!-- Dialog update target type -->
        <q-dialog v-model="storeLoaiMucTieu.dialogUpdateTargetType" persistent>
          <q-card>
            <q-card-section class="row items-center">
              <q-form
                @submit="
                  storeLoaiMucTieu.updateTargetType(
                    storeLoaiMucTieu.objectUpdateTarget
                  )
                "
                class="q-gutter-md"
                style="min-width: 500px"
              >
                <div>
                  <span class="text-h5 text-bold q-py-md">{{
                    $t("targetUpdateBoxTitle")
                  }}</span>
                  <q-input
                    outlined
                    autofocus
                    v-model="storeLoaiMucTieu.objectUpdateTarget.name"
                    type="text"
                    :label="$t('targetAddInputName')"
                    class="full-width q-py-md"
                    :rules="[(val) => !!val || t('funcInputWarningFillData')]"
                  />
                </div>

                <div class="flex justify-end">
                  <q-btn
                    flat
                    :label="t('funcCancel')"
                    color="primary"
                    v-close-popup
                  />
                  <q-btn
                    type="submit"
                    :label="t('funcUpdate')"
                    class="bg_defaultColor"
                  />
                </div>
              </q-form>
            </q-card-section>
          </q-card>
        </q-dialog>
      </q-tab-panel>

      <q-tab-panel name="tab2">
        <div class="q-pa-lg flex flex-center" style="height: 80vh">
          <q-card
            class="my-card q-pa-lg"
            style="
              width: 50%;
              height: 90%;
              border-radius: 12px;
              margin-bottom: 20%;
            "
          >
            <q-card-section>
              <div class="flex justify-between">
                <div class="text-h5 text-bold q-mb-lg">
                  {{ t("formulaTitle") }}
                </div>

                <q-icon
                  class="cursor-pointer"
                  name="delete"
                  size="md"
                  @click="
                    storeCaiDatMucTieu.showDialogListDeleted(
                      2,
                      storePhuongPhapTinh.listFormulaTypeDisable.length
                    )
                  "
                />
              </div>
            </q-card-section>

            <q-card-section
              style="
                border: 3px solid #f3f3f3;
                border-radius: 8px;
                height: 80%;
                padding-bottom: 5%;
              "
            >
              <div class="btn-wrap full-width flex flex-center q-py-md">
                <q-btn
                  icon="add"
                  :label="t('funcAdd')"
                  style="width: 100%; font-size: 1.4em"
                  class="q-py-sm text-capitalize bg_defaultColor text-bold"
                  @click="storePhuongPhapTinh.dialogAddFormulaType = true"
                />
              </div>

              <q-scroll-area
                visible
                :thumb-style="thumbStyle"
                :bar-style="barStyle"
                style="height: 87%"
                class="col q-pr-md"
                ref="firstRef"
              >
                <div>
                  <div
                    v-for="(item, index) in storePhuongPhapTinh.listFormulaType"
                    :key="index"
                    class="card-item full-width q-py-sm q-pb-md q-pl-md flex"
                    @dblclick="
                      storePhuongPhapTinh.dialogUpdateFormulaType = true;
                      storePhuongPhapTinh.objectUpdateFormula = Object.assign(
                        {},
                        item
                      );
                    "
                  >
                    <div style="width: 90%">
                      <b> {{ item.name }}</b>
                      <br />
                      <span class="text-subtitle1">{{ item.description }}</span>
                    </div>
                    <div class="flex flex-center z-max" style="width: 10%">
                      <q-icon
                        @click="storePhuongPhapTinh.deleteFormulaType(item)"
                        class="close-hover"
                        name="close"
                        size="sm"
                      />
                    </div>
                  </div>
                </div>
              </q-scroll-area>
            </q-card-section>
          </q-card>
        </div>

        <!-- Dialog add -->
        <q-dialog v-model="storePhuongPhapTinh.dialogAddFormulaType" persistent>
          <q-card>
            <q-card-section class="row items-center">
              <q-form
                @submit="
                  storePhuongPhapTinh.addFormulaType(
                    storePhuongPhapTinh.objectAddFormula
                  )
                "
                class="q-gutter-md"
                style="min-width: 500px"
              >
                <div>
                  <span class="text-h5 text-bold q-py-md">{{
                    $t("formulaAddBoxTitle")
                  }}</span>
                  <q-input
                    outlined
                    autofocus
                    v-model="storePhuongPhapTinh.objectAddFormula.name"
                    type="text"
                    :label="$t('formulaAddInputName')"
                    class="full-width q-py-md"
                    :rules="[(val) => !!val || t('funcInputWarningFillData')]"
                  />

                  <q-input
                    outlined
                    autofocus
                    v-model="storePhuongPhapTinh.objectAddFormula.desc"
                    type="text"
                    :label="$t('formulaAddInputDesc')"
                    class="full-width q-py-md"
                    :rules="[(val) => !!val || t('funcInputWarningFillData')]"
                  />
                </div>

                <div class="flex justify-end">
                  <q-btn
                    flat
                    :label="t('funcCancel')"
                    color="primary"
                    v-close-popup
                  />
                  <q-btn
                    type="submit"
                    :label="t('funcAdd')"
                    class="bg_defaultColor"
                  />
                </div>
              </q-form>
            </q-card-section>
          </q-card>
        </q-dialog>

        <!-- Dialog update -->
        <q-dialog
          v-model="storePhuongPhapTinh.dialogUpdateFormulaType"
          persistent
        >
          <q-card>
            <q-card-section class="row items-center">
              <q-form
                @submit="
                  storePhuongPhapTinh.updateFormulaType(
                    storePhuongPhapTinh.objectUpdateFormula
                  )
                "
                class="q-gutter-md"
                style="min-width: 500px"
              >
                <div>
                  <span class="text-h5 text-bold q-py-md">{{
                    $t("formulaAddBoxTitle")
                  }}</span>
                  <q-input
                    outlined
                    autofocus
                    v-model="storePhuongPhapTinh.objectUpdateFormula.name"
                    type="text"
                    :label="$t('formulaAddInputName')"
                    class="full-width q-py-md"
                    :rules="[(val) => !!val || t('funcInputWarningFillData')]"
                  />

                  <q-input
                    outlined
                    autofocus
                    v-model="
                      storePhuongPhapTinh.objectUpdateFormula.description
                    "
                    type="text"
                    :label="$t('formulaAddInputDesc')"
                    class="full-width q-py-md"
                    :rules="[(val) => !!val || t('funcInputWarningFillData')]"
                  />
                </div>

                <div class="flex justify-end">
                  <q-btn
                    flat
                    :label="t('funcCancel')"
                    color="primary"
                    v-close-popup
                  />
                  <q-btn
                    type="submit"
                    :label="t('funcUpdate')"
                    class="bg_defaultColor"
                  />
                </div>
              </q-form>
            </q-card-section>
          </q-card>
        </q-dialog>
      </q-tab-panel>

      <q-tab-panel name="tab3">
        <div class="q-pa-lg flex flex-center" style="height: 80vh">
          <q-card
            class="my-card q-pa-lg"
            style="
              width: 50%;
              height: 90%;
              border-radius: 12px;
              margin-bottom: 20%;
            "
          >
            <q-card-section>
              <div class="flex justify-between">
                <div class="text-h5 text-bold q-mb-lg">
                  {{ t("frequencyTitle") }}
                </div>

                <q-icon
                  class="cursor-pointer"
                  name="delete"
                  size="md"
                  @click="
                    storeCaiDatMucTieu.showDialogListDeleted(
                      3,
                      storeTanSuatDo.listFrequencyDisable.length
                    )
                  "
                />
              </div>
            </q-card-section>

            <q-card-section
              style="
                border: 3px solid #f3f3f3;
                border-radius: 8px;
                height: 80%;
                padding-bottom: 5%;
              "
            >
              <div class="btn-wrap full-width flex flex-center q-py-md">
                <q-btn
                  icon="add"
                  :label="t('funcAdd')"
                  style="width: 100%; font-size: 1.4em"
                  class="q-py-sm text-capitalize bg_defaultColor text-bold"
                  @click="storeTanSuatDo.dialogAddFrequency = true"
                />
              </div>

              <q-scroll-area
                visible
                :thumb-style="thumbStyle"
                :bar-style="barStyle"
                style="height: 87%"
                class="col q-pr-md"
                ref="firstRef"
              >
                <div>
                  <div
                    v-for="(item, index) in storeTanSuatDo.listFrequency"
                    :key="index"
                    class="card-item full-width q-py-sm q-pb-md q-pl-md flex"
                    @dblclick="
                      storeTanSuatDo.dialogUpdateFrequency = true;
                      storeTanSuatDo.objectUpdateFormula = Object.assign(
                        {},
                        item
                      );
                    "
                  >
                    <div style="width: 90%">
                      <b class="text-uppercase"> {{ item.name }}</b>
                      <br />
                      <span class="text-subtitle1">{{ item.description }}</span>
                    </div>
                    <div class="flex flex-center z-max" style="width: 10%">
                      <q-icon
                        @click="storeTanSuatDo.deleteFrequency(item)"
                        class="close-hover"
                        name="close"
                        size="sm"
                      />
                    </div>
                  </div>
                </div>
              </q-scroll-area>
            </q-card-section>
          </q-card>
        </div>

        <!-- Dialog add -->
        <q-dialog v-model="storeTanSuatDo.dialogAddFrequency" persistent>
          <q-card>
            <q-card-section class="row items-center">
              <q-form
                @submit="
                  storeTanSuatDo.addFrequency(storeTanSuatDo.objectAddFormula)
                "
                class="q-gutter-md"
                style="min-width: 500px"
              >
                <div>
                  <span class="text-h5 text-bold q-py-md">{{
                    $t("frequencyAddBoxTitle")
                  }}</span>
                  <q-input
                    outlined
                    autofocus
                    v-model="storeTanSuatDo.objectAddFormula.name"
                    type="text"
                    :label="$t('frequencyAddInputName')"
                    class="full-width q-py-md"
                    :rules="[(val) => !!val || t('funcInputWarningFillData')]"
                  />

                  <q-input
                    outlined
                    autofocus
                    v-model="storeTanSuatDo.objectAddFormula.desc"
                    type="text"
                    :label="$t('frequencyDescInputName')"
                    class="full-width q-py-md"
                    :rules="[(val) => !!val || t('funcInputWarningFillData')]"
                  />
                </div>

                <div class="flex justify-end">
                  <q-btn
                    flat
                    :label="t('funcCancel')"
                    color="primary"
                    v-close-popup
                  />
                  <q-btn
                    type="submit"
                    :label="t('funcAdd')"
                    class="bg_defaultColor"
                  />
                </div>
              </q-form>
            </q-card-section>
          </q-card>
        </q-dialog>

        <!-- Dialog update -->
        <q-dialog v-model="storeTanSuatDo.dialogUpdateFrequency" persistent>
          <q-card>
            <q-card-section class="row items-center">
              <q-form
                @submit="
                  storeTanSuatDo.updateFormulaType(
                    storeTanSuatDo.objectUpdateFormula
                  )
                "
                class="q-gutter-md"
                style="min-width: 500px"
              >
                <div>
                  <span class="text-h5 text-bold q-py-md">{{
                    $t("frequencyUpdateBoxTitle")
                  }}</span>
                  <q-input
                    outlined
                    autofocus
                    v-model="storeTanSuatDo.objectUpdateFormula.name"
                    type="text"
                    :label="$t('frequencyAddInputName')"
                    class="full-width q-py-md"
                    :rules="[(val) => !!val || t('funcInputWarningFillData')]"
                  />

                  <q-input
                    outlined
                    autofocus
                    v-model="storeTanSuatDo.objectUpdateFormula.description"
                    type="text"
                    :label="$t('frequencyDescInputName')"
                    class="full-width q-py-md"
                    :rules="[(val) => !!val || t('funcInputWarningFillData')]"
                  />
                </div>

                <div class="flex justify-end">
                  <q-btn
                    flat
                    :label="t('funcCancel')"
                    color="primary"
                    v-close-popup
                  />
                  <q-btn
                    type="submit"
                    :label="t('funcUpdate')"
                    class="bg_defaultColor"
                  />
                </div>
              </q-form>
            </q-card-section>
          </q-card>
        </q-dialog>
      </q-tab-panel>
    </q-tab-panels>
  </div>

  <!-- Dialog show list deleted -->
  <q-dialog v-model="storeCaiDatMucTieu.isShowDeletedListDialog" persistent>
    <q-card
      style="
        min-width: 40vw;
        max-height: 70vh;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
        border-radius: 8px;
      "
      class="q-pa-md"
      v-if="storeCaiDatMucTieu.selectListDeleteValue === 1"
    >
      <q-card-section class="row items-center">
        <span class="q-ml-sm text-h5 text-bold"
          >Danh sách các loại mục tiêu đã xóa</span
        >
      </q-card-section>

      <q-card-section class="row items-center q-px-lg">
        <div
          v-for="(item, index) in storeLoaiMucTieu.listTargetTypeDisable"
          :key="index"
          style="width: 100%; padding: 0 2em"
        >
          <div class="flex column" style="position: relative">
            <div
              class="flex justify-between q-items-center q-mb-sm"
              style="width: 100%; align-items: center"
            >
              <span>{{ item.name }}</span>
              <q-toggle v-model="item.isToggle" color="green" />
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat :label="t('funcCancel')" color="primary" v-close-popup />
        <q-btn
          @click="storeLoaiMucTieu.enableListTargetDisable()"
          class="bg_defaultColor"
          :label="t('funcSave')"
          v-close-popup
        />
      </q-card-actions>
    </q-card>

    <q-card
      style="
        min-width: 40vw;
        max-height: 70vh;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
        border-radius: 8px;
      "
      class="q-pa-md"
      v-if="storeCaiDatMucTieu.selectListDeleteValue === 2"
    >
      <q-card-section class="row items-center">
        <span class="q-ml-sm text-h5 text-bold"
          >Danh sách Phương pháp tính đã xóa</span
        >
      </q-card-section>

      <q-card-section class="row items-center q-px-lg">
        <div
          v-for="(item, index) in storePhuongPhapTinh.listFormulaTypeDisable"
          :key="index"
          style="width: 100%; padding: 0 2em"
        >
          <div class="flex column" style="position: relative">
            <div
              class="flex justify-between q-items-center q-mb-md"
              style="width: 100%; align-items: center"
            >
              <div class="flex column justify-start">
                <span class="text-bold text-subtitle1">{{ item.name }}</span>
                {{ item.description }}
              </div>
              <q-toggle v-model="item.isToggle" color="green" />
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat :label="t('funcCancel')" color="primary" v-close-popup />
        <q-btn
          @click="storePhuongPhapTinh.enableListFormulaDisable()"
          class="bg_defaultColor"
          :label="t('funcSave')"
          v-close-popup
        />
      </q-card-actions>
    </q-card>

    <q-card
      style="
        min-width: 40vw;
        max-height: 70vh;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
        border-radius: 8px;
      "
      class="q-pa-md"
      v-if="storeCaiDatMucTieu.selectListDeleteValue === 3"
    >
      <q-card-section class="row items-center">
        <span class="q-ml-sm text-h5 text-bold"
          >Danh sách Tần suất đo đã xóa</span
        >
      </q-card-section>

      <q-card-section class="row items-center q-px-lg">
        <div
          v-for="(item, index) in storeTanSuatDo.listFrequencyDisable"
          :key="index"
          style="width: 100%; padding: 0 2em"
        >
          <div class="flex column" style="position: relative">
            <div
              class="flex justify-between q-items-center q-mb-md"
              style="width: 100%; align-items: center"
            >
              <div class="flex column justify-start">
                <span class="text-bold text-subtitle1">{{ item.name }}</span>
                {{ item.description }}
              </div>
              <q-toggle v-model="item.isToggle" color="green" />
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat :label="t('funcCancel')" color="primary" v-close-popup />
        <q-btn
          @click="storeTanSuatDo.enableListFrequencyDisable()"
          class="bg_defaultColor"
          :label="t('funcSave')"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style lang="scss" scoped>
.card-item {
  border-bottom: 2px solid #f5f5f5;
  cursor: pointer;
  &:hover {
    background-color: #fafafa;
    border-radius: 15px;
    transition: all ease 0.2s;
  }
}

.close-hover {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  &:hover {
    background-color: #e2e2e2;
    transition: all ease 0.3s;
  }
}
</style>
