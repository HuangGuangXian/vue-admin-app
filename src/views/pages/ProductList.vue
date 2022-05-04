<template>
  <div class="list-container">
    <!-- 搜索组件 -->
    <Search @submit="searchSubmit" :data="categoryList" />
    <a-button class="product-add-btn">
      <router-link :to="{name: 'AddProduct'}">新增商品</router-link>
    </a-button>
    <!-- 商品表格组件 -->
    <ProductsTable
    :data="tableData"
    :page="page"
    @change="changePage"
    :categoryList="categoryList"
    @edit="editProduct"
    @remove="removeProduct"
    />
  </div>
</template>

<script>
import Search from '@/components/Search.vue';
import ProductsTable from '@/components/ProductsTable.vue';
import productApi from '@/api/product';
import categoryApi from '@/api/category';

export default {
  data() {
    return {
      tableData: [],
      searchForm: {},
      categoryList: [],
      page: {
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        total: 1,
      },
      categoryObj: {},
    };
  },
  components: {
    Search,
    ProductsTable,
  },
  async created() {
    await categoryApi.list().then((res) => {
      this.categoryList = res.data;
      res.data.forEach((item) => {
        this.categoryObj[item.id] = item;
      });
    });
    this.getTableData();
  },
  methods: {
    searchSubmit(form) {
      this.searchForm = form;
      this.getTableData();
    },
    getTableData() {
      productApi.list({
        page: this.page.current,
        size: this.page.pageSize,
        ...this.searchForm,
      }).then((res) => {
        console.log(res);
        this.page.total = res.total;
        this.tableData = res.data.map((item) => ({
          ...item,
          categoryName: this.categoryObj[item.category].name,
        }));
      });
    },
    changePage(page) {
      this.page = page;
      this.getTableData();
    },
    editProduct(record) {
      this.$router.push({
        name: 'editProduct',
        params: {
          id: record.id,
        },
      });
    },
    removeProduct(record) {
      this.$confirm({
        title: '确认删除',
        content: () => <div style="color:red;">{`确认删除产品标题为:${record.title}的商品吗`}</div>,
        onOk: () => {
          productApi.remove(record).then(() => {
            this.getTableData();
          });
        },
        onCancel() {
          window.console.log('Cancel');
        },
        class: 'confirm-box',
      });
    },
  },
};
</script>

<style lang="less" scoped>
.list-container{
  position: relative;
  .product-add-btn{
    position: absolute;
    right: 10px;
    top: 14px;
  }
}

</style>
