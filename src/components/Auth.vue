<template lang="html">
  <el-tabs type="border-card" v-loading="loading2"
    element-loading-text="配置文件拼命加载中">
    <el-tab-pane>
      <span slot="label"><i class="el-icon-information"></i> 应用基本信息</span>
      <el-row>
        <Normal
        @dataChange="changePayData"
        :payList="authList"
        :isForm="showSelect"
        v-if="isFetching"/>
      </el-row>
      <el-row type="flex" justify="start">
        <SelectData />
        <el-button class="left3" type="info" @click="init">点击完成计费认证</el-button>
        <el-button class="left3" type="primary" icon="view" @click="dialogVisible.value = true">观测
        </el-button>
        <Observer :visible="dialogVisible"/>
      </el-row>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import axios from 'axios';
import { mapState, mapActions } from 'vuex';
import { AUTHLIST_FETCH, PAYDATA_CHANGE, AUTHLIST_CHANGE, PAYRESULT_CHANGE, TABLEDATA_CHANGE } from '../store/pay';
import eventHub from '../util/eventHub';
import Normal from './NormalPay';
import Observer from './Observer';
import SelectData from './Select';
import '../../static/js/migu';
import authSession from '../../static/js/session';

export default {
  name: 'form',
  data() {
    return {
      showSelect: {
        show: true
      },
      loading2: true,
      dialogVisible: {
        value: false
      }
    };
  },
  components: {
    Normal,
    SelectData,
    Observer
  },
  created() {
    const self = this;
    axios
      .get('../static/data/authList.json')
      .then((res) => {
        self.AUTHLIST_FETCH(res.data.authList);
        self.gerateAuthdata(res.data.authList);
      })
      .then(self.loading2 = false)
      .catch(err => console.log(err));
    eventHub.$on('authAgin', this.authAginGen);
  },
  computed: mapState({
    authList: state => state.Pay.authList.list,
    isFetching: state => state.Pay.authList.isFetching,
    payResult: state => state.Pay.payResult
  }),
  methods: {
    ...mapActions([AUTHLIST_FETCH, PAYDATA_CHANGE, AUTHLIST_CHANGE, PAYRESULT_CHANGE,
      TABLEDATA_CHANGE]),
    gerateAuthdata(authList) {
      const dataPatch = {};
      console.log(authList);
      authList.map((item) => {
        dataPatch[item.key] = item.value;
        this.PAYDATA_CHANGE(dataPatch);
        return dataPatch;
      });
      return dataPatch;
    },
    changeSend(obj) {
      this.PAYDATA_CHANGE(obj);
      this.TABLEDATA_CHANGE(obj);
    },
    changePayData(val) {
      const obj = {};
      obj[val.key] = val.value;
      this.changeSend(obj);
    },
    authAginGen() {
      console.log('authAginGen');
      this.gerateAuthdata(this.authList);
    },
    /* eslint-disable no-undef */
    init() {
      this.PAYRESULT_CHANGE({
        isFetching: true,
        msg: '支付认证中'
      });
      const self = this;
      const data = this.$store.state.Pay.payData;
      migusdk.init(data.netId, (msg, result, sessionId) => {
        if (msg === '0000') {
          self.AUTHLIST_CHANGE({
            key: 'sessionId',
            value: sessionId
          });
          const app = {
            netId: data.netId,
            ctype: data.ctype,
            authId: data.authId,
            sessionId
          };

          authSession(app, () => {
            console.log('hello');
            self.PAYRESULT_CHANGE({
              authResult: true,
              status: 'auth success',
              text: '认证成功',
              isFetching: false
            });
          });
        } else {
          self.PAYRESULT_CHANGE({
            authResult: false,
            status: 'auth failed',
            text: '认证失败',
            isFetching: false
          });
        }
      }, 'Common', 'b');
    }
  }
};
</script>

<style lang="css">
</style>
