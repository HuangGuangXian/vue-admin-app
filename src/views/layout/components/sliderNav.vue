<template>
    <div class="main-header">
        <a-button type="primary" style="margin-bottom: 16px" @click="toggleCollapsed">
            <a-icon :type="$store.state.collapsed ? 'menu-unfold' : 'menu-fold'" />
        </a-button>
        <div class="breadcrumb">
            <a-breadcrumb>
                <a-breadcrumb-item>
                  {{currentRoute[0].meta.title}}
                </a-breadcrumb-item>
                <a-breadcrumb-item v-if="currentRoute.length > 1">
                    <router-link :to="{name: currentRoute[1].name}">
                      {{currentRoute[1] ? currentRoute[1].meta.title : ''}}
                    </router-link>
                </a-breadcrumb-item>
            </a-breadcrumb>
        </div>
        <ul class="user-info">
            <li>欢迎 {{$store.state.userInfo.username}}</li>
            <li @click="loginOutHandle">退出</li>
        </ul>
    </div>
</template>

<script>
export default {
  data() {
    return {
      currentRoute: this.$router.currentRoute.matched,
    };
  },
  watch: {
    $route() {
      this.currentRoute = this.$router.currentRoute.matched;
    },
  },
  methods: {
    toggleCollapsed() {
      this.$store.dispatch('changeCollapsed');
    },
    loginOutHandle() {
      this.$store.dispatch('loginOut');
      this.$router.push({
        name: 'Login',
      });
    },
  },
};
</script>

<style lang="less" scoped>
</style>
