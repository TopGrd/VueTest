<template lang="html">
  <el-tabs type="border-card" v-loading="loading2"
    element-loading-text="配置文件拼命加载中">
    <el-tab-pane>
      <span slot="label"><i class="el-icon-information"></i> 应用基本信息</span>
      <el-row>
        <Normal :payList="authList"
        :isForm="showSelect"
        v-if="isFetching"/>
      </el-row>
      <el-row type="flex" justify="start">
        <SelectData />
        <el-button class="left3" type="info" @click="init">点击完成计费认证</el-button>
      </el-row>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import axios from 'axios';
import { mapState, mapActions } from 'vuex';
import { AUTHLIST_FETCH, PAYDATA_CHANGE, AUTHLIST_CHANGE, PAYRESULT_CHANGE } from '../store/pay';
import Normal from './NormalPay';
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
      loading2: true
    };
  },
  components: {
    Normal,
    SelectData
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
  },
  computed: mapState({
    authList: state => state.Pay.authList.list,
    isFetching: state => state.Pay.authList.isFetching
  }),
  methods: {
    ...mapActions([AUTHLIST_FETCH, PAYDATA_CHANGE, AUTHLIST_CHANGE, PAYRESULT_CHANGE]),
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
    /* eslint-disable no-undef */
    init() {
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
              text: '认证成功'
            });
          });
        } else {
          self.PAYRESULT_CHANGE({
            authResult: false,
            status: 'auth failed',
            text: '认证失败'
          });
        }
      }, 'Common', 'b');
    }
  }
};
</script>

<style lang="css">
</style>
