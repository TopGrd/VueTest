<template lang="html">
  <el-tabs type="border-card" v-model="activeName" v-if="isFetching"  v-loading="loading" element-loading-text="配置文件拼命加载中" @tab-click="tabClick">
    <el-tab-pane v-for="tab in tabs" :label="tab.label" :name="tab.payType">
      <el-button type="primary" icon="plus" v-if="activeName === '5'" @click=""></el-button>
      <el-button type="primary" icon="minus" v-if="activeName === '5'"></el-button>
      <Normal @dataChange="changePayData"
      :payList="tab.formList"
      :isForm="showSelect">
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import axios from 'axios';
import { mapState, mapActions } from 'vuex';
import eventHub from '../util/eventHub';
import { TABS_FETCH, PAYDATA_CHANGE, PAYDATA_SET, TABLEDATA_SET, TABLEDATA_CHANGE, PAYDATA_RESET, TABS_CHANGE } from '../store/pay';
import Normal from './NormalPay';

export default {
  data() {
    return {
      showSelect: {
        show: false
      },
      loading: true,
      activeName: '1',
      keyTime: 1
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
      .then(this.$notify({
        title: '成功',
        message: '支付tab已配置',
        type: 'success',
        duration: 3000
      }))
      .catch((err) => {
        this.$notify({
          title: '失败',
          message: err,
          type: 'error',
          duration: 3000
        });
      });
    eventHub.$on('tabActive', this.changeTab);
  },
  computed: mapState({
    tabs: state => state.Pay.tabs.list,
    isFetching: state => state.Pay.tabs.isFetching,
    payData: state => state.Pay.payData
  }),
  methods: {
    ...mapActions([TABS_FETCH, PAYDATA_CHANGE, PAYDATA_SET,
      TABLEDATA_SET, TABLEDATA_CHANGE, PAYDATA_RESET, TABS_CHANGE]),
    tabClick() {
      this.PAYDATA_RESET();
      eventHub.$emit('authAgin', 'hello');
      this.geratePaydata(this.tabs);
    },
    geratePaydata(tabs) {
      let payData = {};
      tabs[this.activeName - 1].formList.forEach((item) => {
        payData[item.key] = item.value;
      });
      payData.payType = this.activeName;
      this.PAYDATA_SET(payData);
      this.TABLEDATA_SET(this.payData);
      return payData;
    },
    changeSend(obj) {
      this.PAYDATA_CHANGE(obj);
      this.TABLEDATA_CHANGE(obj);
    },
    changePayData(val) {
      Object.assign(this.tabs[this.activeName - 1].formList, val);
      const obj = {};
      obj[val.key] = val.value;
      this.changeSend(obj);
    },
    changeTab(tabIndex) {
      console.log(tabIndex);
      this.activeName = tabIndex;
    },
    GenPayInfoList() {
      this.keyTime = this.keyTime + 1;
      const payInfoList = ['productID', 'contentID', 'cpID', 'fee'];
      // let newList = payInfoList.map(item => item + this.keyTime);
      payInfoList.map((item) => {
        let key = item + this.keyTime;
        let obj = {
          key,
          value: ''
        };
        this.TABS_CHANGE({
          obj,
          listIndex: 4
        });
        return key;
      });
      this.reRender();
    }
  }

};
</script>

<style lang="css">
</style>
