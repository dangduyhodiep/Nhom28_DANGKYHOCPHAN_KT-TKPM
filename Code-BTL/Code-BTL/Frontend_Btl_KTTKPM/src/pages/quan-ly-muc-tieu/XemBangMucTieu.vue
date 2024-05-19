<script setup>
/* library */
import { ref, watch, onMounted, onBeforeMount } from "vue";

/* stores */
import { useSettingStore } from "@/stores/extra/SettingStore.js";
import { useUtilStore } from "@/stores/dataStore";
import { useXemBangMucTieu } from "@/stores/quan-ly-muc-tieu/XemBangMucTieu.js";
import { useTableColumnStore } from "@/stores/extra/TableColumnStore.js";

/* import component */
import treeStructureComponent from "@/components/treeStructureComponent.vue";
import BlankComponent from "@/components/base/BlankComponent.vue";

/* Third Library */
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const router = useRouter();
const { t } = useI18n();

/* change width of left size */
const splitterModel = ref(20);

const storeXemBangMucTieu = useXemBangMucTieu();
const tableColumnStore = useTableColumnStore();
const storeUtils = useUtilStore();
const storeSetting = useSettingStore();

onBeforeMount(async () => {
  await storeUtils.getCompany();
});

onMounted(async () => {
  /* config href */
  storeSetting.routerHref = router.currentRoute._rawValue.href;
});
watch(
  () => storeUtils.treeSelected,
  async (val) => {
    if (val) {
      storeUtils.idTargetSelected = val;
      const arrAssignBetweenStructAndTarget =
        await storeUtils.getAllAssignOfCompanyInfo(storeUtils.treeSelected);

      storeUtils.assignBetweenTargetAndCompanyData =
        storeUtils.arrangeTargetData(arrAssignBetweenStructAndTarget);

      storeUtils.assignBetweenTargetAndCompanyData =
        await storeUtils.calculateDisplayTargetData(
          storeUtils.assignBetweenTargetAndCompanyData
        );

      /* Remember "name" when user click and redirect to another page can able display */
      storeUtils.companyStructureData.map((i) => {
        if (i._id === val) {
          storeUtils.nameTargetSelected = i.name;
        }
      });

      // console.log(storeUtils.assignBetweenTargetAndCompanyData);
    }
  }
);
</script>

