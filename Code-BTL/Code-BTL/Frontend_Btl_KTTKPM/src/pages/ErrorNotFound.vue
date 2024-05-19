<script setup>
const { routerHref } = defineProps(["routerHref"]);
</script>

<template>
  <div class="container">
    <div class="errPage-container">
      <router-link :to="routerHref ? routerHref : '/'">
        <q-btn color="primary">Trở về</q-btn>
      </router-link>
      <div class="row">
        <div class="col">
          <h1 class="text-jumbo text-ginormous">Oops!</h1>
          <h2>You don't have permission to go to this page</h2>
          <ul class="list-unstyled q-mt-lg">
            <li>Or you can go:</li>
            <li class="link-type q-mt-sm">
              <router-link to="/">Back to home</router-link>
            </li>
          </ul>
        </div>
        <div class="col">
          <q-img src="/403.gif" spinner-color="primary" spinner-size="82px" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
* {
  background-color: #ffffff;
}
.container {
  width: 100vw;
  height: 100vh;
  .errPage-container {
    width: 800px;
    margin: 100px auto;
    .pan-gif {
      margin: 0 auto;
      display: block;
    }
    .pan-img {
      display: block;
      margin: 0 auto;
      width: 100%;
    }
    .text-jumbo {
      font-size: 60px;
      font-weight: 700;
      color: #484848;
    }
    .list-unstyled {
      font-size: 14px;
      li {
        padding-bottom: 5px;
      }
      a {
        color: #008489;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
