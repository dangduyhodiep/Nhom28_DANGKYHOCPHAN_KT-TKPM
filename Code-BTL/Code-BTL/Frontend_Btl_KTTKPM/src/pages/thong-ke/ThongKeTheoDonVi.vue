<script setup>
/* Build in VueJs */
import { ref, provide, watch, onMounted, onBeforeMount } from "vue";

/* Pinia Store */
import { useStoreThongKeTheoDonVi } from "@/stores/thong-ke/ThongKeTheoDonViStore.js";
import { useSettingStore } from "@/stores/extra/SettingStore.js";

/* Third Library */
import { useRouter } from "vue-router";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";

const router = useRouter();
const storeSetting = useSettingStore();
const storeThongKeTheoDonVi = useStoreThongKeTheoDonVi();

onBeforeMount(async () => {
  /* config href */
  storeSetting.routerHref = router.currentRoute._rawValue.href;

  await storeThongKeTheoDonVi.getCompany();
  storeThongKeTheoDonVi.companySelected = storeThongKeTheoDonVi.companyData[0];
  departmentData.value = storeThongKeTheoDonVi.companyData;
});

const isDark = ref(true);
if (localStorage.getItem("isDark") == "true") {
  isDark.value = true;
} else {
  isDark.value = false;
}

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

provide(THEME_KEY, isDark.value === true ? "dark" : "light");

const option = ref({
  title: {
    text: "Biểu đồ thống kê mục tiêu theo đơn vị",
    left: "center",
  },
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b} : {c} ({d}%)",
  },
  legend: {
    orient: "vertical",
    left: "left",
    data: [
      "Phòng Tổ chức nhân sự",
      "Phòng Chế độ chính sách",
      "Phòng Đảng - Đoàn thể",
      "Phòng Đào tạo",
      "Phòng Chuyên môn nghiệp vụ",
    ],
  },
  series: [
    {
      name: "Số lượng mục tiêu",
      type: "pie",
      radius: "55%",
      center: ["50%", "60%"],
      data: [
        { value: 335, name: "Phòng Tổ chức nhân sự" },
        { value: 310, name: "Phòng Chế độ chính sách" },
        { value: 234, name: "Phòng Đảng - Đoàn thể" },
        { value: 135, name: "Phòng Đào tạo" },
        { value: 1548, name: "Phòng Chuyên môn nghiệp vụ" },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
});

const randomData = [
  {
    title: {
      text: "Biểu đồ thống kê mục tiêu theo đơn vị",
      left: "center",
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    legend: {
      orient: "vertical",
      left: "left",
      data: [
        "Phòng Tổ chức nhân sự",
        "Phòng Chế độ chính sách",
        "Phòng Đảng - Đoàn thể",
        "Phòng Đào tạo",
        "Phòng Chuyên môn nghiệp vụ",
      ],
    },
    series: [
      {
        name: "Số lượng mục tiêu",
        type: "pie",
        radius: "55%",
        center: ["50%", "60%"],
        data: [
          { value: 335, name: "Phòng Tổ chức nhân sự" },
          { value: 310, name: "Phòng Chế độ chính sách" },
          { value: 234, name: "Phòng Đảng - Đoàn thể" },
          { value: 135, name: "Phòng Đào tạo" },
          { value: 1548, name: "Phòng Chuyên môn nghiệp vụ" },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  },
  {
    title: {
      text: "Biểu đồ thống kê mục tiêu theo đơn vị",
      left: "center",
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    legend: {
      orient: "vertical",
      left: "left",
      data: [
        "Tổ HĐ và Đánh giá HQKT Dự án ĐTXD",
        "Tổ Quản lý công tác ĐTXD",
        "Tổ định mức kinh tế kỹ thuật",
        "Tổ xây dựng và giám sát kế hoạch",
      ],
    },
    series: [
      {
        name: "Số lượng mục tiêu",
        type: "pie",
        radius: "55%",
        center: ["50%", "60%"],
        data: [
          { value: 335, name: "Tổ HĐ và Đánh giá HQKT Dự án ĐTXD" },
          { value: 310, name: "Tổ Quản lý công tác ĐTXD" },
          { value: 234, name: "Tổ định mức kinh tế kỹ thuật" },
          { value: 135, name: "Tổ xây dựng và giám sát kế hoạch" },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  },

  {
    title: {
      text: "Biểu đồ thống kê mục tiêu theo đơn vị",
      left: "center",
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    legend: {
      orient: "vertical",
      left: "left",
      data: ["Phòng Quản lý tài sản", "Phòng Kế hoạch", "Phòng Dự toán"],
    },
    series: [
      {
        name: "Số lượng mục tiêu",
        type: "pie",
        radius: "55%",
        center: ["50%", "60%"],
        data: [
          { value: 335, name: "Phòng Quản lý tài sản" },
          { value: 310, name: "Phòng Kế hoạch" },
          { value: 234, name: "Phòng Dự toán" },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  },

  {
    title: {
      text: "Biểu đồ thống kê mục tiêu theo đơn vị",
      left: "center",
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    legend: {
      orient: "vertical",
      left: "left",
      data: [
        "Ban Pháp chế rủi ro",
        "Ban Tài chính kế toán",
        "Văn phòng",
        "Ban Công nghệ thông tin",
      ],
    },
    series: [
      {
        name: "Số lượng mục tiêu",
        type: "pie",
        radius: "55%",
        center: ["50%", "60%"],
        data: [
          { value: 335, name: "Ban Pháp chế rủi ro" },
          { value: 310, name: "Ban Tài chính kế toán" },
          { value: 234, name: "Văn phòng" },

          { value: 312, name: "Ban Công nghệ thông tin" },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  },
];

const departmentData = ref(storeThongKeTheoDonVi.companyData);

function filterFn(val, update, abort) {
  update(() => {
    const needle = val.toLowerCase();
    departmentData.value = storeThongKeTheoDonVi.companyData.filter(
      (v) => v.label.toLowerCase().indexOf(needle) > -1
    );
  });
}

watch(
  () => isDark.value,
  async (val) => {
    await localStorage.setItem("isDark", val);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }
);

watch(
  () => storeThongKeTheoDonVi.companySelected,
  (val) => {
    let random = Math.floor(Math.random() * randomData.length);
    if (random == storeThongKeTheoDonVi.randomValue) {
      random = Math.floor(Math.random() * randomData.length);
    }
    storeThongKeTheoDonVi.randomValue = random;
    option.value = randomData[storeThongKeTheoDonVi.randomValue];
  }
);
</script>

<template>
  <div>
    <div style="display: flex; position: fixed; z-index: 1000; right: 2%">
      <q-select
        label="Chọn đơn vị"
        outlined
        use-input
        hide-selected
        fill-input
        input-debounce="0"
        class="q-my-md"
        v-model="storeThongKeTheoDonVi.companySelected"
        style="min-width: 400px; border-radius: 8px; margin-right: 5%"
        :style="isDark ? 'background-color: rgba(255,255,255,.8);' : ''"
        @filter="filterFn"
        :options="departmentData"
      />

      <q-toggle
        v-model="isDark"
        dark
        checked-icon="dark_mode"
        :color="isDark ? 'green' : 'black'"
        keep-color
        unchecked-icon="brightness_6"
        size="lg"
      />
    </div>
    <v-chart class="chart" :option="option" autoresize />
  </div>
</template>

<style scoped>
.chart {
  height: 93vh;
}

body {
  overflow-y: hidden;
}
</style>
