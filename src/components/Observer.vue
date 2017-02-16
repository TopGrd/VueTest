<template lang="html">
  <el-dialog title="支付数据" v-model="visible.value">
    <el-button type="info" @click="copy">copy</el-button>
    <el-table :data="tableData" align='left'>
      <el-table-column property="key" label="key" width="150"></el-table-column>
      <el-table-column property="value" label="value" sortable></el-table-column>
    </el-table>
    <textarea id="text" name="name" rows="8" cols="80" v-show="true"></textarea>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Observer',
  props: ['visible'],
  computed: mapState({
    tableData: state => state.Pay.tableData,
    payData: state => state.Pay.payData
  }),
  methods: {
    copy() {
      const rng = document.getElementById('text');
      rng.value = JSON.stringify(this.payData);
      rng.select();
      document.execCommand('Copy');
      this.$notify({
        title: '成功',
        message: '支付数据已成功复制',
        type: 'success',
        duration: 1500
      });
    }
  }
};
</script>

<style lang="css">
</style>
