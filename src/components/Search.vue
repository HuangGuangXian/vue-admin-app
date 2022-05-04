<template>
<div class="search-container">
  <a-form-model
    layout="inline"
    :model="searchFrom"
    @submit="handleSubmit"
    @submit.native.prevent
  >
    <a-form-model-item label="搜索关键字">
      <a-input v-model="searchFrom.searchWord" placeholder="请输入关键字">
      </a-input>
    </a-form-model-item>
    <a-form-model-item label="商品类目">
      <a-select
        allowClear
        show-search
        placeholder="请选择商品类目"
        style="width: 200px"
        @change="handleChange"
      >
        <a-select-option v-for="c in data" :key="c.id" :value="c.id">
          {{c.name}}
          </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item>
      <a-button
        type="primary"
        html-type="submit"
      >
        搜索
      </a-button>
    </a-form-model-item>
  </a-form-model>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchFrom: {
        searchWord: '',
        category: '',
      },
    };
  },
  props: ['data'],
  methods: {
    // 提交表单的时候触发的函数
    handleSubmit() {
      this.$emit('submit', this.searchFrom);
    },
    // 切换类目时触发的函数
    handleChange(val) {
      this.searchFrom.category = val;
    },
  },
};
</script>

<style lang="less" scoped>
.search-container{
  padding: 10px 10px 10px 46px;
}
</style>