<template>
  <div>
    <q-splitter v-model="splitterModel" style="height: 100%">
      <template v-slot:before>
        <treeStructureComponent
          isShowDirectButton="true"
        ></treeStructureComponent>
      </template>

      <template v-slot:after>
        <div
          class="flex flex-center full-width full-height"
          style="height: 90vh !important"
          v-if="!storeUtils.assignBetweenTargetAndCompanyData?.length"
        >
          <BlankComponent
            :dataContent="t('funcWarningNoData')"
          ></BlankComponent>
        </div>

        <q-table
          v-else
          flat
          bordered
          class="my-sticky-header-table"
          :rows="storeUtils.assignBetweenTargetAndCompanyData"
          :columns="tableColumnStore.columnTargetView"
          row-key="name"
          :rows-per-page-options="[0]"
          hide-bottom
          style="height: 90vh"
          separator="cell"
        >
          <template v-slot:body="props">
            <tr v-if="!props.row.isCorner" :props="props" style="width: 100%">
              <td class="text-center">{{ props.row.index }}</td>
              <td
                class="text-justify bg-white"
                :props="props"
                key="name"
                style="
                  min-width: 30vw;
                  border-right: 1px solid rgba(0, 0, 0, 0.12);
                "
              >
                <span style="font-size: 1.1em">
                  <span style="white-space: pre-wrap">{{
                    props.row.name
                  }}</span>
                </span>
              </td>
              <td class="text-left" :props="props" key="unit" style="width: 5%">
                <span style="font-size: 1.1em"
                  ><span style="white-space: pre-wrap"
                    >{{ props.row.unit }}
                  </span></span
                >
              </td>
              <td
                class="text-left"
                :props="props"
                key="desc"
                style="min-width: 20vw"
              >
                <span style="font-size: 1.1em"
                  ><span style="white-space: pre-wrap"
                    >{{ props.row.methodAndCalDescription }}
                  </span></span
                >
              </td>
              <td class="text-center">
                <span style="font-size: 1.1em"
                  ><span style="white-space: pre-wrap"
                    >{{ props.row.frequencyMeasureName }}
                  </span></span
                >
              </td>
              <td class="text-center">
                <span style="font-size: 1.1em"
                  ><span style="white-space: pre-wrap"
                    >{{ props.row.measureSource }}
                  </span></span
                >
              </td>
              <td class="text-left">
                <span style="font-size: 1.1em"
                  ><span style="white-space: pre-wrap"
                    >{{ props.row.formulaName }}
                  </span></span
                >
              </td>
              <td class="text-left" style="min-width: 10vw">
                <span style="font-size: 1.1em"
                  ><span style="white-space: pre-wrap"
                    >{{ props.row.targetTypeName }}
                  </span></span
                >
              </td>
              <td class="text-center">
                <span style="font-size: 1.1em"
                  ><span style="white-space: pre-wrap"
                    >{{ props.row.importanceLevel }}
                  </span></span
                >
              </td>
              <td class="text-center">
                <span style="font-size: 1.1em"
                  ><span style="white-space: pre-wrap">
                    {{ props.row.tyTrong ? props.row.tyTrong : "" }}%
                  </span></span
                >
              </td>
              <td class="text-center">
                <span style="font-size: 1.1em"
                  ><span style="white-space: pre-wrap"
                    >{{ props.row.defaultValue }}
                  </span></span
                >
              </td>
              <td class="text-center">
                <span style="font-size: 1.1em"
                  ><span style="white-space: pre-wrap"
                    >{{ props.row.minValue }}
                  </span></span
                >
              </td>
            </tr>

            <tr
              v-else
              style="width: 100%; padding: 5em 0"
              :props="props"
              class="bg-grey-5 q-py-lg"
            >
              <td
                class="text-center"
                key="name"
                :props="props"
                style="width: 5%"
              >
                <span style="font-size: 1.1em"
                  ><span style="white-space: pre-wrap">{{
                    props.row.techName
                  }}</span></span
                >
              </td>

              <td
                class="text-justify"
                key="name"
                :props="props"
                style="width: 50%"
              >
                <span style="font-size: 1.1em"
                  ><span style="white-space: pre-wrap">{{
                    props.row.name
                  }}</span></span
                >
              </td>

              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td class="text-center text-bold">
                <span style="font-size: 1.1em">
                  <span v-if="props.row.tyTrong" style="white-space: pre-wrap">
                    {{ props.row.tyTrong }}%
                  </span>

                  <span v-else style="white-space: pre-wrap"> {{}} </span>
                </span>
              </td>
              <td></td>
              <td></td>
            </tr>
          </template>
        </q-table>
      </template>
    </q-splitter>
  </div>
</template>

<style lang="scss" scoped>
body {
  overflow-y: hidden;
}

.my-card {
  width: 100%;
}

.icon-with-border {
  border: 2px solid rgb(17, 17, 17);
  /* Set your desired border color */
  border-radius: 50%;
  /* Make the border circular by setting the border-radius to 50% */
  padding: 5px;
  /* Optional: Add padding to the icon if needed */
  cursor: pointer;
}

.q-dialog.full-width {
  width: 100% !important;
}
.my-sticky-header-table {
  /* height or max-height is important */
  height: 310px;

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th {
    /* bg color is important for th; just specify one */
    background-color: #ffffff !important;
  }

  thead tr th {
    position: sticky;
    z-index: 0;
  }

  thead tr:first-child th {
    top: 0 !important;
    z-index: 1;
  }

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th {
    /* height of all previous header rows */
    top: 48px;
  }

  /* prevent scrolling behind sticky top row on focus */
  tbody {
    /* height of all previous header rows */
    scroll-margin-top: 48px;
  }
}

/* new css */
.q-table tbody td:before {
  background: rgba(77, 179, 247, 0.157);
}

.my-sticky-header-table td:nth-child(2),
.my-sticky-header-table th:nth-child(2),
.my-sticky-header-table
  th:nth-child(1)
  .my-sticky-header-table
  // td:nth-child(1)
{
  position: sticky;
  left: 0;
  z-index: 1;
}
</style>

<style lang="css">
.my-sticky-header-table thead tr:first-child th:nth-child(2) {
  top: 0;
  left: 0 !important;
  z-index: 10 !important;
}
</style>
