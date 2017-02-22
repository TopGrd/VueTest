<template lang="html">
  <el-dialog title="支付数据" v-model="visible.value" @close = "closeDialog">
    <el-button class="top15" v-if="visible.save" @click="closeDialog">取 消</el-button>
    <el-button class="top15" v-if="visible.save" @click="saveLocalData" type="primary">确 定</el-button>
    <el-button class="top15" type="info" @click="copy">copy</el-button>
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
  props: ['visible', 'storageKey'],
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
    },
    closeDialog() {
      this.visible.value = false;
      this.visible.save = false;
    },
    saveLocalData() {
      localStorage.setItem(this.storageKey, JSON.stringify(this.payData));
      this.$notify({
        title: '成功',
        message: '成功存入数据',
        type: 'success',
        duration: 1500
      });
      this.visible.value = false;
      this.visible.save = false;
    }
  }
};
</script>

<style lang="css">
</style>
