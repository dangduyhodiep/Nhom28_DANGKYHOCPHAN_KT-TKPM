<script setup>
import bgData from "/material/bg-remove.png";
import { onMounted } from "vue";

onMounted(() => {
  document.title = `Chào Mừng - AT-Data`;
});
</script>

<template>
  <div>
    <div class="page-header clear-filter" filter-color="orange">
      <div
        class="page-header-image"
        style="background-image: url('img/header.jpg')"
      >
        <div class="container">
          <div class="block-text flex column">
            <!-- <p class="text-h6 q-py-lg">ATDATA</p> -->
            <q-img
              :src="bgData"
              style="width: 400px; user-select: none"
              class="q-my-lg"
            />
            <span class="text-subtitle1 text-bold q-ml-md q-py-sm"
              >TRƯỜNG ĐẠI HỌC CÔNG NGHIỆP TP.HỒ CHÍ MINH</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-header {
  width: 100%;
  // height: 100vh;
  position: relative;

  .page-header-image {
    width: 100%;
    height: 100%;
    position: fixed;

    .container {
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      text-align: left;
      color: rgba(#ffffff, 0.8);

      .block-text {
        margin: 0 5% 10% 0;
        p {
          font-size: 5em !important;
          letter-spacing: 2px;
        }

        span {
          letter-spacing: 2px;
        }
      }
    }
  }
}
</style>
