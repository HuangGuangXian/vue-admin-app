import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import Home from '../views/layout/Home.vue';
import Login from '../views/layout/Login.vue';
import getMenuRoutes from '../utils/permission';

Vue.use(VueRouter);

const asyncRouterMap = [{
  path: '/product',
  name: 'Product',
  meta: {
    title: '商品',
    hidden: false,
    icon: 'shopping',
  },
  component: Home,
  children: [{
    path: 'productList',
    name: 'ProductList',
    meta: {
      title: '商品列表',
      hidden: false,
      icon: 'unordered-list',
    },
    component: () => import('@/views/pages/ProductList.vue'),
  },
  {
    path: 'addProduct',
    name: 'AddProduct',
    meta: {
      title: '新增商品',
      hidden: false,
      icon: 'plus-circle',
    },
    component: () => import('@/views/pages/AddProduct.vue'),
  },
  {
    path: 'editProduct/:id',
    name: 'editProduct',
    meta: {
      title: '编辑商品',
      hidden: true,
      icon: 'plus-circle',
    },
    component: () => import('@/views/pages/AddProduct.vue'),
  },
  {
    path: 'category',
    name: 'Category',
    meta: {
      title: '类目管理',
      hidden: false,
      icon: 'appstore',
    },
    component: () => import('@/views/pages/Category.vue'),
  }],
}];

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页',
      hidden: false,
      icon: 'home',
    },
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('../views/pages/Index.vue'),
        meta: {
          title: '统计',
          hidden: false,
          icon: 'line-chart',
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录',
      hidden: true,
      icon: 'user',
    },
  },
];

const router = new VueRouter({
  routes,
});
let isAddRoutes = false;
router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (store.state.userInfo.username && store.state.userInfo.appkey && store.state.userInfo.role) {
      if (!isAddRoutes) {
        const menuRoutes = getMenuRoutes(store.state.userInfo.role, asyncRouterMap);
        store.dispatch('setMenuRoutes', routes.concat(menuRoutes)).then(() => {
          router.addRoutes(menuRoutes);
          next();
        });
        isAddRoutes = true;
      }
      return next();
    }
    return next('/login');
  }
  return next();
});

export default router;
