<template lang="html">
  <el-tabs type="border-card" v-model="activeName" v-if="isFetching"  v-loading="loading" element-loading-text="配置文件拼命加载中" @tab-click="tabClick">
    <el-tab-pane v-for="tab in tabs" :label="tab.label" :name="tab.payType">
      <Normal
      @dataChange="changePayData"
      :payList="tab.formList"
      :isForm="showSelect"/>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import axios from 'axios';
import { mapState, mapActions } from 'vuex';
import { TABS_FETCH, PAYDATA_CHANGE, PAYDATA_SET } from '../store/pay';
import Normal from './NormalPay';

export default {
  data() {
    return {
      showSelect: {
        show: false
      },
      loading: true,
      activeName: '1'
    };
  },
  components: {
    Normal
  },
  created() {
    const self = this;
    axios
      .get('../static/data/tabs.json')
      .then((res) => {
        self.TABS_FETCH(res.data.tabs);
        self.geratePaydata(res.data.tabs);
        return res.data.tabs;
      })
      .then(self.loading = false)
      .catch(err => console.log(err));
  },
  computed: mapState({
    tabs: state => state.Pay.tabs.list,
    isFetching: state => state.Pay.tabs.isFetching,
    payData: state => state.Pay.payData
  }),
  methods: {
    ...mapActions([TABS_FETCH, PAYDATA_CHANGE, PAYDATA_SET]),
    tabClick() {
      console.log('click');
    },
    geratePaydata(tabs) {
      const payData = {};
      tabs[this.activeName - 1].formList.map((item) => {
        payData[item.key] = item.value;
        return payData;
      });
      payData.payType = this.activeName;
      this.PAYDATA_SET(payData);
      return payData;
    },
    changeSend(obj) {
      this.PAYDATA_CHANGE(obj);
    },
    changePayData(val) {
      Object.assign(this.tabs[this.activeName - 1].formList, val);
      const obj = {};
      obj[val.key] = val.value;
      this.changeSend(obj);
    }
  }
};
</script>

<style lang="css">
</style>
