<template>
  <div class="sankey-chart" ref="chartRef"></div>
</template>

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
    const chartRef = ref(null);
    const router = useRouter();
    const storeSetting = useSettingStore();

    const chartOptions = {
      series: [
        {
          type: "sankey",
          layout: "none",
          data: [
            { name: "Node 1" },
            { name: "Node 2" },
            { name: "Node 3" },
            { name: "Node 4" },
          ],
          links: [
            { source: "Node 1", target: "Node 2", value: 100 },
            { source: "Node 2", target: "Node 3", value: 50 },
            { source: "Node 3", target: "Node 4", value: 30 },
          ],
          itemStyle: {
            normal: {
              borderWidth: 1,
              borderColor: "#aaa",
            },
          },
          lineStyle: {
            normal: {
              color: "source",
              curveness: 0.5,
            },
          },
        },
      ],
    };

    onMounted(() => {
      /* config href */
      storeSetting.routerHref = router.currentRoute._rawValue.href;
      nextTick(() => {
        const chartInstance = echarts.init(chartRef.value);
        chartInstance.setOption(chartOptions);
      });
    });

    return { chartRef };
  },
};
</script>

<style scoped>
.sankey-chart {
  width: 100%;
  height: 400px; /* Adjust the height as needed */
}
</style>
