<script>
/* Build in VueJs */
import { ref, onMounted, nextTick } from "vue";

/* Pinia Store */
import { useSettingStore } from "@/stores/extra/SettingStore.js";

/* Third Library */
import { useRouter } from "vue-router";
import * as echarts from "echarts";

export default {
  setup() {
    const dataLoad = ref(true);
    const stackedLineChart = ref(null);
    const mixLineBarChart = ref(null);
    const nightingaleChart = ref(null);
    const pieChart = ref(null);
    const aqiRadarChart = ref(null);
    const dynamicBubbleChart = ref(null);
    const router = useRouter();
    const storeSetting = useSettingStore();

    onMounted(() => {
      /* config href */
      storeSetting.routerHref = router.currentRoute._rawValue.href;
      setTimeout(() => {
        dataLoad.value = false;
      }, 2000);

      nextTick(() => {
        // Stacked Line Chart Options
        const stackedLineChartOptions = {
          tooltip: {
            trigger: "axis",
          },
          legend: {
            data: [
              "Kiến trúc và Thiết kế phần mềm",
              "Công nghệ mới",
              "Thiết kế web",
              "Phân tích thiết kế hệ thống",
            ],
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: [
              "Tháng 1",
              "Tháng 2",
              "Tháng 3",
              "Tháng 4",
              "Tháng 5",
              "Tháng 6",
              "Tháng 7",
              "Tháng 8",
              "Tháng 9",
              "Tháng 10",
              "Tháng 11",
              "Tháng 12",
            ],
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              name: "Kiến trúc và Thiết kế phần mềm",
              type: "line",
              stack: "total",
              data: [7, 8, 9, 6, 10, 5, 8, 6, 7, 10, 5, 9],
            },
            {
              name: "Công nghệ mới",
              type: "line",
              stack: "total",
              data: [8, 7, 9, 6, 10, 5, 7, 6, 10, 9, 8, 5],
            },
            {
              name: "Thiết kế web",
              type: "line",
              stack: "total",
              data: [8, 10, 6, 7, 9, 5, 10, 6, 7, 9, 8, 5],
            },

            {
              name: "Phân tích thiết kế hệ thống",
              type: "line",
              stack: "total",
              data: [7, 9, 6, 10, 8, 5, 9, 6, 10, 8, 7, 5],
            },
          ],
        };

        // Mix Line-Bar Chart Options
        const mixLineBarChartOptions = {
          tooltip: {
            trigger: "axis",
          },
          legend: {
            data: ["Điểm", "Các môn học"],
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: [
              "Kiến trúc và Thiết kế phần mềm",
              "Công nghệ mới",
              "Thiết kế web",
              "Phân tích thiết kế hệ thống",
            ],
          },
          yAxis: [
            {
              type: "value",
              name: "Value",
            },
            {
              type: "value",
              name: "Count",
            },
          ],
          series: [
            {
              name: "Kiến trúc và Thiết kế phần mềm",
              type: "line",
              data: [8, 6, 9, 7, 5],
            },
            {
              name: "Công nghệ mới",
              type: "bar",
              yAxisIndex: 1,
              data: [9, 7, 6, 10, 5],
            },

            {
              name: "Thiết kế web",
              type: "bar",
              yAxisIndex: 1,
              data: [9, 7, 6, 10, 5],
            },

            {
              name: "Phân tích thiết kế hệ thống",
              type: "bar",
              yAxisIndex: 1,
              data: [9, 7, 6, 10, 5],
            },
          ],
        };

        // Nightingale Chart Options
        const nightingaleChartOptions = {
          title: {
            // text: "Nightingale Chart",
            left: "center",
          },
          angleAxis: {
            type: "category",
            data: [
              "Kiến trúc và Thiết kế phần mềm",
              "Công nghệ mới",
              "Thiết kế web",
              "Phân tích thiết kế hệ thống",
            ],
            z: 10,
          },
          radiusAxis: {
            type: "value",
          },
          polar: {},
          series: [
            {
              type: "bar",
              data: [9, 8, 6, 7, 5],
              coordinateSystem: "polar",
              name: "Kiến trúc và Thiết kế phần mềm",
            },
            {
              type: "bar",
              data: [7, 6, 6, 9, 10],
              coordinateSystem: "polar",
              name: "Công nghệ mới",
            },
            {
              type: "bar",
              data: [8, 9, 7, 6, 8],
              coordinateSystem: "polar",
              name: "Thiết kế web",
            },
            {
              type: "bar",
              data: [7, 9, 8, 6, 8],
              coordinateSystem: "polar",
              name: "Phân tích thiết kế hệ thống",
            },
          ],
          legend: {
            show: true,
            data: [
              "Kiến trúc và Thiết kế phần mềm",
              "Công nghệ mới",
              "Thiết kế web",
              "Phân tích thiết kế hệ thống",
            ],
            left: "center",
          },
        };

        // Pie Chart Options
        const pieChartOptions = {
          title: {
            text: "Tổng số lượng môn học đã đăng ký qua từng năm",
            left: "center",
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)",
          },
          legend: {
            orient: "vertical",
            left: "left",
            data: ["2018", "2019", "2020", "2021"],
          },
          series: [
            {
              name: "Pie Chart",
              type: "pie",
              radius: "55%",
              center: ["50%", "60%"],
              data: [
                { value: 335, name: "2018" },
                { value: 310, name: "2019" },
                { value: 234, name: "2020" },
                { value: 135, name: "2021" },
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
        };

        // AQI Radar Chart Options
        const aqiRadarChartOptions = {
          title: {
            // text: "AQI Radar Chart",
          },
          tooltip: {},
          radar: {
            indicator: [
              { name: "Kiến trúc và Thiết kế phần mềm", max: 100 },
              { name: "Công nghệ mới", max: 100 },
              { name: "Thiết kế web", max: 100 },
              { name: "Phân tích thiết kế hệ thống", max: 100 },
              { name: "Logic học", max: 100 },
            ],
          },
          series: [
            {
              name: "AQI",
              type: "radar",
              data: [
                {
                  value: [85, 90, 80, 88, 75],
                  name: "AQI Level",
                },
              ],
            },
          ],
        };

        // Dynamic Bubble Chart Options
        const dynamicBubbleChartOptions = {
          title: {
            // text: "Dynamic Bubble Chart",
            textStyle: {
              color: "#333",
            },
          },
          xAxis: {
            type: "value",
            splitLine: {
              lineStyle: {
                type: "dashed",
              },
            },
          },
          yAxis: {
            type: "value",
            splitLine: {
              lineStyle: {
                type: "dashed",
              },
            },
          },
          series: [
            {
              name: "Bubble Chart",
              data: generateRandomData(),
              type: "scatter",
              symbolSize: function (data) {
                return Math.sqrt(data[2]) * 5;
              },
              emphasis: {
                label: {
                  show: true,
                  formatter: function (param) {
                    return param.data[2];
                  },
                  position: "top",
                },
              },
            },
          ],
        };

        // Initialize Charts
        createChart(stackedLineChart, stackedLineChartOptions);
        createChart(mixLineBarChart, mixLineBarChartOptions);
        createChart(nightingaleChart, nightingaleChartOptions);
        createChart(pieChart, pieChartOptions);
        createChart(aqiRadarChart, aqiRadarChartOptions);
        createChart(dynamicBubbleChart, dynamicBubbleChartOptions);
      });
    });

    const createChart = (chartRef, options) => {
      const chartInstance = echarts.init(chartRef.value);
      chartInstance.setOption(options);
    };

    const generateRandomData = () => {
      const data = [];
      for (let i = 0; i < 5; i++) {
        data.push([
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
        ]);
      }
      return data;
    };

    return {
      stackedLineChart,
      mixLineBarChart,
      nightingaleChart,
      pieChart,
      aqiRadarChart,
      dynamicBubbleChart,
      dataLoad,
    };
  },
};
</script>

<template>
  <div class="wrapper flex flex-center full-height">
    <div class="full-width" style="padding: 0 4%">
      <q-skeleton v-if="dataLoad" height="75px" width="300px" type="text" />
      <p v-else class="q-my-lg text-bold text-h5 text-uppercase">
        Chào mừng trở lại
      </p>
    </div>

    <q-page-container
      class="row full-width q-mx-md"
      style="padding: 0 4%; min-height: 250px"
      v-if="dataLoad"
    >
      <transition appear enter-active-class="animated fadeInRight slower">
        <q-card class="col">
          <q-item>
            <q-item-section avatar>
              <q-skeleton type="QAvatar" />
            </q-item-section>

            <q-item-section>
              <q-item-label>
                <q-skeleton type="text" />
              </q-item-label>
              <q-item-label caption>
                <q-skeleton type="text" />
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-skeleton height="200px" square />

          <q-card-actions align="right" class="q-gutter-md">
            <q-skeleton type="QBtn" />
            <q-skeleton type="QBtn" />
          </q-card-actions>
        </q-card>
      </transition>

      <transition appear enter-active-class="animated fadeInRight slower">
        <q-card class="my-card col q-ml-md">
          <q-item>
            <q-item-section avatar>
              <q-skeleton type="QAvatar" />
            </q-item-section>

            <q-item-section>
              <q-item-label>
                <q-skeleton type="text" />
              </q-item-label>
              <q-item-label caption>
                <q-skeleton type="text" />
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-skeleton height="200px" square />

          <q-card-actions align="right" class="q-gutter-md">
            <q-skeleton type="QBtn" />
            <q-skeleton type="QBtn" />
          </q-card-actions>
        </q-card>
      </transition>

      <transition appear enter-active-class="animated fadeInRight slower">
        <q-card class="my-card col q-mr-md q-mx-md">
          <q-item>
            <q-item-section avatar>
              <q-skeleton type="QAvatar" />
            </q-item-section>

            <q-item-section>
              <q-item-label>
                <q-skeleton type="text" />
              </q-item-label>
              <q-item-label caption>
                <q-skeleton type="text" />
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-skeleton height="200px" square />

          <q-card-actions align="right" class="q-gutter-md">
            <q-skeleton type="QBtn" />
            <q-skeleton type="QBtn" />
          </q-card-actions>
        </q-card>
      </transition>

      <transition appear enter-active-class="animated fadeInRight slower">
        <q-card class="my-card col">
          <q-item>
            <q-item-section avatar>
              <q-skeleton type="QAvatar" />
            </q-item-section>

            <q-item-section>
              <q-item-label>
                <q-skeleton type="text" />
              </q-item-label>
              <q-item-label caption>
                <q-skeleton type="text" />
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-skeleton height="200px" square />

          <q-card-actions align="right" class="q-gutter-md">
            <q-skeleton type="QBtn" />
            <q-skeleton type="QBtn" />
          </q-card-actions>
        </q-card>
      </transition>
    </q-page-container>

    <q-page-container
      class="row full-width q-mx-md"
      style="padding: 0 4%; min-height: 250px"
      v-else
    >
      <q-card class="my-card col" height="200px" square>
        <q-card-section class="flex justify-between">
          <div class="text-h6 text-bold">Số buổi học trong tuần</div>
        </q-card-section>

        <hr class="hr-custom" />

        <q-card-section class="flex justify-between items-center">
          <p><span class="text-h4">3</span>đ/vị: buổi</p>

          <q-icon name="print" size="lg" color="yellow-10" />
        </q-card-section>
      </q-card>

      <q-card class="my-card col q-ml-md q-mr-md" height="200px" square>
        <q-card-section>
          <div class="text-h6 text-bold">Số học phần đã đăng ký</div>
        </q-card-section>

        <hr class="hr-custom" />
        <q-card-section class="flex justify-between items-center">
          <p><span class="text-h4">20</span>đ/vị: học phần</p>
          <q-icon name="person" size="lg" color="blue" />
        </q-card-section>
      </q-card>

      <q-card class="my-card col q-mr-md q-ml-md" height="200px" square>
        <q-card-section>
          <div class="text-h6 text-bold">Công nợ</div>
        </q-card-section>
        <hr class="hr-custom" />
        <q-card-section class="flex justify-between items-center">
          <p><span class="text-h4">23.000.000</span>đ/vị: đồng</p>
          <q-icon name="attach_money" size="lg" color="accent" />
        </q-card-section>
      </q-card>

      <q-card class="my-card col" height="200px" square>
        <q-card-section>
          <div class="text-h6 text-bold">Tín chỉ hoàn thành</div>
        </q-card-section>
        <hr class="hr-custom" />
        <q-card-section class="flex justify-between items-center">
          <p><span class="text-h4">30/146</span>đ/vị: tín chỉ</p>
          <q-icon name="apartment" size="lg" color="cyan-4" />
        </q-card-section>
      </q-card>
    </q-page-container>

    <!-- <q-card v-if="dataLoad" flat style="width: 45vw">
      <q-skeleton height="300px" square />

      <q-card-section>
        <q-skeleton type="text" class="text-subtitle1" />
        <q-skeleton type="text" width="50%" class="text-subtitle1" />
        <q-skeleton type="text" class="text-caption" />
      </q-card-section>
    </q-card>

    <q-card v-if="dataLoad" flat style="width: 45vw">
      <q-skeleton height="300px" square />

      <q-card-section>
        <q-skeleton type="text" class="text-subtitle1" />
        <q-skeleton type="text" width="50%" class="text-subtitle1" />
        <q-skeleton type="text" class="text-caption" />
      </q-card-section>
    </q-card> -->

    <!-- Stacked Line Chart -->
    <transition appear enter-active-class="animated fadeInRight slower">
      <q-card class="chart-card q-ma-md q-pa-md" style="width: 45vw">
        <div class="chart-title">Biểu đồ biến động điểm qua từng kỳ</div>
        <div class="chart-content">
          <div ref="stackedLineChart" class="chart"></div>
        </div>
      </q-card>
    </transition>

    <!-- Mix Line-Bar Chart -->
    <transition appear enter-active-class="animated fadeInRight slower">
      <q-card class="chart-card q-ma-md q-pa-md" style="width: 45vw">
        <div class="chart-title">Biểu đồ điểm dạng cột</div>
        <div class="chart-content">
          <div ref="mixLineBarChart" class="chart"></div>
        </div>
      </q-card>
    </transition>

    <!-- Pie Chart -->
    <transition appear enter-active-class="animated fadeInRight slower">
      <q-card class="chart-card q-ma-md q-pa-md" style="width: 45vw">
        <div class="chart-title">Biểu đồ bánh</div>
        <div class="chart-content">
          <div ref="pieChart" class="chart"></div>
        </div>
      </q-card>
    </transition>

    <!-- Nightingale Chart -->
    <transition appear enter-active-class="animated fadeInRight slower">
      <q-card class="chart-card q-ma-md q-pa-md" style="width: 45vw">
        <div class="chart-title">Biểu đồ đèn lồng</div>
        <div class="chart-content">
          <div ref="nightingaleChart" class="chart"></div>
        </div>
      </q-card>
    </transition>

    <!-- AQI Radar Chart -->
    <transition appear enter-active-class="animated fadeInRight slower">
      <q-card class="chart-card q-ma-md q-pa-md" style="width: 45vw">
        <div class="chart-title">Biểu đồ Radar</div>
        <div class="chart-content">
          <div ref="aqiRadarChart" class="chart"></div>
        </div>
      </q-card>
    </transition>

    <!-- Dynamic Bubble Chart -->
    <transition appear enter-active-class="animated fadeInRight slower">
      <q-card class="chart-card q-ma-md q-pa-md" style="width: 45vw">
        <div class="chart-title">Biểu đồ bong bóng</div>
        <div class="chart-content">
          <div ref="dynamicBubbleChart" class="chart"></div>
        </div>
      </q-card>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
body {
  height: 200vh !important;
  overflow-y: scroll !important;
}
.chart-card {
  margin-bottom: 20px;
}

.chart-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.chart-content {
  padding: 16px;
}

.chart {
  height: 300px;
}

.wrapper {
  position: relative;
  width: 100%;
  // min-height: 100%;
  height: 200vh;
  // overflow-y: hidden !important;
}
</style>
