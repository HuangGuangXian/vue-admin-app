<template>
  <div class="home-container">
    <LeftMenu :key="key" />
    <div :class="{'main-app': true, 'menu-unfold': $store.state.collapsed}">
      <SliderNav />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import LeftMenu from './components/Menu.vue';
import SliderNav from './components/sliderNav.vue';

export default {
  data() {
    return {
      key: new Date().getTime(),
    };
  },
  watch: {
    $route() {
      this.key = new Date().getTime();
    },
  },
  components: {
    LeftMenu,
    SliderNav,
  },
};
</script>

<style lang="less">
@import url("~@/assets/css/home.less");
</style>
